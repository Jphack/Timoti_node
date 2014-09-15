var mongoose = require('mongoose'),
 	db = mongoose.createConnection('mongodb://localhost/tomoti');

var Connection = module.exports = db;