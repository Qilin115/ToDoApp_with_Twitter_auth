const express = require('express');
const router = express.Router();
const passport = require('passport');
const knex = require('../db/knex');

// /oauthにアクセスした時
router.get('/', passport.authenticate('twitter')
, function (err, req, res, next) {
    console.log("oauth");
}
);

// /oauth/callbackにアクセスした時（Twitterログイン後）
router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
    console.log("callback");
    const twitter_id = Number(req.session.passport.user);
    // console.log(req.user);
    req.session.passport.displayName = req.socket.parser.incoming.user.displayName;
    req.session.passport.photo = req.socket.parser.incoming.user.photos[0].value;

    knex("users")
    .where({name: twitter_id})
    .select("*")
    .then(async function (result) {
        if (result.length == 0) {
            knex("users")
            .insert({name: twitter_id, password: null})
            .then(function () {
                res.redirect("/");
            })
            .catch(function (err) {
            console.error(err);
            res.render("/", {
                title: "twitter認証失敗",
                errorMessage: [err.sqlMessage],
                isAuth: isAuth,
                twitterData: []
                });
            });
        } else {
            res.redirect("/");
        }
    })
    .catch(function (err) {
        console.error(err);
        res.render("/", {
        title: "twitter認証失敗",
        errorMessage: [err.sqlMessage],
        isAuth: isAuth,
        });
    });
});

module.exports = router;