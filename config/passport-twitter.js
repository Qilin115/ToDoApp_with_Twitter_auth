const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const cookieSession = require("cookie-session");
const expressSession = require('express-session');
const User = require("../models/user");

//Twitter Appsにて取得したConsumer Key (API Key)とConsumer Secret (API Secret)を記述
const TWITTER_CONSUMER_KEY = "";
const TWITTER_CONSUMER_SECRET = "";
const CALLBACK_URL = "http://127.0.0.1:3000/oauth/callback";
module.exports = function (app){

    app.use(expressSession({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie : {
            maxAge: 24 * 60 * 60 * 1000
        }
    }));
    
    //Expressでpassportが使えるようにする
    app.use(passport.session());

    app.use(passport.initialize());

    passport.serializeUser(function (user, done) {
        console.log("serial");
        console.log("serial");
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            knex("users")
            .where({
            name: Number(id),
            })
            .select("*")
            .then(async function (results) {
                if (results.length !== 0) {
                    const targetId = Number(results[0].id);
                    console.log("targetId");
                    console.log(targetId);
                    const user = await User.findById(targetId);
                    done(null, user);
                } else {
                    throw new Error("User not found");
                }
            });     
        } catch (error) {
            done(error, null);
        }
    });
    
    // passport-twitterの初期化
    passport.use(new TwitterStrategy({
            consumerKey: TWITTER_CONSUMER_KEY,//TwitterのconsumerKey
            consumerSecret: TWITTER_CONSUMER_SECRET,//TwitterのconsumerSecret
            callbackURL: CALLBACK_URL//認証成功時の戻り先URL
        },
        function(token, tokenSecret, profile, done) {
            // 認証が完了したtwitterIdを検証する
            // 例えばtwitteridがDBの中に存在するかということを確認する
            // 検証結果によってdoneの書き方を以下のように指定する
            //     検証成功 : return done(null,profile);
            //     検証失敗 : return done(null,false);
            //     例外発生 : return done(null);

            // console.log(profile);

            return done(null,profile);
        }
    ));
}

