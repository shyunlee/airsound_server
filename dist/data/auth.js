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
exports.editUserInfo = exports.createUser = exports.getByEmail = exports.getByUsername = exports.getById = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const users_1 = __importDefault(require("../models/users"));
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.default.findByPk(id);
});
exports.getById = getById;
const getByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.default.findOne({ where: { username } });
});
exports.getByUsername = getByUsername;
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.default.findOne({ where: { email } });
});
exports.getByEmail = getByEmail;
const createUser = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    return users_1.default.create(userInfo).then(user => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            srcImage: user.srcImage
        };
    });
});
exports.createUser = createUser;
const editUserInfo = (id, edit) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(edit);
    const username = edit.username && edit.username;
    const email = edit.email && edit.email;
    const currentPassword = edit.currentPassword && edit.currentPassword;
    const newPassword = edit.newPassword && edit.newPassword;
    const srcImage = edit.srcImage && edit.srcImage;
    return users_1.default.findByPk(id).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        user = user;
        let message = 'update completed';
        if (srcImage) {
            user.srcImage = srcImage;
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (newPassword) {
            const isMatched = yield bcrypt_1.default.compare(currentPassword, user.password);
            if (isMatched) {
                user.password = yield bcrypt_1.default.hash(newPassword, config_1.config.bcrypt.saltRounds);
            }
            else {
                message = 'password unmatched';
            }
        }
        return user.save().then(user => ({ id: user.id, username: user.username, email: user.email, srcImage: user.srcImage, message }));
    }));
});
exports.editUserInfo = editUserInfo;
