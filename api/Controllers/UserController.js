const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

exports.login = (req,res) => {
    
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