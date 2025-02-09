import { Request, Response } from "express"
import Role from "../models/role";

class role_Controller {
    async createRole(req: Request, res: Response) {
        try {
            const { role } = req.body;
            // ตรวจสอบว่า role ซ้ำหรือไม่
            const existingRole = await Role.findOne({ where: { role } });
            if (existingRole) {
                res.status(400).json({ msg: "Role already exists" });
            }
            const data = await Role.create({ role });
            res.status(200).send({ msg: "Role created successfully", res: data })
        } catch (error) {
            console.log("Error At createrole ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }

    async getRole(req: Request, res: Response) {
        try {
            const data = await Role.findAll({})
            res.status(200).send({ msg: "getRole Success", res: data })
        } catch (error) {
            console.log("Error At getRole ", error)
            res.status(500).send({ error: error, status: 500 })
        }
    }
}
export default new role_Controller()
