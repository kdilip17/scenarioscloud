var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ProjectSchema = new Schema({
    projectName : {
        type:String,
        required: true,
    },
    projectMembers: [{
        role: {
            type:String,
            required: true,
            enum: ["LEAD","DEVELOPER","QA"]
        },
        employeeId: {
            type:String,
            required: true,
        },
        employeeFullName: {
            type:String,
            required: true,
        }
    }],
    startDate: {
        type:Date,
        required: true,
    },
    endDate: {
        type:Date,
        required: true,
    }
},{strict: true});
module.exports = mongoose.model('Project', ProjectSchema);