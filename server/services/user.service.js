

const User = require('../models/User');

module.exports = {
  all,
  deleteUser
}

async function all() {
    return await User.find().select('-password')
}

async function deleteUser(id) {
	return await User.findByIdAndDelete(id);
}


