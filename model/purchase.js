const mongoose = require('mongoose');


const purchaseSchema = new mongoose.Schema({
    students:{
        type:mongoose.Types.ObjectId,
        ref:"students",
        required: true,
    },

    courses: [{
        _id: false,
        course_id: {
            type: mongoose.Types.ObjectId,
            ref: "courses", 
            required: true,
        },
        price: Number,
    }],
        
},
{timestamps:true});

const purchase = mongoose.model('purchase',purchaseSchema);
module.exports =purchase;