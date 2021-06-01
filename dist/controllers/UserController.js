"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoritesCharactersByUserId = exports.getFavoritesComicsByUserId = exports.updateFavoritesCharactersByUserId = exports.updateFavoritesComicsByUserId = exports.getUserById = exports.getUsers = exports.deleteUserById = exports.updateUserById = exports.createUser = void 0;
var User_1 = __importDefault(require("../models/User"));
var bcrypt = __importStar(require("bcrypt"));
var typeorm_1 = require("typeorm");
var createUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, favoriteComics, favoriteCharacters, hashedPassword, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, name = _a.name, email = _a.email, password = _a.password, favoriteComics = _a.favoriteComics, favoriteCharacters = _a.favoriteCharacters;
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).save({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        favoriteComics: favoriteComics,
                        favoriteCharacters: favoriteCharacters,
                    })];
            case 2:
                user = _b.sent();
                user.password = '';
                response.json(user);
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUserById = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, password, hashedPassword, user, updatedUserCredentials, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = request.params.id;
                _a = request.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).update(id, {
                        name: name,
                        email: email,
                        password: hashedPassword,
                    })];
            case 2:
                user = _b.sent();
                if (!(user.affected === 1)) return [3 /*break*/, 4];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).findOne(id)];
            case 3:
                updatedUserCredentials = _b.sent();
                result = {
                    message: 'User updated!',
                    credentials: {
                        name: updatedUserCredentials === null || updatedUserCredentials === void 0 ? void 0 : updatedUserCredentials.name,
                        email: updatedUserCredentials === null || updatedUserCredentials === void 0 ? void 0 : updatedUserCredentials.email,
                    },
                };
                return [2 /*return*/, response.json(result)];
            case 4: return [2 /*return*/, response.status(404).json({ message: 'User not updated' })];
        }
    });
}); };
exports.updateUserById = updateUserById;
var deleteUserById = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).delete(id)];
            case 1:
                user = _a.sent();
                if (user.affected === 1) {
                    return [2 /*return*/, response.json({ message: 'User Deleted!' })];
                }
                return [2 /*return*/, response.status(404).json({ message: 'User not updated' })];
        }
    });
}); };
exports.deleteUserById = deleteUserById;
var getUsers = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.default).find()];
            case 1:
                users = _a.sent();
                users.map(function (user) {
                    user.password = '';
                });
                response.json(users);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getUserById = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).findOne({
                        where: id,
                    })];
            case 1:
                user = _a.sent();
                result = {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    email: user === null || user === void 0 ? void 0 : user.email,
                };
                response.json(result);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var updateFavoritesComicsByUserId = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, updatedFavoriteComic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).update(id, request.body)];
            case 1:
                user = _a.sent();
                if (!(user.affected === 1)) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).findOne(id)];
            case 2:
                updatedFavoriteComic = _a.sent();
                return [2 /*return*/, response.json(updatedFavoriteComic)];
            case 3: return [2 /*return*/, response.status(404).json({ message: 'FavoriteComic not updated' })];
        }
    });
}); };
exports.updateFavoritesComicsByUserId = updateFavoritesComicsByUserId;
var updateFavoritesCharactersByUserId = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, updatedFavoriteCharacters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).update(id, request.body)];
            case 1:
                user = _a.sent();
                if (!(user.affected === 1)) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).findOne(id)];
            case 2:
                updatedFavoriteCharacters = _a.sent();
                return [2 /*return*/, response.json(updatedFavoriteCharacters)];
            case 3: return [2 /*return*/, response.status(404).json({ message: 'FavoriteComic not updated' })];
        }
    });
}); };
exports.updateFavoritesCharactersByUserId = updateFavoritesCharactersByUserId;
var getFavoritesComicsByUserId = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).findOne({
                        where: id,
                    })];
            case 1:
                user = _a.sent();
                result = {
                    favoriteComics: user === null || user === void 0 ? void 0 : user.favoriteComics,
                };
                response.json(result);
                return [2 /*return*/];
        }
    });
}); };
exports.getFavoritesComicsByUserId = getFavoritesComicsByUserId;
var getFavoritesCharactersByUserId = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.default).findOne({
                        where: id,
                    })];
            case 1:
                user = _a.sent();
                result = {
                    favoriteCharacters: user === null || user === void 0 ? void 0 : user.favoriteCharacters,
                };
                response.json(result);
                return [2 /*return*/];
        }
    });
}); };
exports.getFavoritesCharactersByUserId = getFavoritesCharactersByUserId;
