chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(event, content) {
	chrome.devtools.inspectedWindow.eval(
	    "document.getElementById('dirtypush')",
	     function(result, isException) {
	     	if (result !== null) {
	     		chrome.extension.sendRequest({method: 'saveChange', tab: chrome.devtools.inspectedWindow.tabId, content: content});
	     	}
	     }
	);	
});