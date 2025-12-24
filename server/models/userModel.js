const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        required: true,
        unique: true,
        lowercase: true
    },
    loginCode: {
        type: String,
        required: true,
    }
});

exports.userModel = model('user',userSchema);