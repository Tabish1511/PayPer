"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// import jwt from 'jsonwebtoken';
const jose = __importStar(require("jose")); // <<== THIS IS WHERE YOU NEED TO MAKE THE CHANGES
const jose_1 = require("jose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
        }
        const token = authHeader.split(' ')[1];
        try {
            // Verify the token using 'jose' library
            const { payload } = yield jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
            if (!payload || typeof payload !== 'object') {
                return res.status(401).json({ error: 'Unauthorized - Invalid token' });
            }
            //@ts-ignore
            req.userId = payload.userId;
            next();
        }
        catch (err) {
            if (err instanceof jose_1.errors.JWTExpired) {
                return res.status(401).json({ error: 'Unauthorized - Token expired' });
            }
            console.error('JWT verification error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.authMiddleware = authMiddleware;
// https://stackoverflow.com/questions/71851464/nextjs-build-failing-because-of-jsonwebtoken-in-middleware-ts
// https://www.npmjs.com/search?q=jwt
// https://www.youtube.com/watch?v=CNJkX9rYI8U
// import jwt from 'jsonwebtoken';
// import * as jose from 'jose'; // <<== THIS IS WHERE YOU NEED TO MAKE THE CHANGES
// // import JWT_SECRET from './config';
// import { NextFunction, Request,Response } from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
// if (!JWT_SECRET) {
//   throw new Error('JWT_SECRET is not defined in the environment variables.');
// }
// // export const config = {
// //   runtime: "edge",
// //   unstable_allowDynamic: [
// //       '**/node_modules/lodash/**/*.js',
// //  ],
// // };
// interface JwtPayload {
//   userId: number;
//   iat: number;
// }
// export interface CustomRequest extends Request {
//   userId: number;
// }
// export function authMiddleware(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
//   }
//   const token = authHeader.split(' ')[1];
//   try {
//       const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | void;
//       if (!decoded || typeof decoded !== 'object') {
//         return res.status(401).json({ error: 'Unauthorized - Invalid token' });
//       }
//       (req as CustomRequest).userId = decoded.userId;
//       next();
//   } catch (err) {
//       console.error('JWT verification error:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//   }
// }
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
