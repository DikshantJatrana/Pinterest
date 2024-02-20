var express = require("express");
var router = express.Router();
const UserModel = require("../models/user");
const Post = require("../models/posts");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.use(new localStrategy(UserModel.authenticate()));
/* GET home page. */
function IsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/error", (req, res) => {
  res.render("error");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { Username, Fullname, Email, Password } = req.body; // Check if 'Fullname' matches the case in the schema
  const UserData = new UserModel({ Username, Fullname, Email });

  UserModel.register(UserData, Password, (err, user) => {
    // Ensure to pass 'Password' as the second argument
    if (err) {
      console.error(err);
      // Handle registration error appropriately, e.g., redirect to the registration page with an error message
      return res.redirect("/register");
    }

    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

router.get("/profile", IsLoggedIn, (req, res) => {
  res.render("profile");
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/feed", (req, res) => {
  res.render("feed");
});

module.exports = router;
