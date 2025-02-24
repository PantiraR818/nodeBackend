import { AllowNull, BelongsTo, Column, DataType, Default, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Form_type from "./form_type";
import Acc_user from "./acc_user";
import Question_select from "./question_select";
import Conern_Fac_Map from "./connern_fac_map";
import status_user from "./status_user";

@Table({
    tableName: 'Save_data',
    timestamps: true
})

export default class Save_data extends Model {

    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    interpre_level!: string

    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    interpre_color!: string

    @Column(DataType.INTEGER)
    score!: number;

    @AllowNull(false)
    @Default(0)
    @Column(
        DataType.SMALLINT // TINYINT
    )
    viewed!: number;

    @AllowNull(false)
    @Default(0)  
    @Column(
        DataType.SMALLINT // TINYINT
    )
    readed!: number;  // 0 คือไม่แจ้งเตือน, 1 คืออ่านแล้ว, 2 ยังไม่อ่าน
    

    @HasMany(() => Question_select, { foreignKey: 'save_data_id' , as: 'Question_select'})

    @HasMany(() => Conern_Fac_Map,{foreignKey: 'save_data_id', as: 'Conern_Fac_Map'})

    // MYSQL เจอชื่อซ้ำซ้อนใน relation มันชนกัน
 
    @BelongsTo(() => Form_type, { foreignKey: 'formtype_id', as: 'formTypeRelation' }) // <-- as ชื่อใหม่
    form_type!: Form_type;
    @Column(DataType.INTEGER)
    formtype_id!: number;

    @BelongsTo(() => Acc_user, { foreignKey: 'acc_id' , as: 'acc_user'})
    acc_user!: Acc_user;
    @Column(DataType.INTEGER)
    acc_id!: number;
   
    @BelongsTo(() => status_user, { foreignKey: 'status_id', as: 'Status_user' })
    Status_user!: status_user;
    @Column(DataType.INTEGER)
    status_id!: number;
}

    // @AllowNull(false)
    // @Default(0)
    // @Column(
    //     DataType.TINYINT // TINYINT
    // )
    // viewed!: number;

    // @AllowNull(false)
    // @Default(0)  
    // @Column(
    //     DataType.TINYINT // TINYINT
    // )
    // readed!: number;  // 0 คือไม่แจ้งเตือน, 1 คืออ่านแล้วมฃ, 2 ยังไม่อ่าน
