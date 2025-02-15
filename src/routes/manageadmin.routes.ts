import express from 'express';
import middleware from '../middleware';
import manageAdmin_Controller from '../controllers/manageadmin.controller';

const rout_Manageadmin = express.Router();

rout_Manageadmin.post("/createAdmin", middleware.middlewareCenter,manageAdmin_Controller.createAdmin)

rout_Manageadmin.get("/getAdmin", middleware.middlewareCenter,manageAdmin_Controller.getAdmin)

rout_Manageadmin.post("/loginAdmin", middleware.middlewareCenter,manageAdmin_Controller.loginAdmin)

// rout_Role.get("/getRole", middleware.middlewareCenter,role_Controller.getRole)


export default rout_Manageadmin;