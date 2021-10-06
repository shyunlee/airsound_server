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
exports.me = exports.logout = exports.googleLogin = exports.githubLogin = exports.login = exports.signup = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRepository = __importStar(require("../data/auth"));
const config_1 = require("../config/config");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield authRepository.getByEmail(req.body.email, 'web');
    if (userFound) {
        return res.status(409).json({ message: 'user aleady registerd' });
    }
    const hashed = yield bcrypt_1.default.hash(req.body.password, config_1.config.bcrypt.saltRounds);
    const userInfo = Object.assign(Object.assign({}, req.body), { password: hashed, authProvider: 'web' });
    const userCreated = yield authRepository.createUser(userInfo);
    const token = createToken(userCreated.id);
    setToken(res, token);
    res.status(200).json({ message: 'ok', data: userCreated });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield authRepository.getByEmail(req.body.email, 'web');
    if (userFound) {
        const verified = yield bcrypt_1.default.compare(req.body.password, userFound.password);
        if (verified) {
            const token = createToken(userFound.id);
            const userInfo = {
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
                srcImage: userFound.srcImage,
            };
            setToken(res, token);
            return res.status(200).json({ message: 'ok', data: userInfo });
        }
    }
    res.status(406).json({ message: 'login failed' });
});
exports.login = login;
const githubLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authCode = req.body.authCode;
    const queryString = qs_1.default.stringify({
        client_id: config_1.config.github.clientID,
        client_secret: config_1.config.github.secretKey,
        code: authCode,
        redirect_uri: config_1.config.oAuth.redirectURI
    });
    const authRequestUrl = `https://github.com/login/oauth/access_token?${queryString}`;
    const response = yield axios_1.default.post(authRequestUrl);
    if (response.status === 200) {
        const accessToken = response.data.split('=')[1].split('&')[0];
        const userFound = yield axios_1.default.get('https://api.github.com/user', {
            headers: {
                Accept: 'application/json',
                Authorization: `token ${accessToken}`
            }
        }).then(result => result.data);
        const userInfo = {
            username: userFound.name,
            email: userFound.email,
            srcImage: userFound.avatar_url,
            authProvider: 'github',
            createdAt: new Date()
        };
        const userRegistered = yield authRepository.getByEmail(userInfo.email, 'github');
        let userResponse;
        if (!userRegistered) {
            userResponse = yield authRepository.createUser(userInfo);
        }
        else {
            userResponse = {
                id: userRegistered.id,
                username: userRegistered.username,
                email: userRegistered.email,
                srcImage: userRegistered.srcImage,
            };
        }
        const token = createToken(userResponse.id);
        setToken(res, token);
        res.status(200).json({ message: 'ok', data: userResponse });
    }
});
exports.githubLogin = githubLogin;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authCode = req.body.authCode;
    const queryString = qs_1.default.stringify({
        code: authCode,
        client_id: config_1.config.google.clientID,
        client_secret: config_1.config.google.secretKey,
        grant_type: 'authorization_code',
        redirect_uri: config_1.config.oAuth.redirectURI
    });
    const authRequestUrl = `https://oauth2.googleapis.com/token?${queryString}`;
    const response = yield axios_1.default.post(authRequestUrl, null);
    const accessToken = response.data.access_token;
    const userFound = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`).then(result => result.data);
    const userRegistered = yield authRepository.getByEmail(userFound.email, 'google');
    let userResponse;
    if (!userRegistered) {
        const userInfo = {
            username: userFound.name,
            email: userFound.email,
            srcImage: userFound.picture,
            authProvider: 'google',
            createdAt: new Date()
        };
        userResponse = yield authRepository.createUser(userInfo);
    }
    else {
        userResponse = {
            id: userRegistered.id,
            username: userRegistered.username,
            email: userRegistered.email,
            srcImage: userRegistered.srcImage,
        };
    }
    const token = createToken(userResponse.id);
    setToken(res, token);
    res.status(200).json({ message: 'ok', data: userResponse });
});
exports.googleLogin = googleLogin;
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
    const response = {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        srcImage: userFound.srcImage,
    };
    res.status(200).json({ message: 'ok', data: response });
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
    res.cookie('token', token);
};
