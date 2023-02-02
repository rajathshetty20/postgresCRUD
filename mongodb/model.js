const mongoose = require('mongoose');

const url = 'mongodb+srv://rajathshetty20:OFJGrvb09dZtSqEG@cluster0.1jblubr.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url)
.then(()=>{
  console.log('MongoDB connected');
})
.catch((err)=>{
  console.log(`Error: ${err}`);
});

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;