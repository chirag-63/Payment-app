const mongoose = require("mongoose");

//connect to mongo db
mongoose.connect('mongodb+srv://admin:SlUNZRixpfdzcxSx@cluster0.q5fvoz9.mongodb.net/paytm-app');
console.log('mongodb connected')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
})
const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}