"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var projectSchema = new mongoose_1.Schema({
    title: String,
});
var Project = db_1.db.model("Priject", projectSchema);
exports.default = Project;
