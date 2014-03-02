var browsertap = require("../../../server/entry"),
async          = require("async"),
fs             = require("fs");

browsertap({
  env     : "development",
  type    : "app",
  fibers  : true
}, function (err, exports) {
  if (err) return;
  var app = exports["api.application"],
  lastEmailSent;

  app.emailer = { 
    send: function(body, next) {  
      lastEmailSent = body;
      next();
    } 
  }

  var users = app.models.createModel("users");

  var u1 = users.signupSync({ email: "u1@browsertap.com", password: "password" }),
  u2     = users.signupSync({ email: "u2@browsertap.com", password: "password" });

  users.sendResetPasswordEmailSync({ email: u2.get("email") });
  u2.set("resetPasswordCode", lastEmailSent.body.match(/resetPassword\/([^\"]+)/)[1]);


  console.log("done generating fixtures");

  var fixtures = {
    users: {
      u1             : u1.toJSON(),
      forgotPassword : u2.toJSON(),
      notSignedUp    : {
        email: "u3@browsertap.com",
        password: "password"
      }
    }
  }

  console.log("done building fixtures, writing");
  var str = JSON.stringify(fixtures, null, 2);
  console.log(str);
  fs.writeFileSync(__dirname + "/../../../test/helpers/fixtures.json", str);

  process.exit();
}); 