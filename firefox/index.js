//   var self = require('sdk/self');
//   
//   // a dummy function, to show how tests work.
//   // to see how to test this function, look at test/test-index.js
//   function dummy(text, callback) {
//     callback(text);
//   }
//   
//   exports.dummy = dummy;

var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
  id: "TabList",
  label: "TabList",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  badge: 0,
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: self.data.url("./popup.html"),
  onHide: handleHide
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}
