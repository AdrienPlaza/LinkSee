// ==UserScript==
// @name         LinkSee
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Extract and browse all links from any webpage — search, filter, copy and export.
// @author       AdrienPlaza
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ================================================================
    // CONFIG
    // ================================================================
    const CONFIG = {
        accentColor: '#007bff',
        accentHover: '#0056b3',
    };

    // ================================================================
    // STATE
    // ================================================================
    const state = {
        links: [],           // All extracted links
        filtered: [],        // Currently visible links
        search: '',
        filter: 'all',       // all | internal | external | anchor | email | tel | file
        sort: 'default',     // default | text | url | length
        isOpen: false,
    };

    // ================================================================
    // FLOATING BUTTON
    // ================================================================
    const mainBtn = document.createElement('button');
    mainBtn.innerText = '🔗';
    mainBtn.title = 'LinkSee — Show all links (Alt+L)';
    mainBtn.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 2147483647;
        width: 50px;
        height: 50px;
        padding: 0;
        background-color: ${CONFIG.accentColor};
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-family: Arial, sans-serif;
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, background 0.2s;
    `;
    mainBtn.onmouseenter = () => {
        mainBtn.style.transform = 'scale(1.1)';
        mainBtn.style.backgroundColor = CONFIG.accentHover;
    };
    mainBtn.onmouseleave = () => {
        mainBtn.style.transform = 'scale(1)';
        mainBtn.style.backgroundColor = CONFIG.accentColor;
    };
    document.body.appendChild(mainBtn);

    // ================================================================
    // PANEL
    // ================================================================
    const panel = document.createElement('div');
    panel.style = `
        position: fixed;
        top: 5%;
        left: 5%;
        width: 90%;
        height: 90%;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 12px;
        z-index: 2147483647;
        display: none;
        flex-direction: column;
        box-shadow: 0 10px 40px rgba(0,0,0,0.25);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        color: #333;
        overflow: hidden;
    `;

    // Header
    const header = document.createElement('div');
    header.style = `
        padding: 16px 20px;
        background: linear-gradient(135deg, ${CONFIG.accentColor}, ${CONFIG.accentHover});
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    `;
    header.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:20px;">🔗</span>
            <h3 style="margin:0; font-size:16px; font-weight:700;">LinkSee — Links on this page</h3>
        </div>
    `;

    const headerActions = document.createElement('div');
    headerActions.style = 'display:flex; gap:8px; align-items:center;';

    const copyAllBtn = document.createElement('button');
    copyAllBtn.innerText = '📋 Copy all';
    copyAllBtn.style = 'padding:6px 12px; cursor:pointer; background:rgba(255,255,255,0.2); color:white; border:1px solid rgba(255,255,255,0.3); border-radius:6px; font-size:12px; font-weight:600; transition: background 0.2s;';
    copyAllBtn.onmouseenter = () => copyAllBtn.style.background = 'rgba(255,255,255,0.35)';
    copyAllBtn.onmouseleave = () => copyAllBtn.style.background = 'rgba(255,255,255,0.2)';
    headerActions.appendChild(copyAllBtn);

    const closeBtn = document.createElement('button');
    closeBtn.innerText = '✖';
    closeBtn.title = 'Close (Esc)';
    closeBtn.style = 'width:32px; height:32px; cursor:pointer; background:rgba(255,255,255,0.2); color:white; border:1px solid rgba(255,255,255,0.3); border-radius:50%; font-size:14px; display:flex; align-items:center; justify-content:center;';
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255,255,255,0.35)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
    closeBtn.onclick = () => closePanel();
    headerActions.appendChild(closeBtn);

    header.appendChild(headerActions);
    panel.appendChild(header);

    // Toolbar (search + filters + sort)
    const toolbar = document.createElement('div');
    toolbar.style = `
        padding: 12px 20px;
        background: #f8f9fa;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
    `;

    // Search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search links or text...';
    searchInput.style = `
        flex: 1;
        min-width: 200px;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s;
    `;
    searchInput.onfocus = () => searchInput.style.borderColor = CONFIG.accentColor;
    searchInput.onblur = () => searchInput.style.borderColor = '#ccc';
    searchInput.oninput = () => {
        state.search = searchInput.value.toLowerCase();
        renderLinks();
    };
    toolbar.appendChild(searchInput);

    // Filter select
    const filterSelect = document.createElement('select');
    filterSelect.style = 'padding:8px 12px; border:1px solid #ccc; border-radius:6px; font-size:13px; background:white; cursor:pointer; outline:none;';
    [
        { v: 'all', l: 'All types' },
        { v: 'internal', l: 'Internal' },
        { v: 'external', l: 'External' },
        { v: 'anchor', l: 'Anchors (#)' },
        { v: 'email', l: 'Email' },
        { v: 'tel', l: 'Phone' },
        { v: 'file', l: 'Files' },
    ].forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.v;
        o.textContent = opt.l;
        filterSelect.appendChild(o);
    });
    filterSelect.onchange = () => {
        state.filter = filterSelect.value;
        renderLinks();
    };
    toolbar.appendChild(filterSelect);

    // Sort select
    const sortSelect = document.createElement('select');
    sortSelect.style = 'padding:8px 12px; border:1px solid #ccc; border-radius:6px; font-size:13px; background:white; cursor:pointer; outline:none;';
    [
        { v: 'default', l: 'Sort: Default' },
        { v: 'text', l: 'Sort: Text (A-Z)' },
        { v: 'url', l: 'Sort: URL (A-Z)' },
        { v: 'length', l: 'Sort: Length' },
    ].forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.v;
        o.textContent = opt.l;
        sortSelect.appendChild(o);
    });
    sortSelect.onchange = () => {
        state.sort = sortSelect.value;
        renderLinks();
    };
    toolbar.appendChild(sortSelect);

    panel.appendChild(toolbar);

    // Stats bar
    const statsBar = document.createElement('div');
    statsBar.style = 'padding:8px 20px; background:#fff; border-bottom:1px solid #e5e5e5; font-size:12px; color:#666; display:flex; flex-wrap:wrap; gap:16px;';
    panel.appendChild(statsBar);

    // Content
    const content = document.createElement('div');
    content.style = 'padding: 16px 20px; overflow-y: auto; flex-grow: 1;';
    panel.appendChild(content);
    document.body.appendChild(panel);

    // ================================================================
    // HELPERS
    // ================================================================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }

    function getLinkType(href) {
        if (!href) return 'unknown';
        if (href.startsWith('mailto:')) return 'email';
        if (href.startsWith('tel:')) return 'tel';
        if (href.startsWith('#')) return 'anchor';
        if (/\.(pdf|zip|rar|7z|doc|docx|xls|xlsx|ppt|pptx|mp3|mp4|avi|mov|png|jpg|jpeg|gif|svg|webp|css|js|json|xml|txt|csv)$/i.test(href)) return 'file';
        try {
            const url = new URL(href);
            const currentHost = window.location.hostname;
            if (url.hostname === currentHost) return 'internal';
            return 'external';
        } catch (e) {
            return 'unknown';
        }
    }

    function showToast(msg) {
        const t = document.createElement('div');
        t.textContent = msg;
        t.style = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            z-index: 2147483647;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: linksee-toast-in 0.3s ease;
            font-family: Arial, sans-serif;
        `;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    }

    // ================================================================
    // LINK EXTRACTION
    // ================================================================
    function extractLinks() {
        const anchors = document.querySelectorAll('a[href]');
        const seen = new Set();
        const result = [];

        anchors.forEach(a => {
            let href = a.href;
            if (!href) return;
            // Skip empty placeholders
            if (href === 'javascript:void(0);' || href === 'javascript:void(0)' || href === 'javascript:;') return;
            if (href === window.location.href && a.innerText.trim() === '') return;

            if (seen.has(href)) return;
            seen.add(href);

            const text = (a.innerText || a.title || a.getAttribute('aria-label') || '').trim();

            result.push({
                href,
                text: text || '[No text]',
                type: getLinkType(href),
                hostname: (() => {
                    try { return new URL(href).hostname; } catch (e) { return ''; }
                })(),
            });
        });

        return result;
    }

    // ================================================================
    // RENDERING
    // ================================================================
    function applyFiltersAndSort() {
        let list = [...state.links];

        // Filter by type
        if (state.filter !== 'all') {
            list = list.filter(l => l.type === state.filter);
        }

        // Search filter
        if (state.search) {
            list = list.filter(l =>
                l.text.toLowerCase().includes(state.search) ||
                l.href.toLowerCase().includes(state.search)
            );
        }

        // Sort
        switch (state.sort) {
            case 'text':
                list.sort((a, b) => a.text.localeCompare(b.text));
                break;
            case 'url':
                list.sort((a, b) => a.href.localeCompare(b.href));
                break;
            case 'length':
                list.sort((a, b) => b.href.length - a.href.length);
                break;
        }

        state.filtered = list;
    }

    function renderStats() {
        const total = state.links.length;
        const visible = state.filtered.length;
        const byType = {
            internal: state.links.filter(l => l.type === 'internal').length,
            external: state.links.filter(l => l.type === 'external').length,
            anchor: state.links.filter(l => l.type === 'anchor').length,
            email: state.links.filter(l => l.type === 'email').length,
            tel: state.links.filter(l => l.type === 'tel').length,
            file: state.links.filter(l => l.type === 'file').length,
        };

        statsBar.innerHTML = `
            <span><strong>${visible}</strong> shown</span>
            <span style="color:#888;">|</span>
            <span><strong>${total}</strong> total</span>
            <span style="color:#888;">|</span>
            <span>🌐 ${byType.internal} internal</span>
            <span>🔗 ${byType.external} external</span>
            <span>#️⃣ ${byType.anchor} anchors</span>
            <span>📧 ${byType.email} email</span>
            <span>📁 ${byType.file} files</span>
        `;
    }

    function renderLinks() {
        applyFiltersAndSort();
        renderStats();

        content.innerHTML = '';

        if (state.links.length === 0) {
            content.innerHTML = '<p style="color:#888; text-align:center; padding:40px;">No link found on this page.</p>';
            return;
        }

        if (state.filtered.length === 0) {
            content.innerHTML = '<p style="color:#888; text-align:center; padding:40px;">No link matches your search or filter.</p>';
            return;
        }

        const list = document.createElement('div');

        state.filtered.forEach((link, i) => {
            const item = document.createElement('div');
            item.style = `
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 12px;
                border-bottom: 1px solid #f0f0f0;
                transition: background 0.15s;
            `;
            item.onmouseenter = () => item.style.background = '#f8f9fa';
            item.onmouseleave = () => item.style.background = 'transparent';

            // Index + type badge
            const badge = document.createElement('span');
            badge.textContent = link.type[0].toUpperCase();
            badge.title = link.type;
            badge.style = `
                flex-shrink: 0;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #e9ecef;
                color: #495057;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 700;
            `;
            item.appendChild(badge);

            // Content
            const info = document.createElement('div');
            info.style = 'flex: 1; min-width: 0;';

            const textEl = document.createElement('div');
            textEl.textContent = link.text;
            textEl.style = 'font-weight:600; font-size:13px; color:#222; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;';
            info.appendChild(textEl);

            const urlEl = document.createElement('a');
            urlEl.href = link.href;
            urlEl.target = '_blank';
            urlEl.rel = 'noopener noreferrer';
            urlEl.textContent = link.href;
            urlEl.style = 'display:block; font-size:12px; color:#0066cc; text-decoration:none; word-break:break-all; margin-top:2px;';
            urlEl.onmouseenter = () => urlEl.style.textDecoration = 'underline';
            urlEl.onmouseleave = () => urlEl.style.textDecoration = 'none';
            info.appendChild(urlEl);

            item.appendChild(info);

            // Copy button
            const copyBtn = document.createElement('button');
            copyBtn.textContent = '📋';
            copyBtn.title = 'Copy URL';
            copyBtn.style = `
                flex-shrink: 0;
                padding: 6px 10px;
                background: #f1f3f5;
                border: 1px solid #dee2e6;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                transition: background 0.15s;
            `;
            copyBtn.onmouseenter = () => copyBtn.style.background = '#e9ecef';
            copyBtn.onmouseleave = () => copyBtn.style.background = '#f1f3f5';
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(link.href).then(() => {
                    copyBtn.textContent = '✅';
                    showToast('Link copied!');
                    setTimeout(() => copyBtn.textContent = '📋', 1200);
                }).catch(() => {
                    // Fallback
                    const ta = document.createElement('textarea');
                    ta.value = link.href;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    ta.remove();
                    copyBtn.textContent = '✅';
                    showToast('Link copied!');
                    setTimeout(() => copyBtn.textContent = '📋', 1200);
                });
            };
            item.appendChild(copyBtn);

            list.appendChild(item);
        });

        content.appendChild(list);
    }

    // ================================================================
    // OPEN / CLOSE
    // ================================================================
    function openPanel() {
        state.links = extractLinks();
        state.isOpen = true;
        panel.style.display = 'flex';
        renderLinks();
        searchInput.focus();
    }

    function closePanel() {
        state.isOpen = false;
        panel.style.display = 'none';
    }

    function togglePanel() {
        if (state.isOpen) closePanel();
        else openPanel();
    }

    mainBtn.onclick = openPanel;
    closeBtn.onclick = closePanel;

    // Copy all
    copyAllBtn.onclick = () => {
        const urls = state.filtered.map(l => l.href).join('\n');
        navigator.clipboard.writeText(urls).then(() => {
            showToast(`${state.filtered.length} links copied!`);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = urls;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
            showToast(`${state.filtered.length} links copied!`);
        });
    };

    // ================================================================
    // KEYBOARD SHORTCUTS
    // ================================================================
    document.addEventListener('keydown', (e) => {
        // Alt+L → toggle panel
        if (e.altKey && (e.key === 'l' || e.key === 'L')) {
            e.preventDefault();
            togglePanel();
        }
        // Escape → close panel
        if (e.key === 'Escape' && state.isOpen) {
            closePanel();
        }
    });

    // ================================================================
    // STYLES (inject toast animation)
    // ================================================================
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes linksee-toast-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleEl);
})();
