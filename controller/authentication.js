const User = require('../model/user');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcryptjs = require('bcryptjs')

//email validation function
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


//register users
const register = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.json({ message: "User already exist with this email." })
        }
        else {
            const encryptpassowrd = await bcryptjs.hash((req.body.password), 10)
            if (!validateEmail(req.body.email)) {
                res.status(400).json({ message: "email is not valid." })
            }
            else {

                const newUser = new User(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        password: encryptpassowrd
                    }
                );
                const saveUsers = await newUser.save();
                res.status(201).json(saveUsers);
            }
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
};



// login user
const Login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.json({ message: "Please enter email and passwrod..." });
        }

        else {
            const user = await User.find({ email: req.body.email })
            if (user && await bcryptjs.compare(req.body.password, user[0].password)) {
                const token = jwt.sign(
                    {
                        _id: user[0]._id,
                        email: user[0].email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE_IN
                    }
                )
                user[0].token = token;
                res.status(200).json(user);
            }
            else {
                res.json({ message: "wrong email or passowrd. please enter valid credentials" })
            }
        }
    }

    catch (err) {
        res.status(400).send(err);
    }
}

// get all users data 
const getUsers = async (req, res) => {
    try {

        if (!User) {
            res.json({ message: "There is no user in database" })
        }
        else {
            var users = await User.find();
            res.json(users)
        }
    }
    catch (err) {
        res.status(404).send(err);
    }
}

//update password


module.exports = { register, Login, getUsers };