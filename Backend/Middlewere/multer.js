import multer from "multer"

let storage = multer.memoryStorage();
export let singleUpload = multer({storage}).single("file")