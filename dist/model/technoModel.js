"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var technoSchema = new mongoose_1.Schema({
    name: String,
});
var Techno = db_1.db.model("Techno", technoSchema);
exports.default = Techno;
