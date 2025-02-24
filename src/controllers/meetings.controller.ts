import { Request, Response } from "express"
import Acc_user from "../models/acc_user"
import Meetings from "../models/meetings"
const { Op } = require("sequelize");
// step 1
class meetings_Controller {

    async createMeeting(req: Request, res: Response): Promise<void> {
        try {
            const { meeting_date, start_time, end_time, description, acc_id } = req.body;

            // ตรวจสอบข้อมูลที่ได้รับ
            if (!meeting_date || !start_time || !end_time || !description || !acc_id) {
                res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
                return;
            }

            // สร้างการนัดหมายใหม่
            const newMeeting = await Meetings.create({
                meeting_date,
                start_time,
                end_time,
                description,
                acc_id,
                readed: 1
            });

            // ตอบกลับเมื่อสำเร็จ
            res.status(200).json({
                message: 'เพิ่มการนัดหมายนักจิตวิทยาสำเร็จ',
                meeting: newMeeting
            });
        } catch (error) {
            console.error('❌ Error creating meeting:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
        }
    }
    //  async getDetailMeeting(req: Request, res: Response) {
    //         try {
    //             const data = await Meetings.findAll({})
    //             res.status(200).send({ msg: "getDetailMeeting Success", res: data })
    //         } catch (error) {
    //             console.log("Error At getDetailMeeting ", error)
    //             res.status(500).send({ error: error, status: 500 })
    //         }
    //     }

};
// step 2 
export default new meetings_Controller()
