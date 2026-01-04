import dataUriParser from "datauri/parser.js";
import path from "path";

let datauri = (file) => {
    const parser = new dataUriParser();
    let extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};

export default datauri;