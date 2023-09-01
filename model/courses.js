const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    course_id: {
        type: Number,
        unique:true,
        required: [true, "Course ID was not provided"],
    },
    course_name: {
        type: String,
        required: [true, "Course Name was not provided"],
        maxLength: 30,
    },
    department: {
        type: String,
        required: [true, "Department was not provided"],
    },
    faculty_name: {
        type: String,
        required: [true, "Faculty Name was not provided"],
        maxLength: 30,
    },
    
    course_price :{
        type: Number,
        unique:true,
        min:18000,
        max:25000,
        required: [true, "Course Price was not provided"],
    }
    
});

const courses = mongoose.model('courses',courseSchema);
module.exports =courses;