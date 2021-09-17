"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const database_js_1 = require("./db/database.js");
const auth_1 = __importDefault(require("./router/auth"));
const media_1 = __importDefault(require("./router/media"));
const setting_1 = __importDefault(require("./router/setting"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/auth', auth_1.default);
app.use('/media', media_1.default);
app.use('/setting', setting_1.default);
database_js_1.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log('DB connected');
        console.log('server is on 8080');
    });
});
