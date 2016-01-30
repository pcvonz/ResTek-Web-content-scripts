var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var name = "set-name";

var button = ToggleButton({
  id: "content_scripts",
  label: "Opens up the housing website on live/dev",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
	contentURL: self.data.url("panel.html"),
  contentScriptFile: self.data.url("get-text.js"),
	onHide: handleHide
});

function handleChange(state) {
	if (state.checked) {
		panel.show({
			position: button
		});
	}
}
panel.on("show", function() {
  panel.port.emit("show");
})

panel.port.on("text-entered", function(text) {
  name = text;
  panel.hide();
})

function handleHide() {
	button.state('window', {checked: false});
}

panel.port.on("buttonClicked", function() {
	current = tabs.activeTab.url;
  console.log(current);
	if ((current.slice(0, 11) == 'http://nari') || (current.slice(0, 4) == 'nari')) {
		current = current.replace('nari.', '');
		current = current.replace(name, 'apps');
    panel.port.emit("hideDev");

} else {
	current = 'http://nari.' + current.split('//')[1]
	current = current.replace('apps', name);
  panel.port.emit("hideLive");
}
  tabs.open(current);
});
