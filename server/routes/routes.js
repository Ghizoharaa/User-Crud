const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.get('/', async (req, res) => {
    try {
      const users = await User.find().exec();
      console.log(users);
      res.render('index', { users });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });




  

    router.post('/signup', async (req, res) => {
    const { fullname, username, age, gender, email, password } = req.body;
    const newUser = new User({ fullname, username, age, gender, email, password });

    try {
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
