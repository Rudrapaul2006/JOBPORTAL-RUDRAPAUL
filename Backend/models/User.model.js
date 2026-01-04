    import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true, 
        unique : true
    },
    password : {
        type : String,
        required : true 
    },
    phone : {
        type : Number,
        required : true,
    },
    role : {
        type : String,
        enum : ["student", "recruiter"],
        // default : "student",
        required : true
    },
    profile : { 
        bio : {type : String},
        skills : [{type : String}],
        resume : {type : String},
        instagram : {type : String},
        experience : {type : String},
        resumeOriginalName : {type : String},
        location : {type : String},
        company : {type : mongoose.Schema.Types.ObjectId, ref : "Company"},
        profilePic : { 
            type : String,
            default : "",
        }  
    } 
    
} , {timestamps : true});

export let User =  mongoose.model("User", userSchema);