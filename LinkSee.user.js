// ==UserScript==
// @name         LinkSee
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A Tampermonkey userscript that extracts and displays all links from any webpage in a clean interface.
// @author       AdrienPlaza
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ================================================================
    // FLOATING BUTTON
    // ================================================================
    const mainBtn = document.createElement('button');
    mainBtn.innerText = '🔗 See links';
    mainBtn.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: Arial, sans-serif;
        font-size: 14px;
    `;
    document.body.appendChild(mainBtn);

    // ================================================================
    // PANEL
    // ================================================================
    const panel = document.createElement('div');
    panel.style = `
        position: fixed;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        background-color: white;
        border: 2px solid #ccc;
        border-radius: 8px;
        z-index: 10001;
        display: none;
        flex-direction: column;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
    `;

    // Header
    const header = document.createElement('div');
    header.style = `
        padding: 15px;
        background-color: #f1f1f1;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    `;
    header.innerHTML = '<h3 style="margin:0; color:#333;">Links found on this page</h3>';

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close ✖';
    closeBtn.style = 'padding: 5px 10px; cursor: pointer; background: #dc3545; color: white; border: none; border-radius: 3px;';
    closeBtn.onclick = () => panel.style.display = 'none';
    header.appendChild(closeBtn);
    panel.appendChild(header);

    // Content
    const content = document.createElement('div');
    content.style = 'padding: 15px; overflow-y: auto; flex-grow: 1;';
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

    // ================================================================
    // MAIN LOGIC
    // ================================================================
    mainBtn.onclick = function () {
        content.innerHTML = '';

        const links = document.querySelectorAll('a');

        if (links.length === 0) {
            content.innerHTML = '<p style="color: #666;">No link found on this page.</p>';
            panel.style.display = 'flex';
            return;
        }

        // Deduplicate by href
        const seen = new Set();
        const uniqueLinks = [];

        links.forEach(link => {
            const href = link.href;
            if (!href || href === 'javascript:void(0);' || href === 'javascript:void(0)') return;
            if (seen.has(href)) return;
            seen.add(href);
            uniqueLinks.push({ href, text: link.innerText.trim() });
        });

        if (uniqueLinks.length === 0) {
            content.innerHTML = '<p style="color: #666;">No valid link found on this page.</p>';
            panel.style.display = 'flex';
            return;
        }

        // Header info
        const info = document.createElement('p');
        info.style = 'margin: 0 0 12px 0; color: #555; font-size: 13px;';
        info.textContent = `${uniqueLinks.length} unique link${uniqueLinks.length > 1 ? 's' : ''} found.`;
        content.appendChild(info);

        // List
        const list = document.createElement('ol');
        list.style = 'margin: 0; padding-left: 20px;';

        uniqueLinks.forEach(({ href, text }) => {
            const listItem = document.createElement('li');
            listItem.style = 'margin-bottom: 8px; font-size: 14px;';
            listItem.innerHTML = `
                <strong>${escapeHtml(text || '[Link without text or image]')}</strong> -
                <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; word-break: break-all;">${escapeHtml(href)}</a>
            `;
            list.appendChild(listItem);
        });

        content.appendChild(list);
        panel.style.display = 'flex';
    };
})();
