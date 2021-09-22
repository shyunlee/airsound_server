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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRepository = __importStar(require("../data/auth"));
const config_1 = require("../config/config");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield authRepository.getByEmail(req.body.email);
    if (userFound) {
        return res.status(400).json({ message: 'user aleady registerd' });
    }
    const hashed = yield bcrypt_1.default.hash(req.body.password, config_1.config.bcrypt.saltRounds);
    const userInfo = Object.assign(Object.assign({}, req.body), { password: hashed });
    const id = yield authRepository.createUser(userInfo);
    const token = createToken(id);
    setToken(res, token);
    res.status(200).json({ message: 'ok', data: { id, token } });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield authRepository.getByEmail(req.body.email);
    if (userFound) {
        const verified = yield bcrypt_1.default.compare(req.body.password, userFound.password);
        if (verified) {
            const token = createToken(userFound.id);
            const userInfo = {
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
                srcImage: userFound.srcImage,
                token: token
            };
            setToken(res, token);
            return res.status(200).json({ message: 'ok', data: { userInfo } });
        }
    }
    res.status(400).json({ message: 'login failed' });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', '');
    res.status(200).json({ message: 'ok' });
});
exports.logout = logout;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield authRepository.getById(req.userId);
    if (!userFound) {
        return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json({ message: 'ok', data: { id: userFound.id, token: req.token } });
});
exports.me = me;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, config_1.config.jwt.secretKey, { expiresIn: config_1.config.jwt.expiredInSec });
};
const setToken = (res, token) => {
    const options = {
        maxAge: config_1.config.jwt.expiredInSec * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    };
    res.cookie('token', token, options);
};
