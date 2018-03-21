chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.tabs.get(tabId, function(tab){
        if (tab.url.startsWith("https://docs.openshift.com"))
            chrome.pageAction.show(tabId);
        else   
            chrome.pageAction.hide(tabId); 
    });
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse)
    { 
        chrome.tabs.getSelected(function(tab) {
            if (request.action == "changeVer")
            {
                var ver = "";
                switch (request.ver) {
                    case "btnOpenLatest":
                        ver = "container-platform/latest"
                        break;
                    case "btnOpen37":
                        ver = "container-platform/3.7"
                        break;
                    case "btnOpen36":
                        ver = "container-platform/3.6"
                        break;
                    case "btnOpen35":
                        ver = "container-platform/3.5"
                        break;
                    case "btnOpen34":
                        ver = "container-platform/3.4"
                        break;
                    case "btnOpen33":
                        ver = "container-platform/3.3"
                        break;
                    case "btnOpen32":
                        ver = "enterprise/3.2"
                        break;
                    case "btnOpen31":
                        ver = "enterprise/3.1"
                        break;
                    case "btnOpen30":
                        ver = "enterprise/3.0"
                        break;
                    case "btnOpenDedicated":
                        ver = "dedicated"
                        break;
                    case "btnOpenOnline":
                        ver = "online"
                        break;
                    default:
                        console.log(request.ver + "is not a defiend version.");
                        return;
                }
                var url = tab.url;
                var newurl = url;
                if (url.startsWith("https://docs.openshift.com/container-platform/"))
                    newurl = "https://docs.openshift.com/" + ver + "/" + url.replace(/^https:\/\/docs\.openshift\.com\/container\-platform\/[\.\d]+\//, "");
                else if (url.startsWith("https://docs.openshift.com/enterprise/"))
                    newurl = "https://docs.openshift.com/" + ver + "/" + url.replace(/^https:\/\/docs\.openshift\.com\/enterprise\/[\.\d]+\//, "");
                else if (url.startsWith("https://docs.openshift.com/dedicated/"))
                    newurl = "https://docs.openshift.com/" + ver + "/" + url.substring("https://docs.openshift.com/dedicated/".length);
                else if (url.startsWith("https://docs.openshift.com/online/"))
                    newurl = "https://docs.openshift.com/" + ver + "/" + url.substring("https://docs.openshift.com/online/".length);
                else
                {
                    console.log(url+ ": is not a defiend URL.");
                    return;
                }
                chrome.tabs.update( tab.id, { url: newurl} );
            }
        });
        return true;
    }
);