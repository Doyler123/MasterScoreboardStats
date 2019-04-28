chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
      chrome.tabs.sendMessage(tab[0].id, {method: "getHtml"}, function(response) {
        if(response.method=="getHtml"){
            chrome.storage.local.set({scoresHtml: response.data}, function() {
                chrome.tabs.create({url: chrome.extension.getURL('../index.html')});
            });
        }
    });
});  