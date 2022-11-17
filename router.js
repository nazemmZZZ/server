const { sinUp, signin } = require("./controller/authCtrl")
const passportService=require('./service/passport')
const passport = require('passport')

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth=passport.authenticate('jwt',{session:false})
module.exports = function (app) {
    app.get("/",requireAuth, (req,res ,next) => {
        res.send({
            desk:["phone",'lap']
        })
    })
    app.post("/signup", sinUp)
    app.post("/sigin",requireSignin,signin)
}