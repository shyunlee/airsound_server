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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserInfo = exports.createUser = exports.getByUsername = exports.getById = void 0;
const users_1 = __importDefault(require("../models/users"));
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.default.findByPk(id);
});
exports.getById = getById;
const getByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.default.findOne({ where: { username } });
});
exports.getByUsername = getByUsername;
const createUser = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.default.create(userInfo);
});
exports.createUser = createUser;
const editUserInfo = (id, edit) => __awaiter(void 0, void 0, void 0, function* () {
    const username = edit.username && edit.username;
    const email = edit.email && edit.email;
    const password = edit.password && edit.password;
    const src_image = edit.src_image && edit.src_image;
    return users_1.default.findByPk(id).then((user) => {
        user = user;
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        if (src_image) {
            user.src_image = src_image;
        }
        return user.save();
    });
});
exports.editUserInfo = editUserInfo;
