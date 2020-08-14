  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {
  login,
  register
}

/**
 * Login user 
 * @param {object} userData a object containing username and password
 * @returns a Promise or exception  
 */
async function login(userData) {
    const user = await User.findOne({ username: userData.username })

    if(!user) {
        throw `User '${userData.username}' not found`
    }

    if(user && bcrypt.compareSync(userData.password, user.password)) {
        const jwtToken = generateJwtToken(user);
        const { password, ...userWithOutPass } = user.toObject();
        
        return {
          ...userWithOutPass,
          jwtToken
        }
    }

    throw `Password incorrect`
}

/**
 * Register user 
 * @param {object} userData a object representing a user
 * @returns a Promise or exception  
 */
async function register(userData) {
    if(await User.findOne({ username: userData.username })) {
        throw `User '${userData.username}' already exists`
    }

    const newUser = new User(userData)
    return newUser.save().then(user => {
        const { password, ...userWithOutPass } = user.toObject();
        return {
            ...userWithOutPass
        }
    })

}

function generateJwtToken(user) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({ sub: user.id, id: user.id }, process.env.SECRET_KEY, { expiresIn: '15m' });
}
