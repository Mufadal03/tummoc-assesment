const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OauthController = express.Router();
require('dotenv').config();
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://tummoc-assesment.vercel.app/auth/google/callback',
    },

    (accessToken, refreshToken, profile, done) => {
        const user = {
            password: profile.id,
            username: profile.displayName,
            email : profile.emails[0].value
        };

        done(null, user);
    }
)
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

OauthController.get('/', passport.authenticate('google', { scope: ['email','profile'] })
);

OauthController.get('/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        let user = req.user
        console.log('User authenticated:', user);
        res.cookie('user', user, {
            httpOnly: false,
            expires: new Date(Date.now() + 2692000000),
            origin: 'https://tummoc-assingnment.netlify.app',
            sameSite: 'none',
            secure: true
        })
        res.redirect('https://tummoc-assingnment.netlify.app/'); 
        // res.send("ok google authenticated")
    }
);

module.exports = OauthController; 