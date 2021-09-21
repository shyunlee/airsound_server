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
exports.getMoodsByUser = exports.getAllVideos = exports.getAllSounds = void 0;
const sounds_1 = __importDefault(require("../models/sounds"));
const videos_1 = __importDefault(require("../models/videos"));
const moods_1 = __importDefault(require("../models/moods"));
const mood_sounds_1 = __importDefault(require("../models/mood_sounds"));
moods_1.default.belongsTo(videos_1.default, { foreignKey: 'videoId' });
moods_1.default.belongsToMany(sounds_1.default, { through: mood_sounds_1.default });
const getAllSounds = () => __awaiter(void 0, void 0, void 0, function* () {
    return sounds_1.default.findAll();
});
exports.getAllSounds = getAllSounds;
const getAllVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    return videos_1.default.findAll();
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
            }
        ]
    });
    return result;
});
exports.getMoodsByUser = getMoodsByUser;
