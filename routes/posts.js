const router = require('express').Router();
const verifyToken  = require('../verifyToken');
const User = require('../model/User');

router.get('/' ,verifyToken,async (req,res)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({posts:{
        title : "Harry Potter",
        body : "Some content that you shouldn't access unless you are logged in"
    },
    userInfo : user
});
})

module.exports = router;