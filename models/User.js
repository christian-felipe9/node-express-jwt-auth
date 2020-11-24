const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please Enter an E-mail'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please Enter a Valid E-mail'],
	},
	password: {
		type: String,
		required: [true, 'Please Enter a Password'],
		minlength: [6, 'Minimum Password Length is 6 Characters'],
	},
});

//fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
	console.log('new user was created & saved', doc);
	next();
});

//fire a function before doc saved to db
userSchema.pre('save', function (next) {
	console.log('user about to be created & saved', this);
	next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
