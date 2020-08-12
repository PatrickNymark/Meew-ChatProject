const express = require('express');
const router = express.Router()
const authService = require('../services/auth.service')
const authenticate = require('../helpers/authenticate');

const User = require('../models/User')

router.post('/login', login)
router.post('/register', register)
router.get('/current', authenticate(), current)

function login(req, res, next) {
    authService.login(req.body)
        .then(user => {
            res.json(user)
        })
        .catch(err => next(err))
}

function register(req, res, next) {
    authService.register(req.body)
        .then(user => {
            res.json(user)
        })
        .catch(err => next(err))
}

function current(req, res, next) {
    User.findById(req.user.id).select('-password').then(user =>  {
        res.json(user)
    })
}



module.exports = router