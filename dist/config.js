"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = process.env;
var test = env.NODE_ENV === "test";
var PORT = test ? 3001 : 3000;
exports.default = {
    PORT: PORT,
    BCRYPT_SALT: test ? 1 : 10,
    DB: "mongodb://0.0.0.0:27017/" + (test ? "db_test" : "db")
};
