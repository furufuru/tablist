(function(){
	var count = document.getElementById('tabcount');
	var output = document.getElementById('outjson');
	var outputtext = document.getElementById('outtext');
	var inputJson = document.getElementById('importJsonArea');
	var importButton = document.getElementById('import');
	importButton.addEventListener('click', function() {
        ImportJson();
    });
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
				json += "},";
			}
			json += "]";
		}outasjson();
		function outastext(){
			for(var v in tab){
				plaintext += tab[v].title + "\t" + tab[v].url + "\n"; //json 
			}
		}outastext();
		output.value = json;
		outputtext.value = plaintext;
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