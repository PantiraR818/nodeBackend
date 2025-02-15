import express from 'express';
import middleware from '../middleware';
import Option_Controller from '../controllers/option.controller';
import save_dataController from '../controllers/save_data.controller';

const rout_Save_data = express.Router();

rout_Save_data.get("/getSaveData", middleware.middlewareCenter,save_dataController.getData)

rout_Save_data.post("/save_data", middleware.middlewareCenter,save_dataController.save_data)

rout_Save_data.get("/getHistory/:id_student", middleware.middlewareCenter,save_dataController.getHistory)

rout_Save_data.get("/getResult/:formtype_id", middleware.middlewareCenter,save_dataController.getResult)

rout_Save_data.get("/getchart/:formtype_id/:acc_id", middleware.middlewareCenter,save_dataController.getchart)

rout_Save_data.get("/getNoti/:acc_id", middleware.middlewareCenter,save_dataController.getNoti)

export default rout_Save_data;