const passport = require('passport')
const User = require('../models/users')
const config = require("../config")
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local")
const localOption = { usernameField: "email" }
const localLogin = new LocalStrategy(localOption, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); } 
        if (!user) { return done(null, false) }
        user.comparePassword(password, (err, match) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!match) {return done(null, false);}
            return done(null, user)
        
        })
    })
});
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub, (err, user) => {
        if (err) { done(err, false) }
        if (user) {
            done(null,user)
        } else {
            done(null,false)
        }
    })
})
passport.use(jwtLogin)
passport.use(localLogin)