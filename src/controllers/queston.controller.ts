import { Request, Response } from "express"
import Question from "../models/question"
import { where } from "sequelize"

class Question_Controller {
    // ดึงคำถามตามประเภทและเรียงลำดับ
    async getQuestion(req: Request, res: Response) {
        try {
            const { formtype_id } = req.params;

            const data = await Question.findAll({
                where: { formtype_id: Number(formtype_id) }, // ค้นหาตาม formtype_id
                attributes: ['id', 'question', 'question_type'], // เลือกเฉพาะฟิลด์ที่ต้องการ
                order: [['id', 'ASC']], // เรียงลำดับคำถาม
            });

            res.status(200).send({ msg: "Get Questions Success", res: data });
        } catch (error) {
            console.error("Error at getQuestionsByFormType: ", error);
            res.status(500).send({ error: error.message, status: 500 });
        }
    }
}

export default new Question_Controller();