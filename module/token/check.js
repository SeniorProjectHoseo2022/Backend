const check = require('jsonwebtoken');
require('dotenv').config();

//토큰 유효성 검사
exports.verifyToken = (req,res,next) =>{
    try {
        req.decryption = check.verify(req.headers.authorization, process.env.key);
        return next();
    }
    catch (error){
        if(error.name === 'TokenExpiredError') {
            return res.json({
                message:'TokenExpiredError'
            });
        }
        if(error.name === 'JsonWebTokenError'){
            return res.json({
                message:'JsonWebTokenError'
            })
        }
        return res.json({
            message: '500'
        });
    }
}
