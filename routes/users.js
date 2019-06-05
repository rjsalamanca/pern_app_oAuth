const express = require('express'),
    router = express.Router(),
    users = require('../models/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
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

module.exports = router;
