var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var registro = new Schema({
  username: String,
  firstName:String,
  email:String
});

registro.plugin(passportLocalMongoose);
module.exports = mongoose.model('registro', registro);