"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var uuid = require("uuid/v4");
var imageHelper_1 = __importDefault(require("../helper/imageHelper"));
var ImageMiddleware = (function () {
    function ImageMiddleware() {
        console.log(this);
    }
    ImageMiddleware.prototype.uploadSingle = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var key, file, parts, dest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.files || Object.keys(req.files).length === 0) {
                            console.log("no file provided");
                            return [2, next()];
                        }
                        key = Object.keys(req.files)[0];
                        file = req.files[key];
                        parts = file.name.split(".");
                        dest = uuid() + "." + parts[parts.length - 1];
                        return [4, file.mv(path_1.default.join(__dirname, "../assets/img", dest))];
                    case 1:
                        _a.sent();
                        req.body[key] = dest;
                        next();
                        return [2];
                }
            });
        });
    };
    ImageMiddleware.prototype.removeTechnoImages = function (req, res, next) {
        if (!req.techno.image || req.techno.image.length === 0) {
            return next();
        }
        try {
            imageHelper_1.default.removeImages(req.techno.image);
        }
        catch (error) {
            return res.status(500).send("Unable to delete image");
        }
        next();
    };
    return ImageMiddleware;
}());
exports.default = ImageMiddleware;
