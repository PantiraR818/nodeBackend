import { Request, Response } from "express"
import Acc_user from "../models/acc_user"
// import jwt from 'jsonwebtoken';
// step 1
class acc_userController {

    // setToken(findData: Acc_user) {
    //     const payload = {
    //         id: findData.id,
    //         email: findData.email,
    //         name: findData.name,
    //         id_student: findData.id_student,
    //         birthday: findData.birthday,
    //         gender: findData.gender,
    //         faculty: findData.faculty,
    //         phone: findData.phone,

    //     };
    //     const token = jwt.sign(payload, process.env.secret, { expiresIn: '3d' });
    //     return token
    // }
    // step 3
    async loginAndCreate(req: Request, res: Response) {
        try {
            const { email } = req.body
            const findData = await Acc_user.findOne({
                where: { email }
            })
            if (!findData) {
                console.log("---1---")
                const { name,id_student,faculty,phone } = req.body
                const data = await Acc_user.create({ email,name,id_student,faculty,phone })
                res.status(200).send({ msg: "create success", res: data })
            } else {
                console.log("---2---")

                res.status(200).send({ msg: 'login success', res: findData });
            }
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
            if (!data) throw new Error('update fail');
            const find = await Acc_user.findOne({
                where: {
                    email: email
                }
            })
            res.status(200).send({ msg: "Update Success", res: find })

        } catch (error) {
            console.log("Error At update ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }

    async updateFirst(req: Request, res: Response) {
        try {
            const { email, birthday, gender} = req.body
            const data = await Acc_user.update(
                // update อะไร และ ที่ไหน 
                {
                    birthday,
                    gender,
                    
                },
                {
                    where: {
                        email: email
                    }
                }
            )
            if (!data) throw new Error('updateFirst fail');
            const find = await Acc_user.findOne({
                where: {
                    email: email
                }
            })
            res.status(200).send({ msg: "UpdateFirst Success", res: find })

        } catch (error) {
            console.log("Error At updateFirste ", error)
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