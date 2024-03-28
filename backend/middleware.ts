import jwt from 'jsonwebtoken';
// import JWT_SECRET from './config';
import { NextFunction, Request,Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export const config = {
  runtime: "edge",
  unstable_allowDynamic: [
      '**/node_modules/lodash/**/*.js',
 ],
};

interface JwtPayload {
  userId: number;
  iat: number;
}

export interface CustomRequest extends Request {
  userId: number;
}


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | void;
      if (!decoded || typeof decoded !== 'object') {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }
      (req as CustomRequest).userId = decoded.userId;
      next();
  } catch (err) {
      console.error('JWT verification error:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }
}






























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