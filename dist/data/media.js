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
exports.deleteOnMoodSound = exports.deleteOnMood = exports.editOnMoodSound = exports.editOnMood = exports.insertOnMoodSound = exports.insertOnMood = exports.getMoodsByUser = exports.getAllVideos = exports.getAllSounds = void 0;
const sounds_1 = __importDefault(require("../models/sounds"));
const videos_1 = __importDefault(require("../models/videos"));
const moods_1 = __importDefault(require("../models/moods"));
const mood_sounds_1 = __importDefault(require("../models/mood_sounds"));
moods_1.default.belongsTo(videos_1.default, { foreignKey: 'videoId' });
moods_1.default.belongsToMany(sounds_1.default, { through: mood_sounds_1.default });
const getAllSounds = () => __awaiter(void 0, void 0, void 0, function* () {
    return sounds_1.default.findAll({
        attributes: ["id", "title", "srcImage", "srcSound", "volume"]
    });
});
exports.getAllSounds = getAllSounds;
const getAllVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    return videos_1.default.findAll({
        attributes: ["id", "title", "srcImage", "srcVideo"]
    });
});
exports.getAllVideos = getAllVideos;
const getMoodsByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moods_1.default.findAll({
        attributes: [
            "id",
            "title",
            "userId",
            "timer",
        ],
        where: { userId: id },
        include: [
            {
                model: videos_1.default,
                attributes: ["id", "title", "srcImage", "srcVideo"]
            },
            {
                model: sounds_1.default,
                attributes: ["id", "title", "srcImage", "srcSound", "volume"],
                // include: [MoodSoundModel]
            }
        ]
    });
    return result;
});
exports.getMoodsByUser = getMoodsByUser;
const insertOnMood = (mood) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moods_1.default.create(mood);
    return result.id;
});
exports.insertOnMood = insertOnMood;
const insertOnMoodSound = ({ moodId, sounds }) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < sounds.length; i++) {
        yield mood_sounds_1.default.create({
            moodId,
            soundId: sounds[i].soundId,
            customVolume: sounds[i].customVolume
        });
    }
    const result = yield mood_sounds_1.default.findAll({
        attributes: ["id", "moodId", "soundId", "customVolume"],
        where: { moodId }
    });
    return result;
});
exports.insertOnMoodSound = insertOnMoodSound;
const editOnMood = (mood) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, videoId, timer, moodId } = mood;
    const result = yield moods_1.default.update({
        title,
        videoId,
        timer
    }, {
        where: { id: moodId }
    });
    return result;
});
exports.editOnMood = editOnMood;
const editOnMoodSound = ({ moodId, sounds }) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield (0, exports.deleteOnMoodSound)(moodId);
    const result = yield (0, exports.insertOnMoodSound)({ moodId, sounds });
    return result;
});
exports.editOnMoodSound = editOnMoodSound;
const deleteOnMood = (moodId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield moods_1.default.destroy({
        where: {
            id: moodId
        }
    });
});
exports.deleteOnMood = deleteOnMood;
const deleteOnMoodSound = (moodId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield mood_sounds_1.default.destroy({
        where: {
            moodId
        }
    });
});
exports.deleteOnMoodSound = deleteOnMoodSound;
