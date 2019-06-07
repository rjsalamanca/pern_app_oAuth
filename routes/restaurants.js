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

router.get('/:restaurantID', async function(req, res, next) {
    const {restaurantID} = req.params;
    const resto = new restaurants(restaurantID, null, null, null, null, null);
    const singleRestaurant = await resto.getOneRestaurant();
    const singleRestaurantReviews = await resto.getOneRestaurantReviews();

    res.render('template', { 
        locals:{
            title: 'Restaurant Reviews',
            restaurant: singleRestaurant,
            restaurantReviews: singleRestaurantReviews,
            is_logged_in: req.session.is_logged_in
        },
        partials:{
            partial: 'partial-single-restaurant-reviews'
        }
    });
});

router.post('/:restaurantID', async function(req, res) {
// WORK ON THIS

    const { review, stars, id} = req.body;
    const resto = new restaurants(id, null, null, null, null, null);

    await resto.addReview(stars, review, req.session.user_id);

    const singleRestaurant = await resto.getOneRestaurant();
    const singleRestaurantReviews = await resto.getOneRestaurantReviews();

    res.render('template', { 
        locals:{
            title: 'Restaurant Reviews',
            restaurant: singleRestaurant,
            restaurantReviews: singleRestaurantReviews,
            is_logged_in: req.session.is_logged_in
        },
        partials:{
            partial: 'partial-single-restaurant-reviews'
        }
    });
});

module.exports = router;