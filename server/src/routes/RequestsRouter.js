const express = require('express');
const router = express.Router();

const Requests = require('../models/Requests')



// Add request to db
router.post('/addRequest', async (req, res) => {
    try {
        const { fullname, company, type, email, phone,confirmPhone, comment } = req.body;
        const newRequest = new Requests({ fullname, company, type, email, phone, confirmPhone,comment });
        await newRequest.save();
        res.redirect('/requests/form');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete request fron db
router.delete('/requests/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Requests.findByIdAndDelete(id);
        res.send({message: 'Request deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);

// Display the request page
router.get('/requests/form', async(req, res) => {
    try {
        const requests = await Requests.find().exec();
        console.log(requests);
        res.render('requests', {requests});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Display all requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await Requests.find().exec();
        console.log(requests);
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

// Display the request page for a specific request
// Display the request for a specific request
router.get('/requests/:requestId', async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const request = await Requests.findById(requestId).exec();
      console.log(request);
      res.json({ request });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;