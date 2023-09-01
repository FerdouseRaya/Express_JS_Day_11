const path = require('path');
const fs = require ('fs');
// //const UserModel = require('../model/Users');
// const CourseModel = require('../model/courses');
const PursedModel = require('../model/purchase');
const {success,failure} =require('../util/common');
const logFilePath = './Server/log.txt';
const { validationResult } = require("express-validator");


class purchaseController{
  async getAll(req, res) {
    try {
        let purchase = await PursedModel.find({})
            .populate('students')
            .populate('courses');

        console.log("Purchase Data:", purchase);

        if (purchase.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Successfully retrieved purchases",
                result: purchase
            });
        } else {
          return res.status(500).send(failure('No Purchase found'));
        }
        } catch (error) {
          console.error("Error:", error);
         return res.status(500).send(failure('Internal Server Error'));
      }
  } 


    async getAllwithPrice(req, res) {
        try {
            const purchases = await PursedModel.find({})
            .populate('students','-_id -student_id -birth_date ')
            .populate('courses.course_id','-course_id -department -faculty_name -__v');

            const calculateTotalPrice =(courses)=>{
              let totalPrice =0;
              for (const course of courses){
                totalPrice +=course.price;
              }
              return totalPrice;
            }


            const purchasedTotal =[];

            for(const purchase of purchases){
              const totalPrice = calculateTotalPrice(purchase.courses);
              purchasedTotal.push({
                    _id: purchase._id,
                    students: purchase.students,
                    courses: purchase.courses,
                    totalPrice: totalPrice,
              })
            }

            if (purchasedTotal.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Successfully retrieved purchases with total price",
                    result: purchasedTotal,
                });
            } else {
              return res.status(400).send(failure('No purchase Found'));
            }
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send(failure('Internal Server Error'));
        }
    }

    async addCourses(req, res) {
      const { students, courses } = req.body;
    
      try {
        const existingPurchased = await PursedModel.findOne({ students });
    
        if (!existingPurchased) {
          return res.status(404).send(failure('No purchase found for the student'));
        }
        existingPurchased.courses.push(...courses);
        await existingPurchased.save();
    
        return res.status(200).send(success('Courses Added', { result: existingPurchased}));
      } catch (error) {
        return res.status(500).send(failure('Internal Server Error'));
      }
    }

    async addItem(req,res){
        try{
            const {students,courses} = req.body;
            const newBuy = await PursedModel({students, courses});
            await newBuy.save();
            console.log(newBuy);
            if(newBuy){
                return res.status(200).send(success('Great!:',{result:newBuy}));
            }
            else{
                return res.status(400).send(failure('did not add'));
            }
        }catch(error){
            console.log(error);
            return res.status(500).send(failure('Interval Server Error'));
        }
      }
    
      
}

module.exports = new purchaseController();