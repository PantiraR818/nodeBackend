import { Request, Response } from "express"
import Manageadmin from "../models/manageadmin"
import bcrypt from "bcrypt";
import Role from "../models/role";


class manageAdmin_Controller {

    async createAdmin(req: Request, res: Response) {
        try {
            const { firstname, lastname, username, password, phone, role_id } = req.body;

            // 🔹 ตรวจสอบว่า username มีอยู่แล้วหรือไม่
            const existingAdmin = await Manageadmin.findOne({ where: { username } });
            if (existingAdmin) {
                res.status(400).json({ msg: "Username already exists" });
            }

            // 🔹 เข้ารหัสรหัสผ่านก่อนบันทึก
            const hashedPassword = await bcrypt.hash(password, 10);

            // 🔹 ตรวจสอบว่า role_id มีอยู่จริงหรือไม่
            const roleExists = await Role.findByPk(role_id);
            if (!roleExists) {
                res.status(400).send({ msg: "Invalid role_id" });
            }

            // 🔹 สร้าง Admin ใหม่
            const data = await Manageadmin.create({
                firstname,
                lastname,
                username,
                password: hashedPassword, // ใช้รหัสผ่านที่เข้ารหัส
                phone,
                role_id,
            });

            res.status(200).send({ msg: "Admin created successfully", res: data });
        } catch (error) {
            console.error("Error at createAdmin:", error);
            res.status(500).send({ msg: "Internal server error", error });
        }
    }

      async getAdmin(req: Request, res: Response) {
            try {
                const data = await Manageadmin.findAll({})
                res.status(200).send({ msg: "getAdmin Success", res: data })
            } catch (error) {
                console.log("Error At getAdmin ", error)
                res.status(500).send({ error: error, status: 500 })
            }
        }
}
export default new manageAdmin_Controller()