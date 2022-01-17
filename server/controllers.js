const User = require("./modelUser");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwtToken = require("jsonwebtoken");
const {secret} =require("./config");

const generateAccessToken = (id) => {
    return jwtToken.sign(id, secret, {expiresIn: "1h"})
}

class controllers {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message:"Errors during registration", errors: errors.array()});
            }
            const {username, email, password} = req.body;
            const candidate = await User.findOne({username, email});
            if (candidate) {
                return res.status(300).json({message:"Such user already exists"});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await new User({username, email, password: hashPassword}); // без await save неактивен
            await user.save();
            return res.status(201).json({message:"User has been created"});
        } catch (err) {
            console.log(err);
            res.status(400).json({message:`Registration error`});
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message:"Errors during login", errors: errors.array()});
            }
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message:"Such user have been not found"});
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message:"Password has been entered incorrectly"});
            }
            const token = generateAccessToken(user._id);
            return res.json({token});
        } catch (e) {

        }
    }
}

module.exports = new controllers();