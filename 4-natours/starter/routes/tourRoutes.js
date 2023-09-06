const express=require('express')
const tourController=require('./../controllers/tourController')
const tourRouter=express.Router();

// tourRouter.param('id',tourController.checkID)


// create  a xheckbody middleware
// check if body containes the name and price property
// if not send back 400 (bad request)
// add it to the post handler stack

tourRouter
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)
    

tourRouter
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports=tourRouter