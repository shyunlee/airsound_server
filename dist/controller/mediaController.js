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
exports.deleteMood = exports.editMood = exports.saveMood = exports.getAllMedia = void 0;
const mediaRepository = __importStar(require("../data/media"));
const getAllMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield mediaRepository.getAllVideos();
    const sounds = yield mediaRepository.getAllSounds();
    const moods = req.userId ? yield mediaRepository.getMoodsByUser(req.userId) : [];
    res.status(200).json({ message: 'ok', data: { moods, videos, sounds } });
});
exports.getAllMedia = getAllMedia;
// export const getAllVideos = (req: Request, res: Response) => {
//   res.status(200).json({messae: 'ok'})
// }
// export const getAllSounds = (req: Request, res: Response) => {
//   res.status(200).json({messae: 'ok'})
// }
const saveMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        return res.status(400).json({ message: 'member only' });
    }
    try {
        const userId = req.userId;
        const { title, timer, videoId, sounds } = req.body;
        const moodId = yield mediaRepository.insertOnMood({ userId, title, timer, videoId });
        const result = yield mediaRepository.insertOnMoodSound({ moodId, sounds });
        res.status(200).json({ message: 'ok', data: moodId });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'something went wrong' });
    }
});
exports.saveMood = saveMood;
const editMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        return res.status(400).json({ message: 'member only' });
    }
    try {
        const userId = req.userId;
        const { moodId, title, timer, videoId, sounds } = req.body;
        const response = yield mediaRepository.editOnMood({ userId, moodId, title, timer, videoId });
        if (response[0] !== 0) {
            const result = yield mediaRepository.editOnMoodSound({ moodId, sounds });
            return res.status(200).json({ messae: 'ok', data: result });
        }
        res.status(400).json({ messae: 'something went wrong' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'something went wrong' });
    }
});
exports.editMood = editMood;
const deleteMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        return res.status(400).json({ message: 'member only' });
    }
    try {
        const moodId = Number(req.params.id);
        const userIdFound = yield mediaRepository.getUserIdByMoodId(moodId);
        if ((userIdFound === null || userIdFound === void 0 ? void 0 : userIdFound.userId) === req.userId) {
            const response = yield mediaRepository.deleteOnMood(moodId);
            const result = yield mediaRepository.deleteOnMoodSound(moodId);
            if (response === 1 && result !== 0) {
                return res.status(200).json({ message: 'ok' });
            }
        }
        res.status(200).json({ message: 'something went wrong' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'something went wrong' });
    }
});
exports.deleteMood = deleteMood;
