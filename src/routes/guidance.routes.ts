import express from 'express';
import acc_userController from '../controllers/acc_user.controller';
import middleware from '../middleware';
import guidanceController from '../controllers/guidance.controller';


const rout_Guidance = express.Router();

// เปลี่ยน path , เปลี่ยน function

rout_Guidance.get("/getGuidance/:formtype_id",middleware.middlewareCenter,guidanceController.getGuidance)

export default rout_Guidance;