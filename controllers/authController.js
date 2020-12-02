const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtConfig, cookieConfig } = require('../config');
//handle errors
const handleErrors = err => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	//duplicate error code
	if (err.code === 11000) {
		errors['email'] = 'That E-mail is Already Registered';
		return errors;
	}

	//validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	//incorrect email
	if (err.message === 'Incorrect E-mail') {
		errors['email'] = 'That E-mail is not Registered';
	}

	//incorrect password
	if (err.message === 'Incorrect Password') {
		errors['password'] = 'That Password is Icorrect';
	}

	return errors;
};

const createToken = id => {
	return jwt.sign({ id }, jwtConfig.SECRET, {
		expiresIn: jwtConfig.MAX_AGE,
	});
};

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

		const token = !!user ? createToken(user._id) : '';

		res.cookie('jwt_auth', token, {
			httpOnly: true,
			maxAge: cookieConfig.MAX_AGE,
		});
		res.status(201).json({ user: user._id });
	} catch (ex) {
		let errors = handleErrors(ex);
		res.status(400).json({ errors });
	}

	res.send('new signup');
};

module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;
	const {
		query: { returnUrl },
	} = req;
	try {
		const user = await User.login(email, password);
		const token = !!user ? createToken(user._id) : '';

		res.cookie('jwt_auth', token, {
			httpOnly: true,
			maxAge: cookieConfig.MAX_AGE,
		});

		!!returnUrl
			? res.status(200).json({ returnUrl })
			: res.status(200).json({ user: user._id });
	} catch (ex) {
		const errors = handleErrors(ex);
		res.status(400).json({ errors });
	}
};

module.exports.logout_get = (req, res) => {
	res.cookie('jwt_auth', '', { maxAge: 1 });
	res.render('home');
};
