const mongoose = require('mongoose');

module.exports = () => {
mongoose.connect('mongodb+srv://testuser:user123@cluster0.xmnd5.mongodb.net/movieapi?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
    .then(() =>{
        console.log('MongoDB bağlantısı sağlandı.');
    }).catch((err) => {
    console.log('MongoDB bağlantı hatası.');
});

mongoose.Promise = global.Promise;
};
/*
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });
 */
