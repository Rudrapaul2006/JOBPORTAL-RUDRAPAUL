import mongoose from "mongoose";
import chalk from "chalk";

export let DBConnect = () => {
    mongoose.connect(process.env.Mongo_Url , {
        dbName : "Job_Portal",
    }).then(() => {
        console.log(chalk.bgBlack.cyan("MongoDB Connected ..."))
    }).catch((Error) => {
        console.error(Error);
    })
}