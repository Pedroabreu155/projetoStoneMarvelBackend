"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("./database");
var routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
var app = express_1.default();
var port = process.env.PORT;
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, function () { return console.log("Server Running on port: " + port); });
