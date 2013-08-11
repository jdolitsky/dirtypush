chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    console.log(request);
    console.log(request.content);
    var method = request.method;
    if (method == 'saveChange') {
        chrome.tabs.get(request.tab, function(tab){
            console.log(tab);
            $.ajax({   
                type: 'POST',
                cache: false,  
                url: tab.url+'unload.css', 
                data: {content: request.content},  
                success: function(data){
                                          
                }   
            }); 
        });
    }

});