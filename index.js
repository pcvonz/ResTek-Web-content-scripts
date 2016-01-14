var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = ToggleButton({
  id: "content_scripts",
  label: "Opens up the housing website on live/dev",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  //onClick: handleClick,
  onChange: handleChange
});

var panel = panels.Panel({
	contnetURL: self.data.url("panel.html"),
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

function handleClick(state) {
	current = tabs.activeTab.url;
	if ((current.slice(0, 11) == 'http://nari') || (current.slice(0, 4) == 'nari')) {
		current = current.replace('nari.', '');
		current = current.replace('~vonzimp', 'apps');
} else {
	current = 'http://nari.' + current.split('//')[1]
	current = current.replace('apps', '~vonzimp');
	
}
  tabs.open(current);
}
