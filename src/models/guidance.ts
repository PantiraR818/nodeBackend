import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Option from "./option";
import Form_type from "./form_type";

@Table({
    tableName: 'guidance',
    timestamps: true
})
export default class Guidance extends Model {
    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    guidance!: string


    @BelongsTo(() => Form_type, { foreignKey: 'formtype_id' })
    formType!: Form_type;
    
    @Column(DataType.INTEGER)
    formtype_id!: number;


}