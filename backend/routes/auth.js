const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require("../client/config.json");
const jwt = require('jsonwebtoken');
const JWT_SECRET = config.JWT_SECRET;
const fetchUser = require('../middleware/fetchUser');

// using npm package express-validator to check for valid emails and passwords
const { body, validationResult } = require('express-validator');


//Create a User using : POST "/api/auth/".
// post request to create a user

//ROUTE 1: REGISTER POST REQUEST
router.post('/register',
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 8 characters long').isLength({ min: 8 }),
    async (req, res) => {
        let success = false;
        // if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fname, lname, email, password } = req.body;

        // check if an user with the same email already exits
        // if yes -> return err msg else create new user

        try {

            let user = await User.findOne({ email: email });

            if (user) {
                return res.status(400).json({ error: "an user with this email already exits" })
            }

            const salt = await bcrypt.genSalt(10); // generates a salt using bcrpytjs
            const securedPassword = await bcrypt.hash(password, salt); // creating a secured password by hashing using bcrypt js

            //creating new user
            user = await User.create({
                fname: fname,
                lname: lname,
                email: email,
                password: securedPassword
            })

            const payload = {
                user: {
                    id: user.id
                }
            }
            //creating authtoken using jwt
            const authToken = jwt.sign(payload, JWT_SECRET);
            success = true;
            res.json({ success, message: "user created", authToken })


        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ")

        }


    })

// authenticate a user while logging in 
// ROUTE 2: USER LOGIN POST REQUEST
router.post('/login',
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be left blank').exists(),
    async (req, res) => {
        let success = false;
        // if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // check if an user with the same email already exits
        // if yes -> return err msg else create new user

        try {

            let user = await User.findOne({ email: email });

            if (!user) {
                success = false
                return res.status(400).json({ error: "invalid email or password" })
            }



            // compare the entered password and the user password form the database
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ error: "invalid email or password" })
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            //creating authtoken using jwt
            const authToken = jwt.sign(payload, JWT_SECRET);
            success = true;


            res.json({ success, message: "login successfull", authToken })


        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ")

        }


    })

// ROUTE 3: FETCHING USER DETAILS. 
//POST REQUEST.(LOGIN REQUIRED)
router.post('/fetchUser', fetchUser,
    async (req, res) => {

        try {
            const userId = req.user.id;

            const user = await User.findById(userId).select("-password");

            res.json(user);

        } catch (error) {

            console.error(error.message);
            res.status(500).send("internal server error ")

        }


    })

module.exports = router
