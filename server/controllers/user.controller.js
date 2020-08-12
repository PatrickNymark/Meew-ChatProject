const express = require('express');
const router = express.Router()
const userService = require('../services/user.service');

router.get('/', getAllUsers)

function getAllUsers(req, res, next) {
    userService.all()
        .then(users => res.json(users))
        .catch(err => next(err))
}

module.exports = router