chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 100]});
function updateCount(){
	chrome.tabs.query( {}, function(tab){chrome.browserAction.setBadgeText({text:String(tab.length-1)});});
}
chrome.tabs.onCreated.addListener(function(){updateCount();});
chrome.tabs.onRemoved.addListener(function(){updateCount();});