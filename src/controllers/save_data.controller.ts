import { Request, Response } from "express"
import Acc_user from "../models/acc_user"
import { where } from "sequelize"
import Save_data from "../models/save_data"
import Question_select from "../models/question_select"
import Form_type from "../models/form_type"
import Question from "../models/question"
import Option from "../models/option"
// step 1
class save_dataController {
    // step 3
    async save_data(req: Request, res: Response) {
        try {
            const { formtype_id, acc_id, question_select, interpre_level, score, status_id, concern_id } = req.body;

            const findAcc = await Acc_user.findOne({ where: { id_student: acc_id } })

            if(!findAcc){
                throw new Error('account not found');
            }

            const saveData = await Save_data.create({ formtype_id, acc_id: findAcc.id, interpre_level, score, status_id, concern_id });
            
            const questionSelectData = question_select.map((item: { queston_id: number, option_id: number }) => ({
                queston_id: item.queston_id,
                option_id: item.option_id,
                save_data_id: saveData.id // ใช้ save_data_id ที่ได้จาก Save_data
            }));

            const createdQuestions = await Question_select.bulkCreate(questionSelectData);

            res.status(200).send({ msg: "Save data Success", res: { saveData, createdQuestions } });
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
}
// step 2 
export default new save_dataController()