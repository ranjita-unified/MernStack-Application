const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const fs = require('fs');
const path = require('path')
const express = require('express');
var app = express();

const User = require('../model/user');

const signupUser = async(request,response) => {
    try {
        const user = new User(request.body);
        await user.save();
        return response.status(200).send({message : 'Successfully Registered'})
    } catch (e) {
        response.status(400).send({code:e?.code, message: e?.errmsg})
    }
};

const loginUser = async(req,res) => {
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        
        if(!user) {
            return res.status(401).send({message: 'invalid credentials'})
        }        
        const {name,email,role} = user;
        const profileImage = user?.profileImage;
        const accessToken =  jwt.sign(user._id, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' }); 
        const refreshToken = jwt.sign(user._id, process.env.REFRESH_SECRET_KEY, { expiresIn: '30m' }); 

        await user.save();
        return res.send({name,email,role,profileImage,accessToken,refreshToken});
    } catch (e) {
        return res.status(400).send()
    }
};

const logoutUser = async (req, res) => {
    try {
        res.send({msg: 'successfully logged out'})
    } catch (e) {
        res.status(500).send()
    }
}

const updateProfileImage = (req, res) => {
    User.findByIdAndUpdate(req.user._id,{ profileImage: req.file.filename }, function(err, result){
        if(err) {
            return res.status(400).send({ error: 'not uploaded' })
        }
        else {
            const uploadImageFolder = path.join(__dirname, '../uploads/'+result.profileImage);
            if (fs.existsSync(uploadImageFolder)) {
                fs.unlinkSync(uploadImageFolder); //delete old profile image
            }
            User.findById(req.user._id, function (err, updatedRecord) {
                if (err){
                    return res.status(400).send({ error: 'not uploaded' })
                }
                else{
                    return res.status(200).send({userImage: updatedRecord.profileImage,name:updatedRecord.name,email:updatedRecord.email});
                }
            });
        }
    });
}

const updateUserDetails = async(req,res) => {
    let userData;
    if(req.body.password !== "") {
        password = await bcrypt.hash(req.body.password, 8);
        userData = { name: req.body.name, email: req.body.email, password: password }
    }
    else {
        userData = { name: req.body.name, email: req.body.email }
    }
    
    User.findByIdAndUpdate(req.user._id,userData, function(err, result){
        if(err) {
            return res.status(400).send({ error: 'not uploaded' })
        }
        else {
            User.findById(req.user._id, function (err, updatedRecord) {
                if (err){
                    return res.status(400).send({ error: 'not uploaded' })
                }
                else{
                    return res.status(200).send({userImage: updatedRecord.profileImage,name:updatedRecord.name,email:updatedRecord.email});
                }
            });
        }
    })
   
}

const getAllEditors = async (req, res) => {    
    User.findById(req.user._id, function (err, user) {
        if(err) {
            return res.status(401).send({ error: 'Access Denied' })
        }
        else {
            if(user.role !== 'admin') {
                return res.status(400).send({ error: 'You dont have permission to view the details.' });
            }
            else {
                var userMap = {};
                    var userArr = [];
                try {
                    User.find({role:"editor"}, function(err, users) {
                        users.forEach(function(user) {
                            userMap['id'] = user._id;
                            userMap['name'] = user.name;
                            userMap['email'] = user.email;
                            userMap['profileImage'] = user.profileImage?user.profileImage:"";
                            
                            userArr.push(userMap);
                            userMap = {};
                        });
                        
                        if(userArr.length === 0 ) {
                            return res.status(200).send([]);
                        }
                        return res.status(200).send(userArr); 
                      });
                } catch (e) {
                    return res.status(500).send();
                }
            }
        }
    })    
}

const verifyToken = (req,res) => {
    return res.send(); 
}

module.exports = { getAllEditors,loginUser,logoutUser,signupUser,updateProfileImage,updateUserDetails,verifyToken }