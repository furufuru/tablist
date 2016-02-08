(function(){
	'use strict';

	// iroiro
	var count = document.getElementById('tabcount');
	var outputJson = document.getElementById('outjson');
	var outputText = document.getElementById('outtext');
	var inputJson = document.getElementById('importJsonArea');
	var importButton = document.getElementById('import');
	var tab1 = document.getElementsByClassName('tab_text');
	var tab2 = document.getElementsByClassName('tab_json');

	importButton.addEventListener('click', function() {
        ImportJson();
    });

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
		var json = "";
		var plaintext = "";
		count.textContent = tabs.length;
		function outasjson(){
			json += "[";
			for(var v in tabs){
				json += "{";
				json += "\"title\": \"" + tabs[v].title + "\",\"url\": \"" + tabs[v].url + "\""; //json 
				if(v == tabs.length - 1){
					json += "}";
				} else {
					json += "},";
				}
			}
			json += "]";
		}outasjson();
		function outastext(){
			for(var v in tabs){
				plaintext += tabs[v].title + "\t" + tabs[v].url + "\n"; //json 
			}
		}outastext();
		outputJson.value = json;
		outputText.value = plaintext;
	});
	function ImportJson(){
		if(inputJson.value == "" || inputJson.value == null){
			console.log("Nothing");
			ShowError();
		} else {
			try{
				var urls = JSON.parse(inputJson.value);
				for(var v in urls){
					openTabs(urls[v].url);
				}
			} catch(e) {
				console.log("Invaild JSON: " + e);
				ShowError();
			}
		}
	}

	function openTabs(link){
		chrome.tabs.create({url:link},function(tab){
			console.log(tab);
			return true;
		});
	}

	function ShowError(){
		var errorElement = document.getElementById('error');
		errorElement.classList.remove('hide');
		errorElement.classList.add('show');
		setInterval(function(){
			errorElement.classList.remove('show');
			errorElement.classList.add('hide');
		},3000);
	}
})();
