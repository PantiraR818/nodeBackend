import express from 'express';
import middleware from '../middleware';
import Option_Controller from '../controllers/option.controller';

const rout_Option = express.Router();

rout_Option.get("/getOption/:formtype_id", middleware.middlewareCenter,Option_Controller.getOption)


export default rout_Option;