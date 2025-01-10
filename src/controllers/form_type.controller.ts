import { Request, Response } from "express"
import Form_type from "../models/form_type"
import { where } from "sequelize"

class from_typeController{
    async getFormType(req: Request, res: Response){
        try {
                        const data = await Form_type.findAll({  })
                        res.status(200).send({ msg: "getFormType Success", res: data })
        } catch (error) {
            console.log("Error At getFormType ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
export default new from_typeController()