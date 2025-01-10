import { Request, Response } from "express"
import Interpre from "../models/interpre"
import { where } from "sequelize"
import Guidance from "../models/guidance"


class Guidance_Controller {
    async getGuidance(req: Request, res: Response) {
            try {
                const { formtype_id } = req.params;
                const data = await Guidance.findAll({
                    where : { formtype_id : Number(formtype_id)},
                });
                res.status(200).send({ msg: "get Guidance Success", res: data })
            } catch (error) {
                console.log("Error At get Guidance ", error)
                res.status(500).send({ error: error, status: 500 })
            }
        }
    }
export default new Guidance_Controller()