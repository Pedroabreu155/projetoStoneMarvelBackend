"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("./database/index");
var routes_1 = __importDefault(require("./routes/routes"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = process.env.PORT;
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(routes_1.default);
app.listen(port, function () { return console.log("Server Running on port: " + port); });
