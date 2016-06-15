(function(){
	'use strict';
	let json;

	// iroiro
	const count = document.getElementById('tabcount');
	const outputJson = document.getElementById('outjson');
	const outputText = document.getElementById('outtext');
	const inputJson = document.getElementById('importJsonArea');
	const importButton = document.getElementById('import');
	const fileSave = document.getElementById('savefile');
	const tab1 = document.getElementById('tab_text');
	const tab2 = document.getElementById('tab_json');

	importButton.addEventListener('click', function() {
        ImportJson();
    });

	fileSave.addEventListener('click', function() {
        SaveFile();
    });

    tab1.addEventListener('click', function(){
    	outputText.classList.add('show');
    	outputText.classList.remove('hide');
    	outputJson.classList.add('hide');
    	outputJson.classList.remove('show');
    }, false);
    tab2.addEventListener('click', function(){
    	outputText.classList.add('hide');
    	outputText.classList.remove('show');
    	outputJson.classList.add('show');
    	outputJson.classList.remove('hide');
    }, false);

	chrome.tabs.query( {}, function (tabs) {
		const new_tabs = [];
		let plaintext = "";

		tabs.forEach(function(tab){
			new_tabs.push({title: tab.title,url: tab.url});
		});
		count.textContent = new_tabs.length;
		json = JSON.stringify(new_tabs);
		new_tabs.forEach(function(tab){
			plaintext = plaintext + tab.title + " " + tab.url + "\n";
		});
		outputJson.value = json;
		outputText.value = plaintext;

		console.debug(new_tabs);
		console.debug(json);
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
			console.debug(tab);
		});
	}

	function ShowError(){
		var errorElement = document.getElementById('error');
		errorElement.classList.remove('hide');
		errorElement.classList.add('show');
		clearInterval(errorAnim);
		var errorAnim = setInterval(function(){
			errorElement.classList.remove('show');
			errorElement.classList.add('hide');
		},3000);
	}

	function SaveFile(){
		var blob = new Blob([json], {type: "application/json;charset=utf-8"});
		var filename = "chrome_tabs.json";
		saveAs(blob, filename);
	}
})();
