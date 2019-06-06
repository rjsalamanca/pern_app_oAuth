const express = require('express'),
    router = express.Router(),
    restaurants = require('../models/restaurants');

/* GET home page. */
router.get('/', async function (req, res, next) {
    const getRestaurants = await restaurants.getAll();

    if(req.session.is_logged_in === true){
        res.render('template', {
            locals: {
                title: 'Home Page',
                allRestaurants: getRestaurants,
                is_logged_in:req.session.is_logged_in
            },
            partials: {
                partial: 'partial-restaurants'
            }
        });
    } else {
        res.redirect('/')
    }
});

module.exports = router;