// When the user hits return, send the "text-entered"
// message to main.js.
// The message payload is the contents of the edit box.
var textArea = document.getElementById("edit-box");
document.getElementById("change-page").onclick = function() {
  self.port.emit("text-entered", text);
  self.port.emit("buttonClicked");
};

textArea.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode == 13) {
    // Remove the newline.
    text = textArea.value.replace(/(\r\n|\n|\r)/gm,"");
    self.port.emit("text-entered", text);
    textArea.value = '';
  }
}, false);
// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.
self.port.on("show", function onShow() {
  textArea.focus();
});

self.port.on("hideDev", function onHideDev() {
    document.getElementById("live").style.display = "none"
    document.getElementById("dev").style.display = ""
});
self.port.on("hideLive", function onHideLive() {
    document.getElementById("dev").style.display = "none"
    document.getElementById("live").style.display = ""
});
