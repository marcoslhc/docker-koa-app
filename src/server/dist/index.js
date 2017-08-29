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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var mongodb_1 = require("mongodb");
var Router = require('koa-router');
// const redis = createRedisClient('redis://redis:6379');
var app = new Koa();
var app_router = Router();
var APP_PORT = 3000;
function connect(url) {
    var client = new mongodb_1.MongoClient();
    return new Promise(function (resolve, reject) {
        try {
            return client.connect(url, function (err, db) { return err ? reject(err) : resolve(db); });
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
function getCollection(collectionName) {
    return function (db) {
        return Promise.resolve(db.collection(collectionName));
    };
}
function insertOne(collection, data) {
    return new Promise(function (resolve, reject) {
        collection.insertOne(data, function (err, result) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });
    });
}
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var ts, before, time;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ts = new Date();
                before = Date.now();
                ctx.state.logInfo = { ts: ts, before: before };
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                time = Date.now() - before;
                return [2 /*return*/];
        }
    });
}); });
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, ts, before, time, db, collection, log, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, next()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, , 8]);
                _a = ctx.state.logInfo, ts = _a.ts, before = _a.before;
                time = Date.now() - before;
                return [4 /*yield*/, connect('mongodb://mongo:27017/local')];
            case 3:
                db = _b.sent();
                return [4 /*yield*/, getCollection('logs')(db)];
            case 4:
                collection = _b.sent();
                log = "[" + ts.toISOString() + " - " + time + "ms] " + ctx.url + " - Status " + ctx.status;
                console.log(log);
                return [4 /*yield*/, insertOne(collection, { log: log })];
            case 5:
                _b.sent();
                return [4 /*yield*/, db.close()];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7:
                e_1 = _b.sent();
                console.log(e_1.message);
                console.trace(e_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app_router.get('', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 200;
        console.log(ctx.status);
        ctx.body = "hello world";
        return [2 /*return*/];
    });
}); });
app_router.get('/users/:user', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 200;
        ctx.body = "hello " + ctx.params.user;
        return [2 /*return*/];
    });
}); });
app.use(app_router.routes());
app.listen(APP_PORT);
