const express = require('express');
const app = express();
//const  ProductController = require('../controller/Product');
const userController = require('../controller/userController');
const coursesController = require('../controller/coursesController');
const purchaseController = require('../controller/purchaseController');
const creatValidation = require('../middleware/validation');
const validator = require("../middleware/validation_01");

app.get('/get', userController.getAll);
app.get('/getItem',userController.getOneById);
app.post('/addItem',validator.addItem,userController.addItem);
app.delete('/deleteOne',userController.deleteById);
app.patch('/updateOne',userController.updateByID);
app.get('/findcg',userController.findByCgpa);
app.get('/sortByCG',userController.sortByCG);

app.get('/courses-get', coursesController.getAll);
app.get('/courses-getItem',coursesController.getOneById);
app.post('/courses-addItem',coursesController.addItem);
app.delete('/courses-deleteOne',coursesController.deleteById);
app.patch('/courses-updateOne',coursesController.updateByID);

app.get('/purchasedGet', purchaseController.getAll);
app.post('/purchaseAdd',purchaseController.addItem);
app.get('/getAllwithPrice',purchaseController.getAllwithPrice);
app.get('/addCourses',purchaseController.addCourses);

app.use('*', (req, res) => {
    return res.status(400).send('Wrong URL!');
});
module.exports = app;

