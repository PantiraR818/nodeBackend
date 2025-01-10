import { Request, Response } from "express"
import Status_user from "../models/status_user"
import { where } from "sequelize"

class Status_userController{
    async getstatususer(req: Request, res: Response){
        try {
            //   const { nameType, max_score,	min_score } = req.body
                        const data = await Status_user.findAll({  })
                        res.status(200).send({ msg: "getstatususery Success", res: data })
        } catch (error) {
            console.log("Error At getstatususer ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
export default new Status_userController()