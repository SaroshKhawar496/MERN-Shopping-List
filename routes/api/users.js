// API routes
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res)=> {
    const {name, email, password} = req.body;

    // Simple validation
    if(!name || !email || !password){
        return res.status(400).json({msg: "Please enter all fields"})
    }

    // Check for existing user
    User.findOne({email: email})
    .then(user => {
        //if user already exists in db, then error.
        if(user){
            return res.status(400).json({msg: "User already exists!"});
        }
        const newUser = new User({
            name : name,
            email: email,
            password: password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user=>{
                    jwt.sign(
                        //payload
                        {id: user.id},
                        config.get("jwtSecret"),
                        {expiresIn: 3600}, //3600s = 1 hour
                        (err, token)=> {
                            if(err) throw err;
                            // sending token with response as well
                            res.json({
                                token: token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });

                        }
                    )

                });
            })
        })

        
    })
});


module.exports = router;