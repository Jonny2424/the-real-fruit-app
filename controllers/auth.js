//Sign up and Login goes here
const User = require('../models').User;

// BCRYPT 
const bcrypt = require('bcryptjs');

// used for JWT
require('dotenv').config()
const jwt = require('jsonwebtoken');

// shows signup page
const renderSignup = (req, res) => {
    User.findByPk(req.params.index)
        .then(user => {
            res.render('users/signUpPage.ejs', {
                user: user
            });
        })
}
// shows login page
const renderLogin = (req, res) => {
    res.render('users/loginPage.ejs');
}

const createUser = (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.send('err');
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
            if (err) {
                return res.send('err');
            }
            req.body.password = hashedPwd;

            User.create(req.body)
                .then(newUser => {
                    // Assinging payload to token
                    const token = jwt.sign(
                        {
                            id: newUser.id,
                            username: newUser.username
                        },
                        // Secret key to encode token
                        process.env.JWT_SECRET,
                        // option to at time
                        {
                            expiresIn: '30 days'
                        }
                    );
                    console.log(token);
                    res.cookie('jwt', token);
                    //once added to cookie, direct user to profile page
                    res.redirect(`/users/profile/${newUser.id}`);
                })

        })
    })
}

const checkUser = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(foundUser => {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                    if (match) {
                        const token = jwt.sign(
                            {
                                username: foundUser.username,
                                id: foundUser.id
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "30 days"
                            },
                        );
                        res.cookie('jwt', token)
                        res.redirect(`/users/profile`);
                    } else {
                        res.send('Incorrect Password')
                    }
                });
            }

        })
}

module.exports = {

    renderSignup,
    renderLogin,
    createUser,
    checkUser
}