const express = require('express'),
    router = express.Router(),
    restaurants = require('../models/restaurants');

/* GET home page. */
router.get('/', async function (req, res, next) {
    const getRestaurants = await restaurants.getAll();

    res.render('template', {
        locals: {
            title: 'Home Page',
            allRestaurants: getRestaurants
        },
        partials: {
            partial: 'partial-restaurants'
        }
    });
});

module.exports = router;