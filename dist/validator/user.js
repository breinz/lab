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
var userModel_1 = __importDefault(require("../model/userModel"));
var UserValidator = (function () {
    function UserValidator(user) {
        this.email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.user = user;
        this.errors = {};
    }
    UserValidator.prototype.isValidForLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateEmail(false);
                        this.validatePassword();
                        return [4, this.validateLogin()];
                    case 1:
                        _a.sent();
                        return [2, Object.keys(this.errors).length === 0];
                }
            });
        });
    };
    UserValidator.prototype.isValidForSignin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateName();
                        return [4, this.validateEmail(true)];
                    case 1:
                        _a.sent();
                        this.validatePassword();
                        this.validatePasswordRepeat();
                        return [2, Object.keys(this.errors).length === 0];
                }
            });
        });
    };
    UserValidator.prototype.validateName = function () {
        if (!this.user.name || !this.user.name.length) {
            return this.errors.name = "required";
        }
    };
    UserValidator.prototype.validateEmail = function (checkTaken) {
        return __awaiter(this, void 0, void 0, function () {
            var count_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.user.email || !this.user.email.length) {
                            return [2, this.errors.email = "required"];
                        }
                        if (!this.email_regex.test(this.user.email)) {
                            return [2, this.errors.email = "invalid"];
                        }
                        if (!checkTaken) return [3, 2];
                        return [4, userModel_1.default.countDocuments({ email: this.user.email })];
                    case 1:
                        count_user = _a.sent();
                        if (count_user > 0) {
                            return [2, this.errors.email = "taken"];
                        }
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    UserValidator.prototype.validatePassword = function () {
        if (!this.user.password || !this.user.password.length) {
            return this.errors.password = "required";
        }
    };
    UserValidator.prototype.validatePasswordRepeat = function () {
        if (!this.user.password_repeat || !this.user.password_repeat.length || this.user.password != this.user.password_repeat) {
            return this.errors.password = "dont_match";
        }
    };
    UserValidator.prototype.validateLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel_1.default.findOne({ email: this.user.email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2, this.errors.login = "invalid"];
                        }
                        return [4, user.validatePassword(this.user.password || "")];
                    case 2:
                        if (!(_a.sent())) {
                            return [2, this.errors.login = "invalid"];
                        }
                        return [2];
                }
            });
        });
    };
    return UserValidator;
}());
exports.default = UserValidator;
