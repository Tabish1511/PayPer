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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// import jwt from 'jsonwebtoken';
const jose = __importStar(require("jose")); // <<== THIS IS WHERE YOU NEED TO MAKE THE CHANGES
// import dotenv from 'dotenv';
// dotenv.config();
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//     throw new Error('JWT_SECRET is not defined in the environment variables.');
// }
// SIGNUP FOR THE FIRST TIME ================================
const signupBody = zod_1.z.object({
    username: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(3),
    lastName: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6)
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, firstName, lastName, password } = req.body;
    const userData = signupBody.safeParse({ username, firstName, lastName, password });
    if (!userData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const isUser = yield prisma.user.findFirst({
        where: {
            username: username
        }
    });
    if (isUser) {
        res.status(411).send({
            message: "Email already taken / Incorrect inputs"
        });
        return;
    }
    ;
    const user = yield prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    });
    console.log(user.id);
    const userId = user.id;
    // const jwtToken = jwt.sign({userId}, JWT_SECRET);
    const jwtToken = yield new jose.SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(JWT_SECRET));
    // Add redirection to dashboard
    res.status(200).send({
        message: "User created successfully",
        token: jwtToken
    });
}));
// SIGN IN IF YOU ALREADY HAVE AN ACCOUNT ================================
// You can use the following zod schema to verify 'signin' inputs
const signinBody = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const isUser = yield prisma.user.findFirst({
        where: {
            username: username,
            password: password
        }
    });
    if (!isUser) {
        res.status(411).send({
            message: "Wrong credentials while logging in."
        });
        return;
    }
    ;
    const userId = isUser.id;
    // const jwtToken = jwt.sign({userId}, JWT_SECRET);
    const jwtToken = yield new jose.SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(JWT_SECRET));
    // Add redirection to dashboard
    res.status(200).send({
        token: jwtToken
    });
}));
exports.default = router;
