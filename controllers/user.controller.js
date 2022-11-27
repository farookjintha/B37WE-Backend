const Users = require('../models/users.model');

exports.getUserByID = (req, res, next, id) => {
    try{
        Users.findOne({_id: id},(err, data) => {
            if(err){
                return res.status(400).send({message: 'User doesnt exist'})
            }
            req.profile = data;
            next();
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
}

exports.updateUser = (req, res) => {
    try{
        Users.findByIdAndUpdate({_id: req.params.userID}, {$set: req.body},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while updating user.'})
            }
            res.status(201).send({userID: req.params.userID, message: "User has been updated successfully."})
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
}

exports.deleteUser = (req, res) => {
    try{
        Users.deleteOne({_id: req.params.userID},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while deleting user.'})
            }
            res.status(201).send({ message: "User has been deleted successfully."})
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
}