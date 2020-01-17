const authController = require("../controllers/auth.controller.js");
const passport = require('../config/passport/passport');

module.exports = function(app) {
  app.post("/signin", passport.authenticate("local"), authController.signin);

  app.post("/signup", authController.signup);

  app.get("/logout", authController.logout);

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/userinfo.profile"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/index-google" }),
    authController.googleCallback
  );
};
