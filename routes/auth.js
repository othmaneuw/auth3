const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcrypt');
//const Joi = require('joi');
const jwt = require("jsonwebtoken");

const router = express.Router();

// const schema = {
//     name : Joi.string().min(6).required(),
//     email : Joi.string().min(6).required().email(),
//     password : Joi.string().min(6).required()
// }

router.post('/register', async (req,res)=>{
    // const validation = Joi.validate(req.body,schema);
    // res.send(validation);
    const emailExists = await User.findOne({email : req.body.email});
    if(emailExists) return res.status(400).send('email already exists');
    // HASH PASSWORD
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    try{
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        });
        let savedUser = await user.save();
        res.status(201).send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
    // res.send('');
})

router.post('/login',async (req,res)=>{
     //Check the email in the database
     const user = await User.findOne({email : req.body.email});
     if(!user) return res.status(400).send('Email not found in the database');
     // Compare passwords
     const auth = await bcrypt.compare(req.body.password,user.password);
     if(!auth) return res.status(400).send('Invalid Password');

     //create token
     const token = jwt.sign({id : user._id},process.env.SECRET_TOKEN);
     res.header('auth-token',token);
     res.status(200).send("Logged in");
})

module.exports = router;