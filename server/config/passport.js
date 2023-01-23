const JWT = require('jsonwebtoken');
const LOCAL_STRATEGY = require('passport-local').Strategy;

const ENCRYPTION = require('../utilities/encryption');
const ROLE = require('mongoose').model('Role');
const USER = require('mongoose').model('User');

const SECRET = 'ock9I/2yUN6ZXWQdfPvv6LC7diPqB9QgF4BVF2St9CSAtzmyqYHobV1DGBAnsgym3QqD2Pcl9dkNZxgmxzX5AvqKnmOTz/PeyMn';

function generateToken(userInfo){
    const USER = {
        email: userInfo.email,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
        roles: userInfo.roles
    };
    const PAYLOAD = { sub: USER };

    return JWT.sign(PAYLOAD, SECRET, { expiresIn: 604800000 });
}

module.exports = {
    localLogin: () => {
        return new LOCAL_STRATEGY({
            emailField: 'email',
            session: false
        }, (email, done) => {
            USER.findOne({ email: email }.then((user) => {
                if (!user){
                    return done(null, false);
                }

                let token = generateToken(user);
                return done (null, token);
            }))
        });
    }
};