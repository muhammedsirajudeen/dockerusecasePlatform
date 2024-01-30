import mongoose from 'mongoose';
let User;

if (mongoose.models && mongoose.models.User) {
  User = mongoose.models.User;
} else {
  const userSchema=new mongoose.Schema({
      username:String,
      password:String,
  })

  User = mongoose.model('User', userSchema);
}

export default User;