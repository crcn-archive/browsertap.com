var sift = require("sift"),
outcome  = require("outcome")

exports.require = ["express.server", "express.middleware", "views.application"]
exports.load = function (server, middleware, app) {


  server.get("/", middleware.renderView("main", {
    main: "home"
  }))

  server.get("/about", middleware.renderView("main", {
    main: "about"
  }))

  server.get("/love", middleware.renderView("main", {
    main: "love"
  }))

  server.get("/careers", middleware.renderView("main", {
    main: "careers"
  }))

  server.get("/resources", middleware.renderView("main", {
    main: "resources"
  }))

  server.get("/stories", middleware.renderView("main", {
    main: "stories",
    stories: "all"
  }))

  server.param("post", function (req, res, next, _id) {
    app.mediator.execute("getBlogPost", { _id: _id }, outcome.e(next).s(function () {
      req.params.post = post
      next()
    }));
  });


  server.get("/stories/:post", middleware.renderView("main", {
    main: "stories",
    stories: "post"
  }))
}


