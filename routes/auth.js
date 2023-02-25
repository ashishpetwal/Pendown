const express = require('express');
// const { model } = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetuser');
const {JWT_SECRET} = require('../config/keys');


// Route 1: To Create a User

router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "The Password should have at least 6 Characters").isLength({ min: 6 }),
], async (req, res) => {
    // returns bad request, if there is an error! 
    let success = false;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        // Check if user already exists!

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User already registered!" })
        }

        // generating hashed password with salt

        const salt = await bcrypt.genSalt(10);
        const secPassKey = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassKey,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const secToken = jwt.sign(data, JWT_SECRET);
        console.log(secToken);
        success = true;
        res.json({success, secToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occured");
    }
})

// Route 2: Authenticate Login Request of the User

router.post('/login', [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
], async (req, res) => {
    let success = false;
    // return errors on Invalid Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body; //extracts email and password from request
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Enter Valid Credentials" });
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return res.status(400).json({success, error: "Enter Valid Credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const secToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, secToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3: To fetch the data of the user

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;