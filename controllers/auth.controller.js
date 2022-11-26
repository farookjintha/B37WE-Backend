const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
// {
//    name: 'Farook',
//    email: 'farook@gamil.com',
//    password: 'Welcome123' ,
//    mobileNumber: '9999913131',
//    role: 1,
//    bloodGroup: 'O +ve'
// }
exports.register = async (req, res) => {
    try{
        const payload = req.body;
        if(!payload.password){
            return res.status(400).send({message: 'Password is mandatory!'});
        }
        const hashValue = await bcrypt.hash(payload.password, 12); // 12 -> salting rounds
        payload.hashedPassword = hashValue;
        delete payload.password;

        // {
        //    name: 'Farook',
        //    email: 'farook@gamil.com',
        //    hashedPassword: '@#$%@VSFSRGDVSFSFEY%YRGCSC' ,
        //    mobileNumber: '9999913131',
        //    role: 1,
        //    bloodGroup: 'O +ve'
        // }

        const newUser = new Users(payload);

        newUser.save((err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while registering the user.'})
            }
            res.status(201).send({userId: data._id, message: 'User has been registered successfully.'})
        })

    }catch(err){
        res.status(500).send({message: 'Internal Server Error'})
    }
}

exports.signin = async (req, res) => {
    try{
        //check user exists or not
        // check the credentials 
        //throw error appropriately 

        const existingUser = await Users.findOne({email: req.body.email});

        if(existingUser){
            const isValidCredentials = bcrypt.compare(req.body.password, existingUser.hashedPassword); //true or false;

            if(isValidCredentials){
                const token = jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY); //Encryption
                res.cookie('accessToken', token, {expire: new Date() + 86400000 });

                return res.status(200).send({userId: existingUser._id, token: token, message: 'User logged in successfully.'})
            }

            return res.status(400).send({message: 'Invalid credentials.'})
        }

        res.status(400).send({message: 'User doesnt exist.'})

    }catch(err){
        res.status(500).send({message: 'Internal Server Error'})
    }
}

exports.signout = async (req, res) => {
    try{
        await res.clearCookie('accessToken');
        res.status(200).send({message: 'Signed out successfully.'})
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'})
    }
}