const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.signUp = (req, res) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            console.log(user);
            if (user.length > 0) {
                res.status(409).json({
                    message: "Email already used!"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);

                        res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(() => {
                                res.status(200).json({
                                    message: 'User created!!'
                                })
                            }).catch(err => {
                                res.status(500).json(err)
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

exports.login = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user < 1) {
                res.status(401).json({
                    message: 'AUTH FAILED!'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json('Auth error')
                }
                if (result) {
                    const token = jwt.sign({
                            email: user.email,
                            user_id: user._id
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        })
                    console.log(result);
                    res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                } else {
                    console.log(result);
                    res.status(500).json('Passowrd do not match')
                }
            })
        })
        .catch(err => res.status(500).json(err))
}

exports.delUser = (req, res) => {
    User.remove({
            _id: req.params.user_id
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json('User successfully deleted!')
        })
        .catch(err => res.status(500).json(err))
}