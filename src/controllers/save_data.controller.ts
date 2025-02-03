import { Request, Response } from "express"
import Acc_user from "../models/acc_user"
import { where } from "sequelize"
import Save_data from "../models/save_data"
import Question_select from "../models/question_select"
import Form_type from "../models/form_type"
import Question from "../models/question"
import Option from "../models/option"
import Conern_Fac_Map from "../models/connern_fac_map"
import match_worry_fac from "../models/match_worry_fac"
import faculties from "../models/faculties"
// step 1
class save_dataController {
    // step 3
    async save_data(req: Request, res: Response) {
        try {
            const { formtype_id, acc_id, question_select, interpre_level, interpre_color, score, status_id, concern_list } = req.body;

            const findAcc = await Acc_user.findOne({ where: { id_student: acc_id } })

            if (!findAcc) {
                throw new Error('account not found');
            }

            const saveData = await Save_data.create({ formtype_id, acc_id: findAcc.id, interpre_level, score, status_id,interpre_color });

            const corncernList = concern_list.map((item: { id: number }) => ({
                match_id: item.id,
                save_data_id: saveData.id
            }));

            console.log('cc1---------->', concern_list)
            console.log('cc2----------->', corncernList)
            const questionSelectData = question_select.map((item: { queston_id: number, option_id: number }) => ({
                queston_id: item.queston_id,
                option_id: item.option_id,
                save_data_id: saveData.id // ใช้ save_data_id ที่ได้จาก Save_data
            }));

            const createCorncern = await Conern_Fac_Map.bulkCreate(corncernList);

            const createdQuestions = await Question_select.bulkCreate(questionSelectData);

            res.status(200).send({ msg: "Save data Success", res: { saveData, createdQuestions, createCorncern } });
        } catch (error) {
            console.log("Error At Save data ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }

    async getData(req: Request, res: Response) {
        try {
            const data = await Save_data.findAll({
                include: [
                    {
                        model: Form_type, // ตาราง Form_type
                        as: 'formType'    // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
                    },
                    {
                        model: Acc_user,   // ตาราง Acc_user
                        as: 'acc_user'     // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
                    },
                    {
                        model: Question_select, // ตาราง Question_select
                        as: 'question_select',   // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
                        include: [
                            {
                                model: Question,
                                as: 'question'
                            },
                            {
                                model: Option,
                                as: 'option'
                            }
                        ]
                    }
                ]
            })
            res.status(200).send({ msg: "get Data Success", res: data })
        } catch (error) {
            console.log("Error At getData ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }

    async getHistory(req: Request, res: Response) {
        try {
            const findAcc = await Acc_user.findOne({ where: { id_student: req.params.id_student } })
            console.log('find -=-==-=->', findAcc)
            const data = await Save_data.findAll({
                where:{acc_id:findAcc.id},
                include: [
                    {
                        model: Form_type, // ตาราง Form_type
                        as: 'formType'    // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
                    },
                    {
                        model: Conern_Fac_Map, // ตาราง Question_select
                        // as: 'Conern_Fac_Map',   // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
                        include: [
                            {
                                model: match_worry_fac,
                                // as: 'match_worry_fac',
                                include: [
                                    {
                                        model: faculties
                                    }
                                ]
                            }
                        ]
                    }
                ],
                order: [
                    ['createdAt', 'DESC'] // จัดลำดับตาม createdAt จากมากไปน้อย
                ]
            })
            res.status(200).send({ msg: "get Data Success", res: data })
        } catch (error) {
            console.log("Error At getData ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
// step 2 
export default new save_dataController()