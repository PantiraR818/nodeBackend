import express from 'express';
import middleware from '../middleware';
import Status_userController from '../controllers/status_user.controller';

const rout_StatusUser = express.Router();

rout_StatusUser.get("/getStatusUser", middleware.middlewareCenter,Status_userController.getstatususer)


export default rout_StatusUser;