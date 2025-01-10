import { Request, Response } from "express"
import Basic_worry from "../models/basic_worry"
import { where } from "sequelize"

class Basic_worryController{
    async getBasicWorry(req: Request, res: Response){
        try {
            //   const { nameType, max_score,	min_score } = req.body
                        const data = await Basic_worry.findAll({  })
                        res.status(200).send({ msg: "getBasicWorry Success", res: data })
        } catch (error) {
            console.log("Error At getBasicWorry ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
export default new Basic_worryController()