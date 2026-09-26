chrome.action.onClicked.addListener((tab) => {
    if (!tab || tab.id == null) return;
    chrome.tabs.sendMessage(tab.id, { linksee: 'toggle' }, () => {
        void chrome.runtime.lastError;
    });
});
