import { Document, Schema, Model } from "mongoose"

import { db } from "../db"

/**
 * Model
 */
export type ProjectModel = Document & {
    /**
     * Title
     */
    title: string
}

/**
 * Schema
 */
const projectSchema = new Schema({
    title: String,
})

const Project = db.model("Priject", projectSchema) as Model<Document> & ProjectModel;
export default Project;