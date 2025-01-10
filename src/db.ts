import { Sequelize } from "sequelize-typescript";

const seq = new Sequelize('db_wellbeing', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    models: [__dirname + '/models'],
    logging: console.log, 
});


export default seq;