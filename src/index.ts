import express, { Request, Response } from "express";
import seq from "./db";
import cors from 'cors';
import routAcc_User from "./routes/acc_user.routes";
import routForm_type from "./routes/form_type.routes";
import rout_Option from "./routes/option.routes";
import rout_Question from "./routes/question.routes";
import rout_Basicworry from "./routes/basic_worry.routes";
import rout_StatusUser from "./routes/status_user.routes";
import rout_Interpre from "./routes/interpre.routes";
import rout_Match_worry_fac_ from "./routes/match_worry_fac.routes";
import rout_Guidancde from "./routes/guidance.routes";
import rout_Save_data from "./routes/save_data.routes";
import rout_Role from "./routes/role.routes";
import rout_Manageadmin from "./routes/manageadmin.routes";
import rout_Meetings from "./routes/meetings.routes";
// import authenticateToken from "./middleware/auth";
const app = express();

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Request-Headers');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    console.log('app -> middleware : ' + req.baseUrl);
    next();
});

// app.get('/protected', authenticateToken, (req: Request, res: Response) => {
//     res.send({ msg: 'Access granted', user: req.user });
// });

app.get('/', (req, res) => {
    console.log('get');
    res.send('test');
});

app.use('/acc_user', routAcc_User);
app.use('/form_type', routForm_type);
app.use('/option', rout_Option);
app.use('/question', rout_Question);
app.use('/basic_worry', rout_Basicworry);
app.use('/status_user', rout_StatusUser);
app.use('/interpre', rout_Interpre);
app.use('/matchWorry_Fac', rout_Match_worry_fac_);
app.use('/guidance', rout_Guidancde);
app.use('/save_data', rout_Save_data);
app.use('/role', rout_Role);
app.use('/admin', rout_Manageadmin);
app.use('/meeting', rout_Meetings);


// ใช้ตอนที่จะสร้าง Table ใหม่ ค่อยมาเปิด Comment ตรงนี้ 
// alter:true  เพิ่มโครงสร้างใหม่ โดยไม่ลบของเก่า
// force:true ลบทุกอย่างแล้วสร้างใหม่ 
seq.authenticate().then(async () => {
    console.log('✅ Database connected');
    // seq.sync({ alter: true }).then(() => console.log('create tables \n <--------------------> \n ', seq.models)); // <---- อันเดิม

    // _________________________ สร้าง table แล้วอย่าลืม comment _________________________  finish 
    const models = seq.models;
    // await models.Acc_user.sync({ alter: true }); 
    // await models.basic_worry.sync({ alter: true }); 
    // await models.faculties.sync({ alter: true }); 
    // await models.Form_type.sync({ alter: true }); 
    // await models.Guidance.sync({ alter: true }); 
    // await models.Interpre.sync({ alter: true }); 
    // await models.Role.sync({ alter: true }); 
    // await models.Manageadmin.sync({ alter: true }); 
    // await models.status_user.sync({ alter: true }); 
                                                        // เปลี่ยนเป็นสร้างตามลำดับ relation
    // await models.Save_data.sync({ alter: true }); 
    // await models.match_worry_fac.sync({ alter: true }); 
    // await models.Conern_Fac_Map.sync({ alter: true }); 
    // await models.Meetings.sync({ alter: true }); 
    // await models.Option.sync({ alter: true }); 
    // await models.Question.sync({ alter: true }); 
    // await models.Question_select.sync({ alter: true }); 
    // _______________________________________________________________________________ 

}).catch((error) => console.log('error: ', error));



app.listen(8080, () => {
    console.log('Server running on port 8080');
})