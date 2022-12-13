const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');

    try{
       const verified = jwt.verify(token,process.env.SECRET_TOKEN);
       req.user = verified; // We can access the token through this req.user
       next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
module.exports = verifyToken;