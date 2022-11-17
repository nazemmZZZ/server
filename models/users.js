const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});
userSchema.pre('save',  function(next)   {
  console.warn("hi")
  const user = this
  console.log(this)
  bcrypt.genSalt(10, function(err, salt)  {
    bcrypt.hash(user.password, salt, function(err, hash)  {
      console.log("ok    nm ");
      console.log(salt,)
      console.log(hash)
      if(err) {
        return next(err);
      }
      user.password = hash
      next()
    })
  })
})
userSchema.methods.comparePassword = function (inputPassword, callback) {
  console.log(inputPassword)
  bcrypt.compare(inputPassword, this.password).then((match) => {
    console.log(match)
    callback(null, match)
  }).catch(err => {
    return callback(err)
  })
}
const modelClass = mongoose.model("users", userSchema)
module.exports= modelClass;