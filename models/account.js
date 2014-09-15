var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var registro = new Schema({
  username: String,
  firstName:String,
  email:String
});

Account = module.exports = registro;