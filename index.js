var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "content_scripts",
  label: "Opens up the housing website on live/dev",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
	current = tabs.activeTab.url;
	if (current.slice(0, 11) == 'http://nari') {
		current = current.replace('nari.', '');
		current = current.replace('~vonzimp', 'apps');
} else {
	current = 'http://nari.' + current.split('//')[1]
	current = current.replace('apps', '~vonzimp');
	
}
  tabs.open(current);
}
