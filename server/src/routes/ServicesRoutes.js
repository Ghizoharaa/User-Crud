const { response } = require('express');
const express = require('express');
const router = express.Router();

const Service = require('../models/Services')



// Add service to db
router.post('/addService', async (req, res) => {
    try {
        const { title, body } = req.body;
        const newService = new Service({ title, body });
        await newService.save();
        res.redirect('/service/form');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete service fron db
router.delete('/service/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Service.findByIdAndDelete(id);
        res.send({message: 'Service deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);

// Display the service page
router.get('/services/form', async(req, res) => {
    try {
        const services = await Service.find().exec();
        console.log(services);
        res.render('services', {services});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Display all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find().exec();
        console.log(services);
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
// Update service

router.put('/updateService/:id' , async(req, res) => {
    const {title, body} = req.body;
    await Service.findByIdAndUpdate({
        posts : req.postId, _id: req.params.id
    }, 
    {
        title, body
    })
    .then((result) => response(res, 200, {msg: 'Service updated', services: result}))
    .catch(err => response(res, 400, err))
})



module.exports = router;