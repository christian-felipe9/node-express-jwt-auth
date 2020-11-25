const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');

const requireAuth = (req, res, next) => {

    console.log('req -> ', req.url);

    const token = req.cookies.jwt_auth

    //check if json web token exists & is verified
    if(token){
        jwt.verify(token, jwtConfig.SECRET, (err, decodedToken) => {
            if(err){
                console.log('err -> ', err);
                res.redirect('/');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect(`/login?returnUrl=${req.url}`);
    }
}

module.exports = { requireAuth };