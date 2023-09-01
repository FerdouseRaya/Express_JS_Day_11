const path = require('path');
const fs = require ('fs');
//const UserModel = require('../model/Users');
const CourseModel = require('../model/courses');
const {success,failure} =require('../util/common');
const logFilePath = './Server/log.txt';
const { validationResult } = require("express-validator");


class coursesController{

      async getAll(req, res) {
        try {
          const users = await CourseModel.find({});
          console.log(users);
          if (users.length>0) {
                return res.status(200).send(success("Successfully received all products", { result: users, total: users.length }));
            } else {
                return res.status(500).send(failure("No Data found!"));
            }
        } catch (error) {
          console.log(error);
          return res.status(500).send(failure("Internal server error"));
        }
      }

      async getOneById(req, res) {
        try {
          const { id } = req.query;
          const user = await CourseModel.find({course_id:id});

          if (user) {
            return res.status(200).send(success("Successfully received the user", user));
          } else {
            return res.status(400).send(failure("Failed to received the user"));
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send(failure("Internal server error"));
        }
      }

      async addItem(req,res){
        try{

              const { course_id, course_name,department,faculty_name,course_price} = req.body;

              const user = new CourseModel({ course_id:course_id,course_name:course_name, department:department,faculty_name:faculty_name,course_price:course_price});
               await user
              .save()
              .then((data) => {
                return res.status(200).send(success("Successfully added the user", data));
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).send(failure("Failed to add the user"));
              });
            

         }catch(error){
          return res.status(500).send(failure("Internal server error"));
      }
      }

      async deleteById(req,res){
        const{id} =req.query;
        try{
             const deleteItemResult = await CourseModel.deleteOne({_id:id});
            if(deleteItemResult){
                return res.status(200).send(success('Item deleted Successfully',deleteItemResult));
            }
            else{
                return res.status(400).send(failure('Item not found!'));
            }
        }
        catch(error){
                return res.status(500).send(failure('Server error...'));
        }
      }
    
      
      async updateByID(req, res) {
        try {
             const { id } = req.query;
            const updatedData = req.body;

        
            const updatedCourse = await CourseModel.findOneAndUpdate(
                                              { course_id: id },
                                               updatedData,
                                                { new: true }
            );

        if (updatedCourse) {
            const logEntry = `User Data Updated: ${new Date().toISOString()}\n`;
            fs.appendFileSync(logFilePath, logEntry, 'utf-8');
            return res.status(200).send(success("Successfully updated the user", updatedCourse));
        } else {
            return res.status(400).send(failure("Failed to update the user"));
        }
          } catch (error) {
              console.log(error);
               return res.status(500).send(failure("Internal server error"));
          }
      }
    
      
}

module.exports = new coursesController();