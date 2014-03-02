var frontDir = __dirname + "/../../../../server/packages/app/front/files",
publicDir    = __dirname + "/../../../../server/packages/common/common.public/files";

var helpers      = require("../../../helpers"),
jsdom            = require("jsdom"),
nofactor         = require("nofactor"),
platform         = require("platform"),
browsertap       = require("../../../../server/entry"),
FrontApplication = require(frontDir + "/js/app");

before(function (next) {
  helpers.flushDb(next);
});

after(function (next) {
  helpers.flushDb(next);
})


before(function (next) {
  browsertap({
    env    : "testing",
    type   : "app",
    fibers : true
  }, function (err, exports) {
    global.apiApp   = exports["api.application"];
    apiApp.emailer = {
      send: function (options, next) {
        next();
      }
    }
    next();
  })
});

before(function (next) {
  jsdom.env("<html><head></head><body></body></html>", [ publicDir + "/vendor/js/jquery-1.11.0.min.js"], function(err, window) {

    console.log("initializing front-end application");

    // set the document to global so that nofactor has access to it
    global.document = window.document;

    // make sure this is accessible in the application
    global.$ = window.$;

    var app = global.frontApp = new FrontApplication({ 
      nodeFactory: nofactor.dom, 
      fake: true, platform: platform 
    });

    app.use(require("./decorators"));

    app.initialize( window.$(window.document.body) );

    next();
  });
});

it("function 9", function () {})