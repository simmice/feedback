const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;


var UserSchema = new Schema({
    email: { 
        type: String 
    },
    role: { 
        type: String, 
        default: 'basic', 
        enum: ["basic", "admin"] 
    },
    accessToken: { 
        type: String 
    },
    name: { 
        type: String 
    },
    firstName: { 
        type: String 
    },
    lastName: { 
        type: String 
    },
    photoUrl: { 
        type: String 
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    // roles: [{type: ObjectID, ref:'Role'}],
    id: { 
        type: String 
    },
    idToken: { 
        type: String 
    },
    provider: { 
        type: String 
    },
    status: { 
        type: String 
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;