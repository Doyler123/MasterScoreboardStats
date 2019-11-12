chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method === "getHtml"){
                sendResponse({data: document.all[0].outerHTML, method: "getHtml"});
        }
    }
);

