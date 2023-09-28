
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "my name is hansadhwajabiswal";



//get
router.get("/", async (req, res) => {

    try {
        const allData = await User.find();

        res.status(200).json(allData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


//create
router.post("/create",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        try {
            const { name, email, password, location } = req.body;
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                name: name,
                location: location,
                email: email,
                password: secPassword
            });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }


    });

//login
router.post("/login",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        try {
            const { email, password } = req.body;
            const newData = await User.findOne({ email });
            const data = {
                user: {
                    id: newData.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret);



            const pwdSecure = await bcrypt.compare(password, newData.password);
            if (!newData) {
                res.status(400).json({ error: "Invalid credentials" });
            }
            else if (!pwdSecure) {
                res.status(400).json({ error: "Invalid credentials" });
            }
            else {
                res.status(201).json({ authToken: authToken });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }


    });

module.exports = router;