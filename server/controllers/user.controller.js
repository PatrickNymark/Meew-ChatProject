const express = require('express');
const router = express.Router()
const userService = require('../services/user.service');

router.get('/', getAllUsers)
router.post('/', deleteUser)

function getAllUsers(req, res, next) {
    userService.all()
        .then(users => res.json(users))
        .catch(err => next(err))
}

function deleteUser(req, res, next) {
    userService.deleteUser(req.body.id)
        .then(user => res.json(user))
        .catch(err => next(err))
}

module.exports = router