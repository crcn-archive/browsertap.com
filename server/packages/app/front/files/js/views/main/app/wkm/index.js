var mojo = require("mojojs"),
Url      = require("url"),
_        = require("underscore"),
wkmEvents = require("./events");


var tpl = _.template(
  '<div class="screen">' +
    '<object type="application/x-shockwave-flash" width="100%" height="100%">' +
      '<param name="movie" value="<%-src %>" />' +
      '<param name="quality" value="high" />' +
      '<param name="scale" value="noscale" />' +
      '<param name="align" value="tl" />' +
      '<param name="debug" value="true" />' +
      '<param name="host" value="host" />' +
      '<param name="channel" value="<%-channel %>" />' +
      '<param name="flashVars" value="host=<%-host %>" />' +
      '<param name="wmode" value="gpu" />' +
      '<embed src="<%-src->" host="host" quality="high" flashVars="host=abba" type="application/x-shockwave-flash" allowscriptaccess="always" />' +
    '</object>' +
  '</div>'
);

module.exports = mojo.View.extend({
  src   : "/as3/wkm/bin/DesktopPlayer.swf?" + Date.now(),
  host  : "rtmp://win2008rc2.local:1935/liv",
  channel: "",
  bindings: {
    "models.mainScreen": "screen",
    "models.mainScreen.stream.url": function (url) {

      if (!url) return;

      var urlParts  = Url.parse(url);
      var pathParts = urlParts.pathname.split("/"),
      channel = pathParts.pop();
      var host = urlParts.protocol + "//" + urlParts.hostname + pathParts.join("/");

      this.set("host", host);
      this.set("channel", channel);
    }
  },
  initialize: function () {
    mojo.View.prototype.initialize.call(this);
    this.on("render", this._renderSWF = _.bind(this._renderSWF, this));
    this.on("change", this._renderSWF);

    var $win = $(window), self = this;
    $win.resize(_.debounce(function (event) {
      self._onResize({ width: $win.prop("innerWidth"), height: $win.prop("innerHeight") });
    }, 100));


    $win.mousedown(function(e) {
      // if(!$(e.target).closest('#desktop-player').length) return;
      self._mouseEvent(e.button == 0 ? wkmEvents.mouse.MOUSEEVENTF_LEFTDOWN : wkmEvents.mouse.MOUSEEVENTF_RIGHTDOWN);
      if(e.button === 0) return; //only block right click
      e.preventDefault();
      e.stopPropagation();
    });

    $win.mouseup(function(e) {
      self._mouseEvent(e.button == 0 ? wkmEvents.mouse.MOUSEEVENTF_LEFTUP : wkmEvents.mouse.MOUSEEVENTF_RIGHTUP);
    });


    /*$win.mousemove(_.throttle(function(event) {

      var coords = { x: event.clientX, y: event.clientY };

      self._mouseEvent(wkmEvents.mouse.MOUSEEVENTF_ABSOLUTE | wkmEvents.mouse.MOUSEEVENTF_MOVE, coords);
    }, 20));*/

    window.desktopEvents = {
      mouseMove  : _.bind(this._onMouseMove, this),
      keyDown    : _.bind(this._onKeyDown, this),
      keyUp      : _.bind(this._onKeyUp, this),
      mouseWheel : _.bind(this._onMouseWheel, this),
      resize     : _.bind(this._onResize, this)
    }
  },
  _renderSWF: function () {
    if (!this.section) return;

    this.section.hide();

    var div = $("<div class='screen'><div id='tmpSwf'></div></div>")[0], self = this;

    document.body.appendChild(div);

    swfobject.embedSWF(this.get("src"),
      "tmpSwf",
      "100%",
      "100%",
      "9.0.0",
      "/swf/expressInstall.swf",
      {
        bgColor: "#FFFFFF",
        channel: this.get("channel"),
        allowscriptaccess: "always",
        host: this.get("host")
      }, {
        allowscriptaccess: "always",
      }, {}, function () {
        self.section.replaceChildNodes(div);
      });
  },
  "_onMouseMove": function (coords) {

    // var sx = this.screen.get("width")
    var sx = this.$(".screen").width() / 2 - this.screen.get("width") / 2;
    var sy = this.$(".screen").height() / 2 - this.screen.get("height") / 2;

    var rx = coords.x - sx;
    var ry = coords.y - sy;

    this._mouseEvent(wkmEvents.mouse.MOUSEEVENTF_ABSOLUTE | wkmEvents.mouse.MOUSEEVENTF_MOVE, {
      x: rx,
      y: ry
    });
  },
  "_onMouseWheel": function (data) {
    // console.log("wheel")
    //this._keyboardEvent(data.keyCode, 0, 0)
  },
  "_onKeyDown": function (data) {
    console.log(data, this.screen);
    if(this.screen) this.screen.keybdEvent(data);
  },
  "_onKeyUp": function (coords) {
    //if(this.screen) this.screen.keybdEvent(data.keyCode, 0, wkmEvents.keyboard.KEYEVENTF_KEYUP)
  },
  "_onResize": function (data) {
    this.screen.resize(data.width, data.height);
  },
  "_mouseEvent": function(code, coords, data) {


    if(coords) {
      this._prevCoords = coords;
    } else {
      coords = this._prevCoords;
    }

    if (!this.screen) return;

    this.screen.mouseEvent(code, coords, data);
  },
});
