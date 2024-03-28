import express from 'express';
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

// SIGNUP FOR THE FIRST TIME ================================
const signupBody = z.object({
    username: z.string().email(),
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	password: z.string().min(6)
  });

router.post('/signup', async (req, res) => {
    const {username, firstName, lastName, password} = req.body;
    const userData = signupBody.safeParse({username, firstName, lastName, password});

    if(!userData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const isUser = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    if(isUser){
        res.status(411).send({
            message: "Email already taken / Incorrect inputs"
        });
        return;
    };
    
    const user = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })

    console.log(user.id);

    const userId = user.id;

    const jwtToken = jwt.sign({userId}, JWT_SECRET);

    // Add redirection to dashboard
    res.status(200).send({
        message: "User created successfully",
        token: jwtToken
    });
});

// SIGN IN IF YOU ALREADY HAVE AN ACCOUNT ================================
// You can use the following zod schema to verify 'signin' inputs
const signinBody = z.object({
    username: z.string().email(),
	password: z.string().min(6)
  });

router.post('/signin', async (req, res) => {
    const {username, password} = req.body;

    const isUser = await prisma.user.findFirst({
        where: {
            username: username,
            password: password
        }
    })
    if(!isUser){
        res.status(411).send({
            message: "Wrong credentials while logging in."
        });
        return;
    };

    const userId = isUser.id;
    // console.log(userId);
    const jwtToken = jwt.sign({userId}, JWT_SECRET);

    // Add redirection to dashboard
    res.status(200).send({
        token: jwtToken
    });
});


export default router;