    import mongoose from "mongoose";

let jobSchema = new mongoose.Schema({
    role : {
        type : String,
        required : true 
    },
    description : {
        type : String ,
        required : true 
    },
    requirements : [{
        type : String,
        required : true
    }],
    salary : {
        type : Number, 
        required : true 
    },
    companyName : {
        type : String,
        required : true
    },
    experience : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    jobType : {
        type : String,
        required : true
    },
    position : {
        type : Number,
        required : true 
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Company",
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", 
    },
    applicant: [
        {type : mongoose.Schema.Types.ObjectId, ref : "Application"  } 
    ]

} , {timestamps : true})

export let Job = mongoose.model("Job" , jobSchema)