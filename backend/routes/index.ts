import express from 'express';
import userRouter from './user.js';
import clientRouter from './client.js';

const router = express.Router();

router.use("/user", userRouter)
router.use("/client", clientRouter)

export default router;