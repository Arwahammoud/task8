const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name : {
       type : String ,
       require : true , 
    } ,
    email : {
        type : String , 
        require : true , 
        unique : true ,
        lowercase: true
    } ,
    phone : { 
        type : String ,
        require : true , 
        unique : true 
    } , 
    registerDate :{
        type  : Date,
        default : Date.now 
    },
    password : {
         type : String , 
        require : true , 
        unique : true 
    },
    role : {
        type : String , 
        enum :  ['member' , 'librarian' , 'manger' ],
        default : 'member'
    } ,
    address : {
        type : String 
    },
    birth  :{
        type : Date
    },
    membershipNumber : {
        type : String,
         unique: true,
    },
    responsibleDepartment: String,

},  { timestamps: true })

module.exports = mongoose.model('User', userSchema);
