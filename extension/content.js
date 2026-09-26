// LinkSee - content script (browser extension build)
// https://github.com/AdrienPlaza/LinkSee
(function () {
    'use strict';

    if (window.__LINKSEE_LOADED__) return;
    window.__LINKSEE_LOADED__ = true;

    // ================================================================
    // CONFIG
    // ================================================================
    const CONFIG = {
        accentColor: '#007bff',
        accentHover: '#0056b3',
    };

    // LinkSee logo, embedded as a data URI so it works on every site
    const LOGO = 'data:image/png;base64,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';

    // ================================================================
    // PALETTE (light / dark, follows prefers-color-scheme)
    // ================================================================
    const darkMode = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const P = darkMode ? {
        bg: '#1e1f22',
        fg: '#e6e6e6',
        sub: '#9aa0a6',
        border: '#3a3d41',
        line: '#2c2e31',
        tool: '#24262a',
        hover: '#2a2d31',
        field: '#24262a',
        fieldBorder: '#3a3d41',
        link: '#7fb3ff',
        badgeBg: '#33363b',
        badgeFg: '#cfd2d6',
        btnBg: '#2f3237',
        btnBorder: '#3f4348',
        btnHover: '#3a3d41',
        empty: '#8a8f98',
    } : {
        bg: '#ffffff',
        fg: '#333333',
        sub: '#666666',
        border: '#dddddd',
        line: '#f0f0f0',
        tool: '#f8f9fa',
        hover: '#f8f9fa',
        field: '#ffffff',
        fieldBorder: '#cccccc',
        link: '#0066cc',
        badgeBg: '#e9ecef',
        badgeFg: '#495057',
        btnBg: '#f1f3f5',
        btnBorder: '#dee2e6',
        btnHover: '#e9ecef',
        empty: '#888888',
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
    mainBtn.type = 'button';
    mainBtn.setAttribute('data-linksee', '');
    mainBtn.title = 'LinkSee — Show all links (Alt+L)';
    const mainBtnLogo = document.createElement('img');
    mainBtnLogo.src = LOGO;
    mainBtnLogo.alt = '';
    mainBtnLogo.draggable = false;
    mainBtnLogo.style = 'width:100%; height:100%; object-fit:cover; border-radius:50%; display:block; pointer-events:none;';
    mainBtnLogo.onerror = () => {
        mainBtnLogo.remove();
        mainBtn.innerText = '🔗';
    };
    mainBtn.appendChild(mainBtnLogo);
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
        transition: transform 0.2s, filter 0.2s;
    `;
    mainBtn.onmouseenter = () => {
        mainBtn.style.transform = 'scale(1.1)';
        mainBtn.style.filter = 'brightness(1.12)';
    };
    mainBtn.onmouseleave = () => {
        mainBtn.style.transform = 'scale(1)';
        mainBtn.style.filter = 'none';
    };

    // Link count badge
    const badgeEl = document.createElement('span');
    badgeEl.style = `
        position: absolute;
        top: -5px;
        right: -5px;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        box-sizing: border-box;
        background: #ff4757;
        color: #fff;
        border: 2px solid #fff;
        border-radius: 9px;
        font-size: 10px;
        font-weight: 700;
        line-height: 14px;
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        font-family: Arial, sans-serif;
    `;
    mainBtn.appendChild(badgeEl);
    document.body.appendChild(mainBtn);

    function setBadge(count) {
        badgeEl.textContent = count > 999 ? '999+' : String(count);
        badgeEl.style.display = count > 0 ? 'flex' : 'none';
    }

    function countPageLinks() {
        let n = 0;
        document.querySelectorAll('a[href]').forEach(a => {
            if (!(a.closest && a.closest('[data-linksee]'))) n++;
        });
        return n;
    }

    // ================================================================
    // PANEL
    // ================================================================
    const panel = document.createElement('div');
    panel.setAttribute('data-linksee', '');
    panel.style = `
        position: fixed;
        top: 5%;
        left: 5%;
        width: 90%;
        height: 90%;
        background-color: ${P.bg};
        border: 1px solid ${P.border};
        border-radius: 12px;
        z-index: 2147483647;
        display: none;
        flex-direction: column;
        box-shadow: 0 10px 40px rgba(0,0,0,0.25);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        color: ${P.fg};
        overflow: hidden;
    `;

    // Header
    const header = document.createElement('div');
    header.style = `
        padding: 14px 20px;
        background: linear-gradient(135deg, ${CONFIG.accentColor}, ${CONFIG.accentHover});
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    `;
    const headerTitle = document.createElement('div');
    headerTitle.style = 'display:flex; align-items:center; gap:10px; min-width:0;';

    const headerLogo = document.createElement('img');
    headerLogo.src = LOGO;
    headerLogo.alt = '';
    headerLogo.draggable = false;
    headerLogo.style = 'width:24px; height:24px; border-radius:6px; display:block; flex-shrink:0;';
    headerLogo.onerror = () => headerLogo.remove();
    headerTitle.appendChild(headerLogo);

    const headerTitleText = document.createElement('h3');
    headerTitleText.textContent = 'LinkSee — Links on this page';
    headerTitleText.style = 'margin:0; font-size:16px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;';
    headerTitle.appendChild(headerTitleText);
    header.appendChild(headerTitle);

    const headerActions = document.createElement('div');
    headerActions.style = 'display:flex; gap:8px; align-items:center; flex-wrap:wrap; justify-content:flex-end;';

    function headerBtn(label, title, onClick, extraStyles) {
        const b = document.createElement('button');
        b.type = 'button';
        b.innerText = label;
        b.title = title;
        b.style = 'padding:6px 12px; cursor:pointer; background:rgba(255,255,255,0.2); color:white; border:1px solid rgba(255,255,255,0.3); border-radius:6px; font-size:12px; font-weight:600; white-space:nowrap; box-sizing:border-box; flex-shrink:0; transition: background 0.2s;' + (extraStyles || '');
        b.onmouseenter = () => b.style.background = 'rgba(255,255,255,0.35)';
        b.onmouseleave = () => b.style.background = 'rgba(255,255,255,0.2)';
        b.onclick = onClick;
        return b;
    }

    const copyAllBtn = headerBtn('📋 Copy all', 'Copy every visible link', copyAll);
    const exportTxtBtn = headerBtn('⬇ TXT', 'Export visible links as a .txt file', exportTxt);
    const exportCsvBtn = headerBtn('⬇ CSV', 'Export visible links as a .csv file', exportCsv);
    headerActions.appendChild(copyAllBtn);
    headerActions.appendChild(exportTxtBtn);
    headerActions.appendChild(exportCsvBtn);

    const closeBtn = headerBtn('✖', 'Close (Esc)', closePanel,
        'width:32px; min-width:32px; height:32px; padding:0; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px;');
    headerActions.appendChild(closeBtn);

    header.appendChild(headerActions);
    panel.appendChild(header);

    // Toolbar (search + filters + sort)
    const toolbar = document.createElement('div');
    toolbar.style = `
        padding: 12px 20px;
        background: ${P.tool};
        border-bottom: 1px solid ${P.border};
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
    `;

    // Search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search links, text or domain...';
    searchInput.style = `
        flex: 1;
        min-width: 200px;
        padding: 8px 12px;
        border: 1px solid ${P.fieldBorder};
        border-radius: 6px;
        font-size: 13px;
        outline: none;
        background: ${P.field};
        color: ${P.fg};
        transition: border-color 0.2s;
    `;
    searchInput.onfocus = () => searchInput.style.borderColor = CONFIG.accentColor;
    searchInput.onblur = () => searchInput.style.borderColor = P.fieldBorder;
    searchInput.oninput = () => {
        state.search = searchInput.value.toLowerCase().trim();
        renderLinks();
    };
    toolbar.appendChild(searchInput);

    // Filter select
    const filterSelect = document.createElement('select');
    filterSelect.style = `padding:8px 12px; border:1px solid ${P.fieldBorder}; border-radius:6px; font-size:13px; background:${P.field}; color:${P.fg}; cursor:pointer; outline:none;`;
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
    sortSelect.style = `padding:8px 12px; border:1px solid ${P.fieldBorder}; border-radius:6px; font-size:13px; background:${P.field}; color:${P.fg}; cursor:pointer; outline:none;`;
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
    statsBar.style = `padding:8px 20px; background:${P.bg}; border-bottom:1px solid ${P.border}; font-size:12px; color:${P.sub}; display:flex; flex-wrap:wrap; gap:16px;`;
    panel.appendChild(statsBar);

    // Content
    const content = document.createElement('div');
    content.style = 'padding: 16px 20px; overflow-y: auto; flex-grow: 1;';
    panel.appendChild(content);
    document.body.appendChild(panel);

    // ================================================================
    // HELPERS
    // ================================================================
    function getLinkType(raw, resolved) {
        if (!raw) return 'unknown';
        if (raw.startsWith('#')) return 'anchor';
        if (/^mailto:/i.test(raw)) return 'email';
        if (/^tel:/i.test(raw)) return 'tel';
        try {
            const url = new URL(resolved);
            if (/\.(pdf|zip|rar|7z|doc|docx|xls|xlsx|ppt|pptx|mp3|mp4|avi|mov|png|jpg|jpeg|gif|svg|webp|css|js|json|xml|txt|csv)$/i.test(url.pathname)) return 'file';
            if (url.protocol === 'data:' || url.protocol === 'blob:') return 'file';
            if (url.hostname === window.location.hostname) return 'internal';
            return 'external';
        } catch (e) {
            return 'unknown';
        }
    }

    function legacyCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style = 'position:fixed; top:-1000px; opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        ta.remove();
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
        }
        legacyCopy(text);
        return Promise.resolve();
    }

    function downloadFile(name, text, mime) {
        const blob = new Blob(['\uFEFF' + text], { type: mime + ';charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function showToast(msg) {
        const t = document.createElement('div');
        t.setAttribute('data-linksee', '');
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
            font-family: Arial, sans-serif;
        `;
        document.body.appendChild(t);
        if (typeof t.animate === 'function') {
            t.animate(
                [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }],
                { duration: 250, easing: 'ease' }
            );
        }
        setTimeout(() => {
            if (typeof t.animate === 'function') {
                const out = t.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease' });
                out.onfinish = () => t.remove();
            } else {
                t.remove();
            }
        }, 1800);
    }

    // ================================================================
    // LINK EXTRACTION
    // ================================================================
    function extractLinks() {
        const anchors = document.querySelectorAll('a[href]');
        const seen = new Set();
        const result = [];

        anchors.forEach(a => {
            // Never extract the extension's own UI
            if (a.closest && a.closest('[data-linksee]')) return;

            const raw = (a.getAttribute('href') || '').trim();
            if (!raw) return;
            if (/^javascript:/i.test(raw)) return;

            const href = a.href;
            if (!href) return;
            if (href === window.location.href && !(a.innerText || '').trim()) return;
            if (seen.has(href)) return;
            seen.add(href);

            const text = ((a.innerText || '') || a.getAttribute('aria-label') || a.title || a.textContent || '').trim();

            result.push({
                href,
                text: text || '[No text]',
                type: getLinkType(raw, href),
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

        // Search filter (text, url or domain)
        if (state.search) {
            list = list.filter(l =>
                l.text.toLowerCase().includes(state.search) ||
                l.href.toLowerCase().includes(state.search) ||
                l.hostname.toLowerCase().includes(state.search)
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
        const count = t => state.links.filter(l => l.type === t).length;
        const strong = s => `<strong style="color:${P.fg}">${s}</strong>`;

        statsBar.innerHTML = `
            <span>${strong(visible)} shown</span>
            <span>|</span>
            <span>${strong(total)} total</span>
            <span>|</span>
            <span>🌐 ${count('internal')} internal</span>
            <span>🔗 ${count('external')} external</span>
            <span>#️⃣ ${count('anchor')} anchors</span>
            <span>📧 ${count('email')} email</span>
            <span>📞 ${count('tel')} phone</span>
            <span>📁 ${count('file')} files</span>
        `;
    }

    function renderLinks() {
        applyFiltersAndSort();
        renderStats();

        content.innerHTML = '';

        if (state.links.length === 0) {
            content.innerHTML = `<p style="color:${P.empty}; text-align:center; padding:40px;">No link found on this page.</p>`;
            return;
        }

        if (state.filtered.length === 0) {
            content.innerHTML = `<p style="color:${P.empty}; text-align:center; padding:40px;">No link matches your search or filter.</p>`;
            return;
        }

        const list = document.createElement('div');

        state.filtered.forEach(link => {
            const item = document.createElement('div');
            item.style = `
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 12px;
                border-bottom: 1px solid ${P.line};
                transition: background 0.15s;
            `;
            item.onmouseenter = () => item.style.background = P.hover;
            item.onmouseleave = () => item.style.background = 'transparent';

            // Type badge
            const badge = document.createElement('span');
            badge.textContent = link.type[0].toUpperCase();
            badge.title = link.type;
            badge.style = `
                flex-shrink: 0;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: ${P.badgeBg};
                color: ${P.badgeFg};
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
            textEl.style = `font-weight:600; font-size:13px; color:${P.fg}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;`;
            info.appendChild(textEl);

            const urlEl = document.createElement('a');
            urlEl.href = link.href;
            urlEl.target = '_blank';
            urlEl.rel = 'noopener noreferrer';
            urlEl.textContent = link.href;
            urlEl.style = `display:block; font-size:12px; color:${P.link}; text-decoration:none; word-break:break-all; margin-top:2px;`;
            urlEl.onmouseenter = () => urlEl.style.textDecoration = 'underline';
            urlEl.onmouseleave = () => urlEl.style.textDecoration = 'none';
            info.appendChild(urlEl);

            item.appendChild(info);

            // Copy button
            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.textContent = '📋';
            copyBtn.title = 'Copy URL';
            copyBtn.style = `
                flex-shrink: 0;
                padding: 6px 10px;
                background: ${P.btnBg};
                border: 1px solid ${P.btnBorder};
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                transition: background 0.15s;
            `;
            copyBtn.onmouseenter = () => copyBtn.style.background = P.btnHover;
            copyBtn.onmouseleave = () => copyBtn.style.background = P.btnBg;
            copyBtn.onclick = () => {
                copyText(link.href).then(() => {
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
        setBadge(state.links.length);
        searchInput.focus();
        searchInput.select();
    }

    function closePanel() {
        state.isOpen = false;
        panel.style.display = 'none';
    }

    function togglePanel() {
        if (state.isOpen) closePanel();
        else openPanel();
    }

    mainBtn.onclick = togglePanel;

    // ================================================================
    // COPY / EXPORT
    // ================================================================
    function copyAll() {
        if (state.filtered.length === 0) {
            showToast('No link to copy');
            return;
        }
        const urls = state.filtered.map(l => l.href).join('\n');
        copyText(urls).then(() => showToast(`${state.filtered.length} links copied!`));
    }

    function exportTxt() {
        if (state.filtered.length === 0) {
            showToast('No link to export');
            return;
        }
        downloadFile('linksee-links.txt', state.filtered.map(l => l.href).join('\r\n'), 'text/plain');
        showToast(`${state.filtered.length} links exported!`);
    }

    function exportCsv() {
        if (state.filtered.length === 0) {
            showToast('No link to export');
            return;
        }
        const esc = v => '"' + String(v).replace(/"/g, '""') + '"';
        const rows = [['Text', 'URL', 'Type'].map(esc).join(',')]
            .concat(state.filtered.map(l => [l.text, l.href, l.type].map(esc).join(',')));
        downloadFile('linksee-links.csv', rows.join('\r\n'), 'text/csv');
        showToast(`${state.filtered.length} links exported!`);
    }

    // ================================================================
    // KEYBOARD SHORTCUTS
    // ================================================================
    function isTypingTarget(el) {
        if (!el || !el.tagName) return false;
        const tag = el.tagName.toUpperCase();
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable === true;
    }

    document.addEventListener('keydown', (e) => {
        // Alt+L → toggle panel
        if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 'l' || e.key === 'L')) {
            e.preventDefault();
            togglePanel();
        }
        // Escape → close panel
        if (e.key === 'Escape' && state.isOpen) {
            closePanel();
        }
        // "/" → focus the search field while the panel is open
        if (e.key === '/' && state.isOpen && !isTypingTarget(e.target)) {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });

    // ================================================================
    // TOOLBAR ICON CLICK (browser extension only)
    // ================================================================
    try {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
            chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
                if (msg && msg.linksee === 'toggle') {
                    togglePanel();
                    sendResponse({ ok: true });
                }
            });
        }
    } catch (e) { /* not running as an extension */ }

    // ================================================================
    // LINK COUNT BADGE (computed when the browser is idle)
    // ================================================================
    const idle = window.requestIdleCallback || (fn => setTimeout(fn, 500));
    idle.call(window, () => {
        if (!state.isOpen) setBadge(countPageLinks());
    }, { timeout: 3000 });
})();
