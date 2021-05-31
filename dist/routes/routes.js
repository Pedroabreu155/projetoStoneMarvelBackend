"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var routes = express_1.Router();
routes.get('/', function (request, response) {
    return response.json({ message: 'Hello World' });
});
routes.post('/users', UserController_1.createUser);
routes.get('/users', UserController_1.getUsers);
routes.get('/users/:id', UserController_1.getUserById);
routes.put('/users/edit-user/:id', UserController_1.updateUserById);
routes.delete('/users/delete-user/:id', UserController_1.deleteUserById);
routes.get('/users/favorites-comics/:id', UserController_1.getFavoritesComicsByUserId);
routes.get('/users/favorites-characters/:id', UserController_1.getFavoritesCharactersByUserId);
routes.put('/users/edit-favorite-comics/:id', UserController_1.updateFavoritesComicsByUserId);
routes.put('/users/edit-favorite-characters/:id', UserController_1.updateFavoritesCharactersByUserId);
exports.default = routes;
