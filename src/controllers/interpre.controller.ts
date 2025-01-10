import { Request, Response } from "express"
import Interpre from "../models/interpre"
import { where } from "sequelize"

class Interpre_Controller {
    async getInterpre(req: Request, res: Response) {
        try {
            const { formtype_id } = req.params;
            const data = await Interpre.findAll({
                where : { formtype_id : Number(formtype_id)},
            });
            res.status(200).send({ msg: "getinterpre Success", res: data })
        } catch (error) {
            console.log("Error At getInterpre ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
export default new Interpre_Controller()