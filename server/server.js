const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

require('dotenv').config();

mongoose.connect('mongodb+srv://User:Meew12345@meew.fdz6p.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('db connected'));


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/api/auth', require('./controllers/auth.controller'));
app.use('/api/users', require('./controllers/user.controller'));

const port = process.env.PORT || 5000;

app.use(require('./helpers/error-handler'))

app.listen(port, () => console.log(`Server running on ${port}`))