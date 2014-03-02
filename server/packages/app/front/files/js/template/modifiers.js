var pc = require("paperclip");

function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

module.exports = function (app) {

  var modifiers = {
    redirect: function (location) {
      app.router.redirect(location);
    },
    t: function (string, params) {
      return app.i18n.t(string, params);
    },

    // http://stackoverflow.com/questions/948172/password-strength-meter
    passwordStrength: function (password) {

     if (!password) password = "";
     
     var score = scorePassword(String(password));

      var scores = [
        { c: 50, n: "strong"       },
        { c: 30, n: "average"      },
        { c: 0,  n: "weak"         }
      ];

      for (var i = 0, n = scores.length; i < n; i++) {
        var s = scores[i];
        if (score >= s.c) {
          return s.n;
        }
      }
    }
  };

  for (name in modifiers) pc.modifier(name, modifiers[name]);
}