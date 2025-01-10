import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Option from "./option";
import Form_type from "./form_type";

@Table({
    tableName: 'question',
    timestamps: true
})
export default class Question extends Model {
    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    question!: string

    @AllowNull(true)
    @Column(
        DataType.INTEGER
    )
    question_type!: number // 0 ปกติ, 1 แปลก

    @BelongsTo(() => Form_type, { foreignKey: 'formtype_id' })
    formType!: Form_type;
    
    @Column(DataType.INTEGER)
    formtype_id!: number;


}