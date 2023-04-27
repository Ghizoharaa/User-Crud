const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');
var Userdb = require('../models/User');


const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@cluster0.qcyyspp.mongodb.net/dashboard?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('index', { users });
  } catch (err) {
    console.log(err);
  }
});

app.get('/user', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/signup', async (req, res) => {
    try {
        const { fullname, username, age, gender, email, password } = req.body;
        const newUser = new User({ fullname, username, age, gender, email, password });
        await newUser.save();
        res.redirect('/');
        } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
  });

  

  

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));