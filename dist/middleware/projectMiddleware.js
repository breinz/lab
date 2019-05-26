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
var projectValidator_1 = __importDefault(require("../validator/projectValidator"));
var projectModel_1 = __importDefault(require("../model/projectModel"));
var technoModel_1 = __importDefault(require("../model/technoModel"));
var ProjectMiddleware = (function () {
    function ProjectMiddleware() {
    }
    ProjectMiddleware.prototype.validCreate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        validator = new projectValidator_1.default(req.body);
                        if (!!validator.validCreate()) return [3, 2];
                        _b = (_a = res).render;
                        _c = ["admin/project/new"];
                        _d = {
                            project: req.body,
                            errors: validator.errors
                        };
                        return [4, technoModel_1.default.find()];
                    case 1: return [2, _b.apply(_a, _c.concat([(_d.technos = _e.sent(),
                                _d)]))];
                    case 2:
                        next();
                        return [2];
                }
            });
        });
    };
    ProjectMiddleware.prototype.validEdit = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        validator = new projectValidator_1.default(req.body);
                        if (!!validator.validCreate()) return [3, 2];
                        _b = (_a = res).render;
                        _c = ["admin/project/edit"];
                        _d = {
                            project: req.body,
                            errors: validator.errors
                        };
                        return [4, technoModel_1.default.find()];
                    case 1: return [2, _b.apply(_a, _c.concat([(_d.technos = _e.sent(),
                                _d)]))];
                    case 2:
                        next();
                        return [2];
                }
            });
        });
    };
    ProjectMiddleware.prototype.findProject = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req;
                        return [4, projectModel_1.default.findById(req.params.id)];
                    case 1:
                        _a.project = (_b.sent());
                        next();
                        return [2];
                }
            });
        });
    };
    return ProjectMiddleware;
}());
exports.default = ProjectMiddleware;
