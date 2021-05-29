const mongoose = require('mongoose')

const URI = 'mongodb://localhost/mern-users'

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))

    module.exports = mongoose