import path from "path";
const uuid = require("uuid/v4")
import fileUpload from "express-fileupload";
import { Request, Response, NextFunction } from "express";
import imageHelper from "../helper/imageHelper";

export default class ImageMiddleware {

    constructor() {
        console.log(this);
    }

    async uploadSingle(req: Request, res: Response, next: NextFunction) {
        if (!req.files || Object.keys(<any>req.files).length === 0) {
            console.log("no file provided");
            // No file provided
            return next();
        }

        const key = Object.keys(<any>req.files)[0];

        const file = (<fileUpload.FileArray>req.files)[key] as fileUpload.UploadedFile;

        const parts = file.name.split(".");
        const dest = `${uuid()}.${parts[parts.length - 1]}`;

        await file.mv(path.join(__dirname, "../assets/img", dest));

        req.body[key] = dest;

        next();
    }

    removeTechnoImages(req: Request, res: Response, next: NextFunction) {
        if (!req.techno.image || req.techno.image.length === 0) {
            return next();
        }

        try {
            imageHelper.removeImages(req.techno.image);
        } catch (error) {
            return res.status(500).send("Unable to delete image");
        }

        next();
    }
}