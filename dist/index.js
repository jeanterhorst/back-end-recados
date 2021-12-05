"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.port || 2222;
app.listen(port, () => {
    console.log(`Porta Funcionando ${port}`);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
