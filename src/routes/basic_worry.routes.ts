import express from 'express';
import middleware from '../middleware';
import Basic_worryController from '../controllers/basic_worry.controller';

const rout_Basicworry = express.Router();

rout_Basicworry.get("/getBasicworry", middleware.middlewareCenter,Basic_worryController.getBasicWorry)


export default rout_Basicworry;