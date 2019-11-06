chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method === "getHtml"){
            // var url = getUrl
            // if(url){
            //     fetch(getUrl()).then(r => r.text()).then(result => {
            //         var parser = new DOMParser()
            //         var html = parser.parseFromString(result, 'text/html')
            //         sendResponse({data: document.all[0].outerHTML, data2 : html,method: "getHtml"});
            //     })
            // }else{
                sendResponse({data: document.all[0].outerHTML, method: "getHtml"});
            // }
        }
    }
);

var getUrl = function(){
    var url = new URL(window.location.href)
    if(!url){
        return null
    }
    var CWID = url.searchParams.get("CWID")
    var Param2 = url.searchParams.get("Player")
    
    return 'https://www.masterscoreboard.co.uk/results/PlayerHandicapRecord.php?CWID=' + CWID + '&Param2=' + Param2

}

