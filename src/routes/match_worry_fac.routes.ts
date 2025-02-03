import express from 'express';
import middleware from '../middleware';
import Match_worry_fac_Controller from '../controllers/match_worry_fac.controller';

const rout_Match_worry_fac_ = express.Router();

rout_Match_worry_fac_.post("/getMatchWorryandFac", middleware.middlewareCenter, Match_worry_fac_Controller.getMatch_worry_fac)


export default rout_Match_worry_fac_;