chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(event, content) {
    chrome.extension.sendRequest({method: 'saveChange', tab: chrome.devtools.inspectedWindow.tabId, content: content});
});