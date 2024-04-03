"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const port = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api/v1", index_js_1.default);
console.log('Dir: ', path_1.default.join(__dirname, '../public'));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
