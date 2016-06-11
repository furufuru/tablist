"use strict";
console.debug("init");
chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 100]});

const updateCount = function(){
	chrome.tabs.query( {}, function(tab){chrome.browserAction.setBadgeText({text:String(tab.length)});});
}

chrome.tabs.onCreated.addListener(function(){updateCount();});
chrome.tabs.onRemoved.addListener(function(){updateCount();});

