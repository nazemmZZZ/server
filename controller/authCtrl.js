const User = require("../models/users");
const config = require("../config");
const jwt = require('jwt-simple')
function tockenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat:timestamp,
    },config.secret)
}
exports.sinUp = (req, res, next) => {
  const email = req.body.email;
    const password = req.body.password
    if (!email || !password) {
        return res.status(403).send("Email and password cannot be empty")
    }
    console.log("ok");  
   User.findOne({ email: email }, function (err, existingUser) {
     if (err) {
       return next(err);
     }

     // If a user with email does exist, return an error
     if (existingUser) {
       return res.status(422).send({ error: "Email is in use" });
     }

     // If a user with email does NOT exist, create and save user record
     const user = new User({
       email: email,
       password: password,
     });

       user.save().then((err => {
         console.log(err)
     }))

       // Repond to request indicating the user was created
       res.json({tocken:tockenForUser(user)});
   
   });   
  
};
exports.signin = (req, res, next) => { 
     res.json({ tocken: tockenForUser(req.user) });
}