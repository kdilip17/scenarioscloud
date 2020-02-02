var mongoose = require('mongoose');
var Schema = mongoose.Schema;

EmpSchema = new Schema({
    fullName : {
        type:String,
        required: true,
    },
    fName: {
        type:String,
        required: true,
    },
    lName: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    phoneNo: {
        type:String,
        required: true,
    },
    doj: {
        type:Date,
        required: true,
    },
    dob: {
        type:Date,
        required: true,
    },
    designation: {
        type:String,
        required: true,
        enum: ["TL","SE","SSE","CEO","HR","PM","BA","CTO","AD","PL"]
    },
    experienceMonths: {
        type:Number,
        required: true,
    } 
},{strict: true});

module.exports = mongoose.model('Employee', EmpSchema);