"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var projectSchema = new mongoose_1.Schema({
    title: String,
    technos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Techno"
        }
    ]
});
var Project = db_1.db.model("Project", projectSchema);
exports.default = Project;
