const express = require('express'),
    router = express.Router(),
    Users = require('../models/users'),
    bcrypt = require('bcryptjs');

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

router.post('/login', async (req,res) =>{
    const { email, password } = req.body

    const userInstance = new Users(null, null, null, email, password);
    try{
        await userInstance.login();
        console.log('CORRECT PW!')
        res.redirect('/');
    }catch(err){
        console.log('WRONG PW!')
        res.redirect('/users/signup');
    }
});

router.post('/signup', (req,res) =>{
    const { first_name, last_name, email, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    const userInstance = new Users(null, first_name, last_name, email, hash);

    userInstance.save().then(response =>{
        console.log('response is:', response);
        res.sendStatus(200);
    })
});

module.exports = router;
