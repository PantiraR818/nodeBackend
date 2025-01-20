import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Question from "./question";
import Form_type from "./form_type";
import Question_select from "./question_select";

@Table({
    tableName: 'option',
    timestamps: true
})
export default class Option extends Model {
    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    option_name!: string

    @AllowNull(false)
    @Column(
        DataType.INTEGER
    )
    score!: Number


    @BelongsTo(() => Form_type, { foreignKey: 'formtype_id' })
    formType!: Form_type;

    @Column(DataType.INTEGER)
    formtype_id!: number;

    @HasMany(() => Question_select, { foreignKey: 'option_id' })
    question_select!: Question_select[];
}