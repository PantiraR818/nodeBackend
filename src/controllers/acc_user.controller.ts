import { Request, Response } from "express"
import Acc_user from "../models/acc_user"
import { where } from "sequelize"
// step 1
class acc_userController {
    // step 3
    async loginAndCreate(req: Request, res: Response) {
        try {
            const { email, uid } = req.body
            const data = await Acc_user.create({ email, uid })
            res.status(200).send({ msg: "Create Success", res: data })
        } catch (error) {
            console.log("Error At loginAndCreate ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { email, name, id_student, birthday, gender, faculty, phone } = req.body
            const data = await Acc_user.update(
                // update อะไร และ ที่ไหน 
                {
                    name,
                    id_student,
                    birthday,
                    gender,
                    faculty,
                    phone
                },
                {
                    where: {
                        email: email
                    }
                }
            )
            res.status(200).send({ msg: "Update Success", res: data })

        } catch (error) {
            console.log("Error At update ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }


    async getAccUser(req: Request, res: Response) {
        try {
            const data = await Acc_user.findAll({})
            res.status(200).send({ msg: "get Acc_User Success", res: data })
        } catch (error) {
            console.log("Error At get Acc_User ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
// step 2 
export default new acc_userController()