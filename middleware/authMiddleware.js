const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const User = require('../models/User');

//check if user is logged in
const requireAuth = (req, res, next) => {
	console.log('req -> ', req.url);

	const token = req.cookies.jwt_auth;

	console.log('token -> ', token);

	//check if json web token exists & is verified
	if (token) {
		jwt.verify(token, jwtConfig.SECRET, (err, decodedToken) => {
			if (err) {
				console.log('err -> ', err);
				res.redirect(`login?returnUrl=${req.url}`);
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect(`/login?returnUrl=${req.url}`);
	}
};

const checkUser = (req, res, next) => {
	const token = req.cookies.jwt_auth;

	if (token) {
		jwt.verify(token, jwtConfig.SECRET, async (err, decodedToken) => {
			if (err) {
				console.log('err -> ', err);
				res.locals.user = null;
				next();
			} else {
				console.log(decodedToken);
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { requireAuth, checkUser };
