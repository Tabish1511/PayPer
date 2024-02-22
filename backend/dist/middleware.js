"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Unauthorized - Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default);
        if (!decoded) {
            return res.status(404).json({ error: 'token verification unsuccessful' });
        }
        // console.log("Below is the decoded info");
        // console.log(decoded);
        req.userId = decoded.userId;
        // console.log(decoded.userId)
        // console.log((req as CustomRequest).userId);
        next();
    }
    catch (err) {
        return res.status(403).json({});
    }
}
exports.authMiddleware = authMiddleware;
// ADD MIDDLEWARE FOR WHEN CHANGES MADE/PAYMENT MADE/CLIENT DELETION/CREATION EMAIL/MESSAGE SENT TO OWNER EMAIL (THE ONE THEY SIGNED UP WITH)
