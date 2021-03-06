import { Document, Schema, Model } from "mongoose";

import { db } from "../db";

export type TechnoModel = Document & {
    name: string,
    image: string
}

/**
 * Schema
 */
const technoSchema = new Schema({
    name: String,
    image: String
})

const Techno = db.model("Techno", technoSchema) as Model<Document> & TechnoModel;
export default Techno;