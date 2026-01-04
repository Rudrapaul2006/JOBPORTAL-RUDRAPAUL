    import mongoose from "mongoose";

    let companySchema = new mongoose.Schema({
        companyName : {
            type : String,
            required : true,
            unique : true
        },
        description : {
            type : String,
        },
        website : {
            type : String
        },
        location : {
            type : String
        },
        logo : {
            type : String
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    } , {timestamps : true});


    export let Company = mongoose.model("Company" , companySchema);