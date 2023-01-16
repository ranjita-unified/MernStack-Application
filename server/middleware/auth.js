const jwt = require('jsonwebtoken')
const User = require('../model/user')
const process = require('process');

const auth = async (req, res, next) => {
    const authToken = req.headers.authorization;
    const refreshToken = req.headers.refreshtoken;
    
    try {
        jwt.verify(authToken, process.env.ACCESS_SECRET_KEY, function(accessTokenError, decoded) {
            if (accessTokenError) {
                
                jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, function(refreshTokenError, decodedRefreshToken) {
                    if(refreshTokenError) {
                        return res.status(401).send({ error: 'Please authenticate.' });
                    }
                    else {
                        const user = User.findOne({ _id: decodedRefreshToken });
                        const {name,email,role} = user;
                        const newAccessToken =  jwt.sign(user._id, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
                        return res.send({name,email,role,profileImage,newAccessToken,refreshToken});
                    }
                });
            }
            else {
                User.findById(decoded, function (err, user) {
                    if (err){
                        return res.status(401).send({ error: 'Please authenticate.' });
                    }
                    else{
                        req.user = user        
                        next();
                    }
                });
                
            }
        })
    }
    catch(e) {
        return res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth