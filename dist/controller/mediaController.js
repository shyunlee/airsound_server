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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMood = exports.editMood = exports.saveMood = exports.getAllSounds = exports.getAllVideos = exports.getAllMedia = void 0;
const mediaRepository = __importStar(require("../data/media"));
const getAllMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield mediaRepository.getAllVideos();
    const sounds = yield mediaRepository.getAllSounds();
    if (!req.userId) {
        return res.status(200).json({ messae: 'ok', data: { videos, sounds } });
    }
    const moods = yield mediaRepository.getMoodsByUser(req.userId);
    res.status(200).json({ messae: 'ok', data: { moods, videos, sounds } });
});
exports.getAllMedia = getAllMedia;
const getAllVideos = (req, res) => {
    res.status(200).json({ messae: 'ok' });
};
exports.getAllVideos = getAllVideos;
const getAllSounds = (req, res) => {
    res.status(200).json({ messae: 'ok' });
};
exports.getAllSounds = getAllSounds;
const saveMood = (req, res) => {
    res.status(200).json({ messae: 'ok' });
};
exports.saveMood = saveMood;
const editMood = (req, res) => {
    res.status(200).json({ messae: 'ok' });
};
exports.editMood = editMood;
const deleteMood = (req, res) => {
    res.status(200).json({ messae: 'ok' });
};
exports.deleteMood = deleteMood;
