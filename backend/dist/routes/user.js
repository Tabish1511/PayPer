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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = __importDefault(require("../config.js"));
// import { authMiddleware } from '../middleware.js';
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
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
    const jwtToken = jsonwebtoken_1.default.sign({ userId }, config_js_1.default);
    // Add redirection to dashboard
    res.status(200).send({
        message: "User created successfully",
        token: jwtToken
    });
    // Send the redirect URL along with the response
    // res.status(200).send({
    //     message: "User created successfully",
    //     token: jwtToken,
    //     redirectURL: '/dashboard' // Include the redirect URL
    // });
}));
// SIGN IN IF YOU ALREADY HAVE AN ACCOUNT ================================
// You can use the following zod schema to verify 'signin' inputs
const signinBody = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // const userData = signinBody.parse({username, password});
    // console.log(req.headers.authorization);
    const isUser = yield prisma.user.findFirst({
        where: {
            username: username,
            password: password
        }
    });
    if (!isUser) {
        res.status(411).send({
            message: "Error while logging in."
        });
        return;
    }
    ;
    const userId = isUser.id;
    console.log(userId);
    const jwtToken = jsonwebtoken_1.default.sign({ userId }, config_js_1.default);
    // Add redirection to dashboard
    res.status(200).send({
        token: jwtToken
    });
    // Send the redirect URL along with the response
    // res.status(200).send({
    //     message: "User created successfully",
    //     token: jwtToken,
    //     redirectURL: '/dashboard' // Include the redirect URL
    // });
}));
exports.default = router;
