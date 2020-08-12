  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.pre("save", function(next) {
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt).then(hashedPassword => {
        user.password = hashedPassword;
        next();
      });
    });
})

module.exports = User = mongoose.model("user", UserSchema);