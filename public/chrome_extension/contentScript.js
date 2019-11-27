chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method === "getHtml"){
                sendResponse({data: document.all[0].outerHTML, method: "getHtml"});
        }
    }
);

var ribbonDiv = document.createElement("div")

ribbonDiv.classList.add("corner-ribbon", "bottom-right", "sticky", "blue", "shadow")

var img = document.createElement("img");
img.src = chrome.runtime.getURL("chrome_extension/images/stats-dots.svg");
ribbonDiv.appendChild(img)
// ribbonDiv.innerHTML = "Show Stats"

ribbonDiv.addEventListener('click', function (event) {
    chrome.runtime.sendMessage({type: "showStats", data: document.all[0].outerHTML});
});

document.body.insertBefore(ribbonDiv, document.body.firstChild);

