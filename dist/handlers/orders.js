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
var orders_1 = require("../models/orders");
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1["default"].config();
var store = new orders_1.OrderStore();
/*
#### API endpoints
#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
*/
/*
    an order can only be created by the respective user after the token validation
*/
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, authorizationHeader, token, decoded, newOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                order = {
                    userId: _req.body.userId,
                    status: _req.body.status
                };
                /*
                    Noone but the respective user can create their own order
                */
                try {
                    authorizationHeader = _req.headers.authorization + '';
                    token = authorizationHeader.split(' ')[1];
                    decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET + '');
                    if (decoded.user.id != order.userId) {
                        throw new Error('Only the respective user can create their own order...');
                    }
                }
                catch (err) {
                    res.status(401);
                    res.send("Unable to create order due to invalid token with Error: " + err);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, store.create(order)];
            case 1:
                newOrder = _a.sent();
                res.json(newOrder);
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
    only the respective user will be able to add more products to their order
    after the token validation...
*/
// TODO: check if the order_products table is populated ...
var addProduct = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, userId, productId, quantity, authorizationHeader, token, decoded, orderProduct, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(_req.params.orderId);
                userId = parseInt(_req.params.userId);
                productId = _req.body.productId;
                quantity = parseInt(_req.body.quantity);
                /*
                    Noone but the respective user can create their own order
                */
                try {
                    authorizationHeader = _req.headers.authorization + '';
                    token = authorizationHeader.split(' ')[1];
                    decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET + '');
                    if (decoded.user.id != userId) {
                        throw new Error('Only the respective user can create their own order...');
                    }
                }
                catch (err) {
                    res.status(401);
                    res.send("Unable to create order due to invalid token with Error: " + err);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.addProduct(quantity, orderId, productId)];
            case 2:
                orderProduct = _a.sent();
                res.json(orderProduct);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/*
    any autheticated user can see all the orders
*/
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
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
    any autheticated user can find an order by its ID
*/
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(_req.params.id);
                return [4 /*yield*/, store.show(orderId)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/*
    only the respective user can delete their own order
*/
var destroy = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order, authorizationHeader, token, decoded, jsonStr, uId, deleted, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                orderId = parseInt(_req.params.id);
                return [4 /*yield*/, store.show(orderId)];
            case 1:
                order = _a.sent();
                /*
                    Noone but the respective user can create their own order
                */
                try {
                    authorizationHeader = _req.headers.authorization + '';
                    token = authorizationHeader.split(' ')[1];
                    decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET + '');
                    jsonStr = JSON.stringify(order);
                    uId = JSON.parse(jsonStr).user_id;
                    if (decoded.user.id != uId) {
                        throw new Error('only the respective user can delete their own order ..');
                    }
                }
                catch (err) {
                    res.status(401);
                    res.send("Unable to delete order due to invalid token with Error: " + err);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, store["delete"](orderId)];
            case 2:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var verifyAuthToken = function (_req, res, next) {
    try {
        var authorizationHeader = _req.headers.authorization + '';
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET + '');
        next();
    }
    catch (err) {
        res.status(401);
        res.send("Unable to create order due to invalid token with Error: " + err);
        return;
    }
};
var orderRoutes = function (app) {
    app.post('/orders', create);
    app.post('/users/:userId/orders/:orderId/products', addProduct);
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app["delete"]('/orders/:id', destroy);
};
exports["default"] = orderRoutes;
