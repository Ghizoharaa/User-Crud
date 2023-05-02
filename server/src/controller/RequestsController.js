
const Requests = require('../models/Requests')
const RequestsController = {};

//Display requests page
// RequestsController.displayRequestPage = async(req, res) => {
//     try {
//         const requests = await Requests.find().exec();
//         console.log(requests);
//         res.render('requests', {requests});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// }

// Add request to db
// RequestsController.addRequest = async (req, res) => {
//     try {
//         const { fullname, company, type, email, phone, comment } = req.body;
//         const newRequest = new Requests({ fullname, company, type, email, phone, comment });
//         await newRequest.save();
//         res.redirect('/requests/form');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// }

// Display all requests
// RequestsController.getAllRequests = async (req, res) => {
//     try {
//         const requests = await Requests.find().exec();
//         console.log(requests);
//         res.json(requests);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// }

//Delete request
// RequestsController.deleteRequests = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await Requests.findByIdAndDelete(id);
//         res.send({message: 'Request deleted successfully'});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// }
