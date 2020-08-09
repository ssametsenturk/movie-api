const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const Kullanicii = require('../models/Kullanicii');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const kullanicii = new Kullanicii({
            username,
            password: hash
        });

        const promise = kullanicii.save();
        promise.then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err);
        })
    });
});

router.post('/authenticate', (req, res) => {
    //const { username , password } = req.body;
    const username = req.body.username;
    const password = req.body.password;

    Kullanicii.findOne({
        username
    }, (err, kullanicii) => {
        if (err)
            throw err;

        if(!kullanicii){
            res.json({
                status: false,
                message: 'Authentication failed, kullaniciii not found.'
            });
        }else{
            bcrypt.compare(password, kullanicii.password).then((result) => {
                 if (!result){
                    res.json({
                        status: false,
                        message: 'Authentication failed, wrong password.'
                    });
                }else{

                    const payload = {
                        username
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 720 // 12 saat
                    });

                    res.json({
                        status: true,
                        token
                    })
                 }
            });
        }
    });

});

/*
router.delete('/:kullaniciii_id', (req, res, next) => {
    const promise = kullaniciii.findByIdAndRemove(req.params.kullaniciii_id);

    promise.then((kullaniciii) => {
        if (!kullaniciii){
            next({ message: 'The user was not found.', code:99 });
        }
        res.json(kullaniciii);
    }).catch((err) => {
        res.json(err);
    });
});
*/

module.exports = router;