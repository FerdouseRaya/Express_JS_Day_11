const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        unique:true,
        required: [true, "Student ID was not provided"],
    },
    student_name: {
        type: String,
        required: [true, "Student Name was not provided"],
        maxLength: 30,
    },
    department: {
        type: String,
        required: [true, "Department was not provided"],
    },
    cgpa: {
        type: Number,
        required: [true,"CGPA was not provided"],
        min: 0,
        max: 4,
    },
    courses: {
        type: [
            {
                course_id: {
                    type: String,
                    required: true,
                },
                score: {
                    type: Number,
                    required: true,
                },
            }
        ],
        required: false,
    },
});

const students = mongoose.model('students',studentSchema);
module.exports =students;