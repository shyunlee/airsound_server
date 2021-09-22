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
exports.isMember = exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const authRepository = __importStar(require("../data/auth"));
const isAuth = (req, res, next) => {
    let token;
    const auth = req.get('Authorization');
    if (auth && auth.startsWith('Bearer ')) {
        token = auth.split(' ')[1];
    }
    if (!token) {
        token = req.cookies['token'];
    }
    if (!token) {
        return res.status(404).json({ message: 'invalid token' });
    }
    const jwtCallBack = (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Authentication Error_1' });
        }
        const userFound = yield authRepository.getById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
        if (!userFound) {
            return res.status(401).json({ message: 'Authentication Error_2' });
        }
        req.userId = userFound.id;
        req.token = token;
        next();
    });
    jsonwebtoken_1.default.verify(token, config_1.config.jwt.secretKey, jwtCallBack);
};
exports.isAuth = isAuth;
const isMember = (req, res, next) => {
    let token;
    const auth = req.get('Authorization');
    if (auth && auth.startsWith('Bearer ')) {
        token = auth.split(' ')[1];
    }
    if (!token) {
        token = req.cookies['token'];
    }
    if (!token) {
        return next();
    }
    const jwtCallBack = (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Authentication Error_3' });
        }
        const userFound = yield authRepository.getById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
        if (!userFound) {
            return res.status(401).json({ message: 'Authentication Error_4' });
        }
        req.userId = userFound.id;
        req.token = token;
        next();
    });
    jsonwebtoken_1.default.verify(token, config_1.config.jwt.secretKey, jwtCallBack);
};
exports.isMember = isMember;
