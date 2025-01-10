import { AllowNull, BelongsTo, Column, DataType, Model, Table, Unique } from "sequelize-typescript";
import Question from "./question";
import Form_type from "./form_type";

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
}