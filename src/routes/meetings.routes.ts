import express from 'express';
import middleware from '../middleware';
import Basic_worryController from '../controllers/interpre.controller';
import interpreController from '../controllers/interpre.controller';
import meetingsController from '../controllers/meetings.controller';

const rout_Meetings = express.Router();

rout_Meetings.post("/createMeeting", middleware.middlewareCenter,meetingsController.createMeeting)

rout_Meetings.get("/getMeeting", middleware.middlewareCenter,meetingsController.getDetailMeeting)


export default rout_Meetings;