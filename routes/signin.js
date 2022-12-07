const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
//   console.log(req, res);
  console.log(isAuth);
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureMessage: true, 
    failureFlash: true,
  })
  , (err, req) => {
    console.log(err, req);
  }
);

module.exports = router;