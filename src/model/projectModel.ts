import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { TechnoModel } from "./technoModel";

/**
 * Model
 */
export type ProjectModel = Document & {
    /**
     * Title
     */
    title: string,

    /**
     * Technos
     */
    technos: Types.ObjectId[] | TechnoModel[]
}

/**
 * Schema
 */
const projectSchema = new Schema({
    title: String,
    technos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Techno"
        }
    ]
})

const Project = db.model("Project", projectSchema) as Model<Document> & ProjectModel;
export default Project;