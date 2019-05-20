const mongoose = require('mongoose');

// Connect to Database
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
