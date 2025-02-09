import express from 'express';
import middleware from '../middleware';
import role_Controller from '../controllers/role.controller';

const rout_Role = express.Router();

rout_Role.post("/createrole", middleware.middlewareCenter,role_Controller.createRole)

rout_Role.get("/getRole", middleware.middlewareCenter,role_Controller.getRole)


export default rout_Role;