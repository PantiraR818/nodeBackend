import express from 'express';
import middleware from '../middleware';
import Option_Controller from '../controllers/option.controller';
import save_dataController from '../controllers/save_data.controller';
import question_selectController from '../controllers/question_select.controller';

const rout_Question_select = express.Router();



export default rout_Question_select;