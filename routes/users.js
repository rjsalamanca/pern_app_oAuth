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
            allUsers: getUsers.rows,
            is_logged_in:req.session.is_logged_in
        },
        partials: {
            partial: 'partial-users'
        }
    });
});

router.get('/login', (req,res) =>{
    res.render('template', {
        locals:{
            title: 'Login Page',
            is_logged_in:req.session.is_logged_in
        },
        partials: {
            partial: 'partial-login-form'
        }
    });
});

router.get('/signup', (req,res) =>{
    res.render('template', {
        locals:{
            title: 'Sign Up Page',
            is_logged_in:req.session.is_logged_in
        },
        partials: {
            partial: 'partial-signup-form'
        }
    });
});

router.get('/logout', (req,res) =>{
    console.log('logging out');
    req.session.destroy();
    res.redirect('/');
});

router.post('/login', async (req,res) =>{
    const { email, password } = req.body

    const userInstance = new Users(null, null, null, email, password);

    try{
        let response = await userInstance.login();
        req.session.is_logged_in = true;
        req.session.first_name = response.first_name;
        req.session.last_name = response.last_name;
        req.session.user_id = response.id;

        console.log('CORRECT PW!');
        res.redirect('/restaurants');
    }catch(err){
        console.log('WRONG PW!')
        res.redirect('/users/signup');
    }
});

router.post('/signup', async (req,res) =>{
    const { first_name, last_name, email, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    const userInstance = new Users(null, first_name, last_name, email, hash);

    let check = await userInstance.checkIfCreated();

    if(typeof check === 'object'){
        res.redirect('/users/login');
    } else {
        await userInstance.save().then(response =>{
            console.log('response is:', response);
            res.redirect('/');
        }).catch(err=>err)
    }
});

module.exports = router;
