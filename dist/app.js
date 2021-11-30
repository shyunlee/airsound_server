"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./middleware/auth");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const database_js_1 = require("./db/database.js");
const auth_2 = __importDefault(require("./router/auth"));
const media_1 = __importDefault(require("./router/media"));
const setting_1 = __importDefault(require("./router/setting"));
const config_1 = require("./config/config");
// import path from 'path'
const app = (0, express_1.default)();
const corsOption = {
    origin: config_1.config.cors.allowOrigin,
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsOption));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/auth', auth_2.default);
app.use('/media', auth_1.isMember, media_1.default);
app.use('/setting', setting_1.default);
// app.use('/', express.static(__dirname + '/build'));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});
database_js_1.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log('DB connected');
        console.log('server is on 8080');
    });
});
