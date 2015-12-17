(function(){
	'use strict';
	var count = document.getElementById('tabcount');
	var outputJson = document.getElementById('outjson');
	var outputText = document.getElementById('outtext');
	var inputJson = document.getElementById('importJsonArea');
	var importButton = document.getElementById('import');
	importButton.addEventListener('click', function() {
        ImportJson();
    });

	var tabs = ['tab_text','tab_json'];
	var tab1 = document.getElementsByClassName('tab_text');
	var tab2 = document.getElementsByClassName('tab_json');
	for(var i=0;i<tab1.length;i++){
    	tab1[i].addEventListener('click', function(){
    		outputText.classList.add('show');
    		outputText.classList.remove('hide');
    		outputJson.classList.add('hide');
    		outputJson.classList.remove('show');
    	}, false);
    }
	for(var i=0;i<tab2.length;i++){
    	tab2[i].addEventListener('click', function(){
    		outputText.classList.add('hide');
    		outputText.classList.remove('show');
    		outputJson.classList.add('show');
    		outputJson.classList.remove('hide');
    	}, false);
    }
    

	chrome.tabs.query( {}, function (tabs) {
		var tab = tabs;
		var json = "";
		var plaintext = "";
		count.textContent = tab.length;
		function outasjson(){
			json += "[";
			for(var v in tab){
				json += "{";
				json += "\"title\": \"" + tab[v].title + "\",\"url\": \"" + tab[v].url + "\""; //json 
				if(v == tab.length - 1){
					json += "}";
				} else {
					json += "},";
				}
			}
			json += "]";
		}outasjson();
		function outastext(){
			for(var v in tab){
				plaintext += tab[v].title + "\t" + tab[v].url + "\n"; //json 
			}
		}outastext();
		outputJson.value = json;
		outputText.value = plaintext;
	});
	function ImportJson(){
		console.log(inputJson.value);
		if(inputJson.value == ""){
			inputJson.value = "ERROR";
		} else {
			var urls = JSON.parse(inputJson.value);
			for(var v in urls){
				openTabs(urls[v].url);
			}
		}
	}

	function openTabs(link){
		chrome.tabs.create({url:link},function(tabs){
			return true;
		});
	}
})();