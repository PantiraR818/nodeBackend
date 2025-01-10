import { AllowNull, BelongsTo, Column, DataType, Model, Table, Unique } from "sequelize-typescript";
import Form_type from "./form_type";

@Table({
    tableName : 'Interpre',
    // timestamps : true
})

export default class Interpre extends Model{
    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    nameInterpre!: string

    @AllowNull(false)
    @Column(
        DataType.INTEGER
    )
    min_Interpre!: Number

    @AllowNull(false)
    @Column(
        DataType.INTEGER
    )
    max_Interpre!: Number

    
    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    color_Progress!: string

    @BelongsTo(() => Form_type, { foreignKey: 'formtype_id' })
        formType!: Form_type;
    
        @Column(DataType.INTEGER)
        formtype_id!: number;


}