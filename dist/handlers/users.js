"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var users_1 = require("../models/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var store = new users_1.UsersManagement();
/*
#### API endpoints
#### Users
- Index [token required]
- Show [token required]
- Create N[token required]
*/
var tokenSecret = process.env.TOKEN_SECRET + '';
/*
    create an user with first and last name, password, role and email
*/
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    firstname: _req.body.firstName,
                    lastname: _req.body.lastName,
                    password: _req.body.password,
                    role: _req.body.role,
                    email: _req.body.email
                };
                return [4 /*yield*/, store.create(user)];
            case 1:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser }, tokenSecret);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
    we will find the user based on provided email and then will match with the hased password.
    If we see a match, we will decide that this is correct login and will provide JWT token
    than can use used for prividelged operations.
*/
var login = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, isRegistered, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = _req.body.email;
                password = _req.body.password;
                return [4 /*yield*/, store.login(email, password)];
            case 1:
                isRegistered = _a.sent();
                if (isRegistered) {
                    token = jsonwebtoken_1["default"].sign({ user: isRegistered }, tokenSecret);
                    res.json(token);
                    return [2 /*return*/];
                }
                return [2 /*return*/, res.json("We don't find an user with the email provided. Please, sign up to the store ...")];
            case 2:
                error_1 = _a.sent();
                res.status(401);
                res.json({ error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
    We will need token to see all the users,but, doesn't require 'ADMIN' priviledges.
    So, generally any use can see/ find all the users in the app
*/
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
    we will need token to see user by ID,but, doesn't require 'ADMIN' priviledges
*/
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, product, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = parseInt(_req.params.id);
                return [4 /*yield*/, store.show(userId)];
            case 1:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
    only an admin can delete an user
*/
var destroy = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, decoded, userRole, userId, deleted, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authorizationHeader = _req.headers.authorization + '';
                    token = authorizationHeader.split(' ')[1];
                    decoded = jsonwebtoken_1["default"].verify(token, tokenSecret);
                    userRole = decoded.user.role;
                    if (userRole != 'ADMIN') {
                        throw new Error('Sorry, noone but an admin can delete an  user...');
                    }
                }
                catch (err) {
                    res.status(401);
                    res.send("Unable to delete user due to invalid token with Error: " + err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userId = parseInt(_req.params.id);
                return [4 /*yield*/, store["delete"](userId)];
            case 2:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/*
    only the respective user can edit their own settings
*/
var update = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, authorizationHeader, token, decoded, updatedUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    firstname: _req.body.firstName,
                    lastname: _req.body.lastName,
                    password: _req.body.password,
                    role: _req.body.role,
                    email: _req.body.email
                };
                // user settings can be only updated by the respective user
                try {
                    authorizationHeader = _req.headers.authorization + '';
                    token = authorizationHeader.split(' ')[1];
                    decoded = jsonwebtoken_1["default"].verify(token, tokenSecret);
                    if (decoded.user.id != _req.params.id) {
                        throw new Error("Sorry, you can't change anyone else settings. Goodbye!!!");
                    }
                }
                catch (err) {
                    res.status(401);
                    res.json("Unable to update an user with error " + err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.update(user, parseInt(_req.params.id))];
            case 2:
                updatedUser = _a.sent();
                res.json(updatedUser);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var verifyToken = function (_req, res, next) {
    try {
        var authorizationHeader = _req.headers.authorization + '';
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, tokenSecret);
        next();
    }
    catch (err) {
        res.status(401);
        res.send("Unable to create product due to invalid token with Error: " + err);
        return;
    }
};
var userRoute = function (app) {
    app.post('/users/signup', create);
    app.post('/users/login', login);
    app.get('/users', verifyToken, index);
    app.get('/users/:id', verifyToken, show);
    app.put('/users/:id', update);
    app["delete"]('/users/:id', destroy);
};
exports["default"] = userRoute;
