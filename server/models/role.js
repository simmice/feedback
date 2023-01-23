const mongoose = require ('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const ENCRYPTION =require('../utilities/encryption');
const { User } = require('./user');
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

module.exports.roles = (function() {
    ac.grant("basic").readOwn("profile").updateOwn("profile")
    ac.grant("admin").extend("basic").updateAny("profile").deleteAny("profile")

    return ac;
})





// const ROLE_SCHEMA = mongoose.Schema({
//     name: { type: String, required: true, unique: true },
//     users: [{ type: ObjectID, ref: 'User' }]
// });

// const Role = mongoose.model('Role', ROLE_SCHEMA);

// module.exports = Role;

// module.exports.init = () => {
//     Role.findOne({ name: 'Admin' }).then((role) => {
//         if(!role) {
//             Role.create ({ name: 'Admin' }).then((newRole) => {
//                 let salt = ENCRYPTION.generateSalt();
//                 let passwordHash = ENCRYPTION.generateHashedPassword(salt, 'admin');
//                 let adminUser = {
//                     username: 'admin',
//                     email: 'dummicy@gmail.com',
//                     salt: salt,
//                     password: passwordHash,
//                     isAdmin: true,
//                     roles: [newRole._id]
//                 };

//                 User.create(adminUser).then((user) => {
//                     newRole.users.push(user._id);
//                     newRole.save();
//                 });
//             });
//         }
//     });
// };