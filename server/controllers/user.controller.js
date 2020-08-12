const express = require('express');
const router = express.Router()
const userService = require('../services/user.service');


router.get('/', getUsers)

function getUsers(req, res, next) {
    userService.all()
        .then(user => res.json(user))
        .catch(err => next(err))
}

module.exports = router