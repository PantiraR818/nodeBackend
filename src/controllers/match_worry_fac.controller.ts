import { Request, Response } from "express"
import Interpre from "../models/interpre"
import { where } from "sequelize"
import match_worry_fac from "../models/match_worry_fac"
import faculties from "../models/faculties"


class Match_worry_fac_Controller {
    async getMatch_worry_fac(req: Request, res: Response) {
        try {
            const data = await match_worry_fac.findAll({ 
                where: { basic_worry_id: req.params.basic_worry_id } ,
                include:{
                    model:faculties 
                }
            })
            res.status(200).send({ msg: "get Match worry fac and col Success", res: data })
        } catch (error) {
            console.log("Error At getInterpre ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
export default new Match_worry_fac_Controller()