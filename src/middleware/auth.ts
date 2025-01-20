// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// function authenticateToken(req: Request, res: Response, next: NextFunction): void {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         res.status(401).send({ msg: 'Access Denied. No Token Provided.' });
//     }

//     try {
//         const token = authHeader.split(' ')[1];
//         const payload = jwt.verify(token, process.env.secret!); // ใช้เครื่องหมาย ! เพื่อยืนยันว่า secret ไม่เป็น null หรือ undefined
//         req.user = payload; // เก็บข้อมูล payload ใน req.user
//         next(); // เรียก middleware ถัดไป
//     } catch (error) {
//         res.status(403).send({ msg: 'Invalid Token' });
//     }
// }

// export default authenticateToken;
