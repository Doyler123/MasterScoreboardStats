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


  chrome.browserAction.onClicked.addListener(function(tab) { 
    chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {method: "getHtml"}, function(response) {
          if(response.method=="getHtml"){
              chrome.storage.local.set({scoresHtml: response.data}, function() {
                  chrome.tabs.create({url: chrome.extension.getURL('../index.html')});
              });
          }
      });
  });
});
