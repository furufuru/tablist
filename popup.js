(function(){
	'use strict';

	// iroiro
	var count = document.getElementById('tabcount');
	var outputJson = document.getElementById('outjson');
	var outputText = document.getElementById('outtext');
	var inputJson = document.getElementById('importJsonArea');
	var importButton = document.getElementById('import');
	var fileSave = document.getElementById('savefile');
	var tab1 = document.getElementsByClassName('tab_text');
	var tab2 = document.getElementsByClassName('tab_json');

	importButton.addEventListener('click', function() {
        ImportJson();
    });

	fileSave.addEventListener('click', function() {
        SaveFile();
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
		var new_tabs = [];
		var json;
		var plaintext = "";

		tabs.forEach(function(tab){
			var temp_obj = [];var temp_arr = {};
			temp_arr.title = tab.title;
			temp_arr.url = tab.url;
			new_tabs.push(temp_arr);
		});
		count.textContent = new_tabs.length;
		console.log(new_tabs);
		json = JSON.stringify(new_tabs);
		console.log(json);
		/*function outastext(){
			for(var v in tabs){
				plaintext += tabs[v].title + "\t" + tabs[v].url + "\n"; //json 
			}
		}outastext();*/
		new_tabs.forEach(function(tab){
			plaintext = plaintext + tab.title + " " + tab.url + "\n";
		});
		outputJson.value = json;
		outputText.value = plaintext;
	});

	function ImportJson(){
		if(inputJson.value == "" || inputJson.value == null){
			console.log("Empty data.");
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
		var errorAnim;
		var errorElement = document.getElementById('error');
		errorElement.classList.remove('hide');
		errorElement.classList.add('show');
		clearInterval(errorAnim);
		errorAnim = setInterval(function(){
			errorElement.classList.remove('show');
			errorElement.classList.add('hide');
		},3000);
	}

	function SaveFile(){
		var json = outputJson.value;
		var blob = new Blob([json], {type: "application/json;charset=utf-8"});
		var filename = "chrome_tabs.json";
		saveAs(blob, filename);
	}
})();
