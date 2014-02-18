var mojo = require("mojojs"),
bindable = require("bindable");

var features = [
  {
    shape: "6",
    title: "Responsive Testing",
    text: "Now you can test any responsive site, on any browser without leaving your browser of choice, simply by resizing your window."
  },
  {
    shape: "5",
    title: "Seamless UI",
    text: "With Browsertap, you'll forget you're inside of an emulator. Just use your browser as you normally would."
  },
  {
    shape: "4",
    title: "1-Click Testing",
    text: "Jump straight into testing with one click from our browser extension or bookmarklet. No need to visit browsertap.com"
  },
  {
    shape: "1",
    title: "Parallel Testing",
    text: "Test multiple browser at once, with a new window or tab per test, allowing you to compare rendering engines."
  },
  {
    shape: "8",
    title: "Local Testing",
    text: "Run a small application that allows Browsertap to connect to your computer, forwarding localhost and file:// for testing."
  },
  {
    shape: "9",
    title: "Developer Tools",
    text: "Browsertap supports many developer tools and extensions for each browser, letting you see exactly what's going on with your code."
  }
].map(function (feature) {
  return new bindable.Object(feature);
});

var afeatures = {

  "Test across multiple browsers (30+)": true,
  "Browser Developer Tools": true,
  "Automated Layout Testing": false,
  "Automated Interactive Testing": false,

  "No Installation Required": true,
  "Browser extensions & bookmarklet": true,
  "Localhost Support": true,
  "Android Testing": false,

  "1-Click Testing": true,
  "History Support (back & forward)": false,
  "iPhone Testing": false,

  "Clipboard Support (copy & paste)": true,
  "Real IE browsers (not IETester)": false,
  "Mac Testing (of Mac browsers)": false,

  "Drag & drop file support": false,
  "Keyboard Shortcuts": true,
  "PC Testing (of PC browsers)": true,

  "Sceenshot Testing": false,
  "Responsive Testing": true,
  "Linux Testing (of Linux browsers)": false,
  
  "Parallel Testing": true,
  "Audio Support": false,
  "Natural Scrolling": false,
  "Emulator API": false,
  "Live Browser Reloads": false,
  "Screensharing & Team Collaboration": false,
  "Web Camera Support": false
}, allFeatures = [];


for (text in afeatures) {
  allFeatures.push(new bindable.Object({ text: text, implemented: afeatures[text] }));
}


module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  sections: {
    features: {
      type: "list",
      source: new bindable.Collection(features),
      modelViewClass: require("./feature")
    },
    additionalFeatures: {
      type: "list",
      source: new bindable.Collection(allFeatures),
      modelViewClass: require("./additionalFeature")
    }
  }
});