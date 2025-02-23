import { AllowNull, BelongsTo, Column, DataType, Model, Table, Unique } from "sequelize-typescript";
import Form_type from "./form_type";
import Question from "./question";
import Option from "./option";
import Save_data from "./save_data";

@Table({
    tableName: 'Question_select',
    timestamps: true
})

export default class Question_select extends Model {

   
    @BelongsTo(() => Option, { foreignKey: 'option_id' })
    option!: Option;

    @Column(
        DataType.INTEGER
    )
    option_id!: Number

    @Column(DataType.INTEGER)
    queston_id!: number;
    
    @BelongsTo(() => Question, { foreignKey: 'queston_id' })
    question!: Question;
    
    @Column(DataType.INTEGER)
    save_data_id!: number;

    @BelongsTo(() => Save_data, { foreignKey: 'save_data_id' })
    save_data!: Save_data;

}