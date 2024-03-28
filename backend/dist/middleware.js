"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.config = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}
exports.config = {
    runtime: "edge",
    unstable_allowDynamic: [
        '**/node_modules/lodash/**/*.js',
    ],
};
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded || typeof decoded !== 'object') {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.error('JWT verification error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
exports.authMiddleware = authMiddleware;
// export function authMiddleware(req:Request, res:Response, next:NextFunction){
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(403).json({ error: 'Unauthorized - Missing or invalid token' });
//   }
//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     if(!decoded){
//         return res.status(404).json({ error: 'token verification unsuccessful' });
//     }
//     // console.log("Below is the decoded info");
//     // console.log(decoded);
//     (req as CustomRequest).userId = decoded.userId;
//     // console.log(decoded.userId)
//     // console.log((req as CustomRequest).userId);
//     next();
//     } catch (err) {
//         return res.status(403).json({});
//     }
// } 
// ADD MIDDLEWARE FOR WHEN CHANGES MADE/PAYMENT MADE/CLIENT DELETION/CREATION EMAIL/MESSAGE SENT TO OWNER EMAIL (THE ONE THEY SIGNED UP WITH)
