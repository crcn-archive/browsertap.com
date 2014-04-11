var mojo = require("mojojs"),
Url      = require("url"),
_        = require("underscore"),
wkmEvents = require("./events");


var swfid = 0;

module.exports = mojo.View.extend({
  src   : "/as3/wkm/bin/DesktopPlayer.swf?" + Date.now(),
  paper: require("./index.pc"),
  bindings: {
    "screen.stream.url": function (url) {


      if (!url) return;

      var urlParts  = Url.parse(url);
      var pathParts = urlParts.pathname.split("/"),
      channel = pathParts.pop();
      var host = urlParts.protocol + "//" + urlParts.hostname + pathParts.join("/");

      this.setProperties({
        host: host,
        channel: channel,
        screenId: this.get("screen._id")
      });
    },
    "screen": function (screen) {
      if (!screen) return;
      window["desktopEvents"+screen.get("_id")] = {
        mouseMove  : _.throttle(_.bind(this._onMouseMove, this), 2),
        keyDown    : _.bind(this._onKeyDown, this),
        keyUp      : _.bind(this._onKeyUp, this),
        mouseWheel : _.throttle(_.bind(this._onMouseWheel, this), 1),
        resize     : _.bind(this._onResize, this)
      }
    }
  },
  initialize: function () {
    mojo.View.prototype.initialize.call(this);
    this.on("render", this._renderSWF = _.bind(this._renderSWF, this));
    this.bind("channel, host, screenId", this._renderSWF)

    var $win = $(window), self = this;
    $win.resize(_.debounce(function (event) {
      self._onResize();
    }, 100));

  },
  _renderSWF: function (channel, host, screenId) {

    if (!channel || !host) return;

    if (!this.section) return;

    var sid = "tmp" + (swfid++);

    var div = $("<div><div id='"+sid+"'></div></div>")[0], self = this;

    document.body.appendChild(div);

    swfobject.embedSWF(this.get("src"),
      sid,
      "100%",
      "100%",
      "9.0.0",
      "/swf/expressInstall.swf",
      {
        bgColor: "#FFFFFF",
        channel: this.get("channel"),
        allowscriptaccess: "always",
        host: this.get("host"),
        screenId: screenId
      }, {
        allowscriptaccess: "always",
        wmode: "transparent"
      }, {}, function () {
        self.$(".wkm").html("");
        self.$(".wkm").append(div.childNodes[0]);
        div.parentNode.removeChild(div);
      });
  },
  "onMouseDown": function (e) {
    // if(!$(e.target).closest('#desktop-player').length) return;
    this._mouseEvent(e.button == 0 ? wkmEvents.mouse.MOUSEEVENTF_LEFTDOWN : wkmEvents.mouse.MOUSEEVENTF_RIGHTDOWN);
    if(e.button === 0) return; //only block right click
    e.preventDefault();
    e.stopPropagation();
  },
  onMouseUp: function (e) {
    this._mouseEvent(e.button == 0 ? wkmEvents.mouse.MOUSEEVENTF_LEFTUP : wkmEvents.mouse.MOUSEEVENTF_RIGHTUP);
  },
  "_onMouseMove": function (coords) {


    // var sx = this.screen.get("width")
    var sx = this.$(".wkm").width() / 2 - this.screen.get("width") / 2;
    var sy = this.$(".wkm").height() / 2 - this.screen.get("height") / 2;

    var rx = coords.x - sx;
    var ry = coords.y - sy;

    this._mouseEvent(wkmEvents.mouse.MOUSEEVENTF_ABSOLUTE | wkmEvents.mouse.MOUSEEVENTF_MOVE, {
      x: rx,
      y: ry
    });
  },
  "_onMouseWheel": function (coords) {
		if(this.screen) this._mouseEvent(wkmEvents.mouse.MOUSEEVENTF_WHEEL, coords, coords.delta);
  },
  "_onKeyDown": function (data) {
    if(this.screen) this.screen.keybdEvent(data);
  },
  "_onKeyUp": function (coords) {
    //if(this.screen) this.screen.keybdEvent(data.keyCode, 0, wkmEvents.keyboard.KEYEVENTF_KEYUP)
  },
  "_onResize": function (data) {
    if(!this.screen) return;
    this.screen.resize(this.$(".wkm").width(), this.$(".wkm").height());
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
