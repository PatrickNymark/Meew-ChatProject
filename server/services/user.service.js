

const User = require('../models/User');

module.exports = {
  all,
}

async function all() {
    return await User.find().select('-password')
}


