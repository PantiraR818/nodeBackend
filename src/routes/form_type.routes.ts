import express from 'express';
import acc_userController from '../controllers/form_type.controller';
import middleware from '../middleware';
import form_typeController from '../controllers/form_type.controller';

const routForm_type = express.Router();

routForm_type.get("/getFormType", middleware.middlewareCenter,form_typeController.getFormType)


export default routForm_type;