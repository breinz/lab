"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
exports.sizes = {
    "tiny": [20, 20],
    "small": [50, 50],
    "medium": [100, 100],
    "large": [500, 500]
};
exports.default = {
    getImage: function (file, size) {
        var filePath = "/assets/img/";
        var url = "/img/";
        if (!size || size === "original") {
            return url + file;
        }
        var resizeData = {
            width: exports.sizes[size][0],
            height: exports.sizes[size][1],
            fit: "contain"
        };
        filePath += size;
        url += size + "/";
        try {
            fs_1.accessSync(path_1.default.join(__dirname, "../", filePath, file));
            return url + file;
        }
        catch (err) { }
        try {
            fs_1.mkdirSync(path_1.default.join(__dirname, "../", filePath));
        }
        catch (error) {
            if (error.code !== "EEXIST") {
                throw error;
            }
        }
        sharp_1.default(path_1.default.join(__dirname, "../assets/img", file))
            .resize(resizeData.width, resizeData.height)
            .toFile(path_1.default.join(__dirname, "../", filePath, file));
        return url + file;
    },
    removeImages: function (fileName) {
        fs_1.unlink(path_1.default.join(__dirname, "../assets/img", fileName), function (err) {
            if (err && err.code !== "ENOENT")
                throw err;
        });
        Object.keys(exports.sizes).forEach(function (size) {
            fs_1.unlink(path_1.default.join(__dirname, "../assets/img", size, fileName), function (err) {
                if (err && err.code !== "ENOENT")
                    throw err;
            });
        });
    }
};
