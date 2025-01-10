import express from "express";
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


seq.authenticate().then(() => {
    console.log('Database connected');
    // ใช้ตอนที่จะสร้าง Table ใหม่ ค่อยมาเปิด Comment ตรงนี้ 
    // alter:true  เพิ่มโครงสร้างใหม่ โดยไม่ลบของเก่า
    // force:true ลบทุกอย่างแล้วสร้างใหม่ 
    //  seq.sync({alter:true}).then(() => console.log('create tables \n <--------------------> \n ', seq.models));
}).catch((error) => console.log('error: ', error));

app.listen(8080, () => {
    console.log('Server running on port 8080');
})