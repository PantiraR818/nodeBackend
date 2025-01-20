import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Question from "./question";
import Interpre from "./interpre";
import Guidance from "./guidance";
import Save_data from "./save_data";
import Option from "./option";

@Table({
    tableName: 'form_type',
    timestamps: true
})

export default class Form_type extends Model {
    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    nameType!: string

    @AllowNull(true)
    @Unique
    @Column(
        DataType.STRING
    )
    nameTypeEng!: string

    @AllowNull(false)
    @Column(
        DataType.INTEGER
    )
    max_score!: Number

    @AllowNull(false)
    @Column(
        DataType.INTEGER
    )
    min_score!: Number

    @AllowNull(true)
    @Column(
        DataType.INTEGER
    )
    type!: Number

    @HasMany(() => Question, { foreignKey: 'formtype_id' })
    questions!: Question[];

    @HasMany(() => Interpre, { foreignKey: 'formtype_id' })
    interpre!: Interpre[];

    @HasMany(() => Guidance, { foreignKey: 'formtype_id' })
    guidance!: Guidance[];

    @HasMany(() => Save_data, { foreignKey: 'formtype_id' })
    save_data!: Save_data[];

    @HasMany(() => Option, { foreignKey: 'formtype_id' })
    option!: Option[];
    
}