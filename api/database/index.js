const { Mongoose } = require('mongoose');
const fs = require('fs');

const credentials = fs.readFileSync(`${__dirname}/User1.pem`);

const mongoose = new Mongoose();

(async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://cluster0.ylk0s.mongodb.net/Voltron?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                sslKey: credentials,
                sslCert: credentials,
                useFindAndModify: false,
            }
        );
        console.log('db is connect');
    } catch (error) {
        console.log('Unable to connect to db ', error);
    }
})();

module.exports = mongoose;
