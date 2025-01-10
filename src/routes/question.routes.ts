import express from 'express';
import middleware from '../middleware';
import Question_Controller from '../controllers/queston.controller';

const rout_Question = express.Router();

    rout_Question.get("/getQuestion/:formtype_id", middleware.middlewareCenter,Question_Controller.getQuestion)


export default rout_Question;