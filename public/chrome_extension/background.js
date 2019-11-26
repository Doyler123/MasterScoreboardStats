chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlMatches: 'https:\/\/www\.masterscoreboard\.co\.uk\/results\/PlayerScores\.php\?.*'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
  });

var getExtensionTabs = function(tabs){
  return tabs.filter(function(tab){
    return tab.url.includes(chrome.runtime.id)
  }).map(function(tab){
    return tab.id
  })
}

chrome.pageAction.onClicked.addListener(function(tab) { 
    chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {method: "getHtml"}, function(response) {
          if(response.method=="getHtml"){
            chrome.tabs.query({url: "<all_urls>"}, function(tabs) {
              chrome.tabs.remove(getExtensionTabs(tabs), function(){
                chrome.storage.local.set({scoresHtml: response.data}, function() {
                  chrome.tabs.create({
                    index: tab[0].index + 1,
                    url: chrome.extension.getURL('../index.html')
                  });
                });
              })
            })
          }
      });
  });
});


chrome.runtime.onMessage.addListener(function(message){
  if (message.type === "showStats"){
    chrome.tabs.query({url: "<all_urls>"}, function(tabs) {
      chrome.tabs.remove(getExtensionTabs(tabs), function(){
        chrome.storage.local.set({scoresHtml: message.data}, function() {
          chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
            chrome.tabs.create({
              index: tab[0].index + 1,
              url: chrome.extension.getURL('../index.html')
            });
          })
        })
      })
    })
  }
});