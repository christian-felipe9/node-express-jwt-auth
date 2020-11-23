const User = require('../models/User');

module.exports.signup_get = (req, res) => {
	res.render('signup');
};

module.exports.login_get = (req, res) => {
	res.render('login');
};

module.exports.signup_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({ email, password });
		res.status(201).json(user);
	} catch (ex) {
		console.log(ex);
		res.status(400).json(ex);
	}

	res.send('new signup');
};

module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;
	res.send('user login');
};
