// ==UserScript==
// @name         Extracteur de Liens Révélés
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Affiche tous les liens associés et présents sur la page actuelle dans une interface propre.
// @author       Fluxi
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    
    const mainBtn = document.createElement('button');
    mainBtn.innerText = '🔗 Voir les liens';
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
    header.innerHTML = '<h3 style="margin:0; color:#333;">Liens trouvés sur la page</h3>';

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Fermer ✖';
    closeBtn.style = 'padding: 5px 10px; cursor: pointer; background: #dc3545; color: white; border: none; border-radius: 3px;';
    closeBtn.onclick = () => panel.style.display = 'none';
    header.appendChild(closeBtn);
    panel.appendChild(header);

  
    const content = document.createElement('div');
    content.style = 'padding: 15px; overflow-y: auto; flex-grow: 1;';
    panel.appendChild(content);
    document.body.appendChild(panel);

  
    mainBtn.onclick = function() {
        
        content.innerHTML = '';

        
        const links = document.querySelectorAll('a');

        if (links.length === 0) {
            content.innerHTML = '<p style="color: #666;">Aucun lien trouvé sur cette page.</p>';
        } else {
            const list = document.createElement('ol');
            list.style = 'margin: 0; padding-left: 20px;';

            links.forEach(link => {
                const href = link.href;
                const text = link.innerText.trim() || '[Lien sans texte ou image]';

             
                if (href && href !== 'javascript:void(0);') {
                    const listItem = document.createElement('li');
                    listItem.style = 'margin-bottom: 8px; font-size: 14px;';

                    listItem.innerHTML = `
                        <strong>${text}</strong> -
                        <a href="${href}" target="_blank" style="color: #0066cc; word-break: break-all;">${href}</a>
                    `;
                    list.appendChild(listItem);
                }
            });
            content.appendChild(list);
        }

       
        panel.style.display = 'flex';
    };
})();
