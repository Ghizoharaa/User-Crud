const User = require('../models/User');
const userController = {};

// Display all user
userController.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        console.log(users);
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

//Display the index page
userController.getIndexPage = async (req, res) => {
    try {
        const users = await User.find().exec();
        console.log(users);
        res.render('index', {users});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

// Add user to db
userController.addUser = async (req, res) => {
    try {
        const { fullname, username, age, gender, email, password } = req.body;
        const newUser = new User({ fullname, username, age, gender, email, password });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

//Delete user from database
userController.deleteUser = async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if(!req.params.id){
            return res.status(400).send()
        }
        res.send(deleteUser)
        }
    catch(e){
        res.status(500).send(e)
    }
}






module.exports = userController;