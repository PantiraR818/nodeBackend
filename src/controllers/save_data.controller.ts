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
import Interpre from "../models/interpre"
import Meetings from "../models/meetings"
const { Op } = require("sequelize");
// step 1
class save_dataController {
    // step 3
    async save_data(req: Request, res: Response) {
        try {
            const { formtype_id, acc_id, question_select, interpre_level, interpre_color, score, status_id, concern_list } = req.body;
            console.log('req.body ------------------------------------> ', acc_id);
            const findAcc = await Acc_user.findOne({ where: { id_student: acc_id } })
            console.log('findAcc ------------------------------------> ', findAcc);
            //console.log('interpre_color ------------------------------------> ',interpre_color);
            if (!findAcc) {
                throw new Error('account not found');
            }
            let readed = 0;
            let viewed = 0;
            if (interpre_level == 'เครียดมาก' || interpre_level == 'เครียดมากที่สุด' || interpre_level == 'ซึมเศร้าระดับปานกลาง' || interpre_level == 'ซึมเศร้าระดับรุนแรง' || interpre_level == 'พลังสุขภาพจิตระดับต่ำ') {
                readed = 2
            }
            // interpre_level: {
            //     [Op.or]: [
            //         { [Op.like]: 'เครียดมาก' },
            //         { [Op.like]: 'เครียดมากที่สุด' },
            //         { [Op.like]: 'ซึมเศร้าระดับปานกลาง' },
            //         { [Op.like]: 'ซึมเศร้าระดับรุนแรง' },
            //         { [Op.like]: 'พลังสุขภาพจิตระดับต่ำ' }
            //     ]
            // }

            const saveData = await Save_data.create({ formtype_id, acc_id: findAcc.id, interpre_level, score, status_id, interpre_color, readed, viewed });

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
                        as: 'formTypeRelation'    // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
                    },
                    {
                        model: Acc_user,   // ตาราง Acc_user
                        as: 'acc_user'     // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
                    },
                    {
                        model: Question_select, // ตาราง Question_select
                        as: 'Question_select',   // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
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
                where: { acc_id: findAcc.id },
                include: [
                    {
                        model: Form_type, // ตาราง Form_type
                        as: 'formTypeRelation'    // ชื่อ alias (ถ้ากำหนดไว้ในโมเดล)
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



    async getResult(req: Request, res: Response) {
        try {
            const interpre = await Interpre.findAll({ where: { formtype_id: req.params.formtype_id }, order: [['min_Interpre', 'ASC']] })
            const saveData = await Save_data.findAll({ where: { formtype_id: req.params.formtype_id } })
            let tosend = []

            let countMap = {};

            saveData.forEach(item => {
                countMap[item.interpre_level] = (countMap[item.interpre_level] || 0) + 1;
            });

            tosend = interpre.map(item => ({
                x: item.nameInterpre,
                y: countMap[item.nameInterpre] || 0
            }));

            res.status(200).send({ msg: "get Data Success", res: tosend })

        } catch (error) {
            console.log("Error At getResult ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }

    async getchart(req: Request, res: Response) {
        try {
            const interpre = await Interpre.findAll({ where: { formtype_id: req.params.formtype_id }, order: [['min_Interpre', 'ASC']] });
            const saveData = await Save_data.findAll({ where: { formtype_id: req.params.formtype_id, acc_id: req.params.acc_id } });

            let titleSet = new Set(); // ใช้ Set เพื่อตรวจสอบซ้ำ
            let titleList = []; // เก็บ title ที่มี min_Interpre
            let dataArray = []; // เก็บข้อมูล data

            saveData.forEach(item => {
                let matchedInterpre = interpre.find(i => i.nameInterpre === item.interpre_level);
                if (matchedInterpre && !titleSet.has(matchedInterpre.nameInterpre)) {
                    titleSet.add(matchedInterpre.nameInterpre); // ป้องกันค่าซ้ำ
                    titleList.push({
                        nameInterpre: matchedInterpre.nameInterpre,
                        min_Interpre: matchedInterpre.min_Interpre
                    });
                }
                if (matchedInterpre) {
                    dataArray.push({
                        x: item.createdAt,
                        y: matchedInterpre.nameInterpre
                    });
                }
            });

            // เรียง titleList ตาม min_Interpre จากน้อยไปมาก
            titleList.sort((a, b) => a.min_Interpre - b.min_Interpre);

            let result = [{
                title: Array.from(titleList).map(t => ({ t })), // แปลง Set เป็น Array
                data: dataArray
            }];

            console.log('inter ---> ', titleList);
            console.log('result ---> ', result.map((v) => v.data))

            res.status(200).send({
                msg: "get Data Success",
                res: result
            });

        } catch (error) {
            console.log("Error At getResult ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
    async getNoti(req: Request, res: Response) {
        try {
            const find = await Acc_user.findOne({ where: { id_student: req.params.acc_id } })

            if (!find) {
                throw new Error('account not found');
            }

            const meeting = await Meetings.findAll({
                where: { acc_id: find.id, },
                order: [['createdAt', 'DESC']]
            })
            const saveData = await Save_data.findAll({
                where: {
                    acc_id: find.id,
                    readed: {
                        [Op.ne]: 0  // ดึงเฉพาะข้อมูลที่ readed ไม่เท่ากับ 0
                    },
                    interpre_level: {
                        [Op.or]: [
                            { [Op.like]: 'เครียดมาก' },
                            { [Op.like]: 'เครียดมากที่สุด' },
                            { [Op.like]: 'ซึมเศร้าระดับปานกลาง' },
                            { [Op.like]: 'ซึมเศร้าระดับรุนแรง' },
                            { [Op.like]: 'พลังสุขภาพจิตระดับต่ำ' }
                        ]
                    }
                },
                order: [['createdAt', 'DESC']]
            });
            const resData = {
                "meeting": meeting,
                "saveData": saveData,
            }
            res.status(200).send({ msg: "get Data Success", res: resData })

        } catch (error) {
            console.log("Error At getNoti ", error)
            res.status(500).send({ error: error, status: 500 })
        }

    }


    async updateReaded(req: Request, res: Response): Promise<void> {
        try {
            // // Check if acc_id exists in the request body
            // if (!acc_id) {
            //     res.status(400).json({ message: 'acc_id is required' });
            //     return;
            // }
            // Perform the update
            const [updatedRows] = await Save_data.update(
                { readed: 1 },
                {
                    where: {
                        acc_id: req.params.acc_id,
                        readed: 2,
                    },
                }
            );
            const [updatedMeeting] = await Meetings.update(
                { readed: 0 },
                {
                    where: {
                        acc_id: req.params.acc_id,
                        readed: 1,
                    },
                }
            );

            const mergeRes = {
                "save_data": updatedRows,
                "Meeting": updatedMeeting
            }
            // Handle no updates found
            if (updatedRows === 0 && updatedMeeting == 0) {
                res.status(200).json({ message: 'Nothing to Update', mergeRes });
                return;
            }

            // Return a successful response
            res.status(200).json({ message: 'Update Success', mergeRes });
        } catch (error) {
            console.error("Error in updateReaded:", error);
            res.status(500).send({ message: 'Internal Server Error', error: error.message });
        }
    }

};
// step 2 
export default new save_dataController()