const jwt = require('express-jwt');
const User = require('../models/User');

module.exports = authenticate;

function authenticate(req, res, next) {
    const secret = process.env.SECRET_KEY;

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize user
        async (req, res, next) => {
            const user = await User.findById(req.user.id);

            if (!user) {
                // user no longer exists 
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}