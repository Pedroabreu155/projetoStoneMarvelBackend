"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var UserController_1 = require("../controllers/UserController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var routes = express_1.Router();
routes.get('/', function (request, response) {
    return response.json({ message: 'Hello World' });
});
routes.post('/signup', UserController_1.createUser);
routes.get('/users', UserController_1.getUsers);
routes.post('/login', AuthController_1.login);
routes.post('/reset-password', UserController_1.resetPassword);
//Authenticated Routes//
routes.get('/users/:id', authMiddleware_1.auth, UserController_1.getUserById);
routes.put('/users/edit-user/:id', authMiddleware_1.auth, UserController_1.updateUserById);
routes.delete('/users/delete-user/:id', authMiddleware_1.auth, UserController_1.deleteUserById);
routes.get('/users/favorites-comics/:id', authMiddleware_1.auth, UserController_1.getFavoritesComicsByUserId);
routes.get('/users/favorites-characters/:id', authMiddleware_1.auth, UserController_1.getFavoritesCharactersByUserId);
routes.put('/users/edit-favorite-comics/:id', authMiddleware_1.auth, UserController_1.updateFavoritesComicsByUserId);
routes.put('/users/edit-favorite-characters/:id', UserController_1.updateFavoritesCharactersByUserId);
exports.default = routes;
