const mongoose = require('mongoose');

async function connect() {
    try {
        // 'mongodb://localhost:27017/db_nodejs'
        // 'mongodb+srv://phucdncr7:jzNfFHnBVVDKwm7y@cluster0.13sgcb2.mongodb.net/test'
        await mongoose.connect('mongodb+srv://phucdncr7:jzNfFHnBVVDKwm7y@cluster0.13sgcb2.mongodb.net/test');
        console.log("success")
    } catch (error) {
        console.log("false")
    }
}

module.exports = { connect }