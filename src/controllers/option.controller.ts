import { Request, Response } from "express"
import Option from "../models/option"
import { where } from "sequelize"

class Option_Controller{
    async getOption(req: Request, res: Response) {
        try {
            const { formtype_id } = req.params; 
            const data = await Option.findAll({
                where: { formtype_id: Number(formtype_id) },// กรองตาม formtype_id หากมี
            });
            res.status(200).send({ msg: "Getoption Success", res: data });
        } catch (error) {
            console.error("Error At GetOption:", error);
            res.status(500).send({ error: error.message, status: 500 });
        }
    }
    
}
export default new Option_Controller()