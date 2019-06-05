const express = require('express'),
    router = express.Router(),
    users = require('../models/users');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const getUsers = await users.getAll();

    res.render('template', {
        locals: {
            title: 'Users Page',
            allUsers: getUsers.rows
        },
        partials: {
            partial: 'partial-users'
        }
    });
});

router.get('/login', (req,res) =>{
    res.render('template', {
        locals:{
            title: 'Login Page'
        },
        partials: {
            partial: 'partial-login-form'
        }
    });
});

router.get('/signup', (req,res) =>{
    res.render('template', {
        locals:{
            title: 'Sign Up Page'
        },
        partials: {
            partial: 'partial-signup-form'
        }
    });
});

router.post('/login', (req,res) =>{
    console.log(req.body);
    res.sendStatus(200);
});

router.post('/signup', (req,res) =>{
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;
