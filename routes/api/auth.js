// API routes
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res)=> {
    const {email, password} = req.body;

    // Simple validation
    if(!email || !password){
        return res.status(400).json({msg: "Please enter all fields"})
    }

    // Check for existing user
    User.findOne({email: email})
    .then(user => {
        //if user already exists in db, then error.
        if(!user){
            return res.status(400).json({msg: "User Does Not Exist!"});
        }
        // Validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials!"});

            // Correct user send the token 
            jwt.sign(
                //payload
                {id: user.id},
                process.env.jwtSecret,
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

        })
        
    })
});

// the route below sends back the user info when provided with the jwt in req header
// @route   GET api/auth/user
// @desc    Get user data
// @access  Private 
router.get('/user', auth, (req,res)=> {
    User.findById(req.user.id) //req.user is coming from auth middleware
    .select("-password") //not sending the password to response
    .then(user => res.json(user));
})

module.exports = router;