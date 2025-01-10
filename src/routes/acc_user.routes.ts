import express from 'express';
import acc_userController from '../controllers/acc_user.controller';
import middleware from '../middleware';


const routAcc_User = express.Router();

// เปลี่ยน path , เปลี่ยน function
routAcc_User.post("/login", middleware.middlewareCenter,acc_userController.loginAndCreate)

routAcc_User.put("/updateUser", middleware.middlewareCenter, acc_userController.update)

routAcc_User.get("/getAccUser",middleware.middlewareCenter,acc_userController.getAccUser)

export default routAcc_User;