chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method === "getHtml"){
                sendResponse({data: document.all[0].outerHTML, method: "getHtml"});
        }
    }
);

var ribbonDiv = document.createElement("div")
ribbonDiv.classList.add("chromeExtensionRibbon")
ribbonDiv.innerHTML = "Hello World"
document.body.insertBefore(ribbonDiv, document.body.firstChild);

