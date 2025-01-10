import express from 'express';
import middleware from '../middleware';
import Basic_worryController from '../controllers/interpre.controller';
import interpreController from '../controllers/interpre.controller';

const rout_Interpre = express.Router();

rout_Interpre.get("/getInterpre/:formtype_id", middleware.middlewareCenter,interpreController.getInterpre)


export default rout_Interpre;