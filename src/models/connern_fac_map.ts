import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import match_worry_fac from "./match_worry_fac";
import Save_data from "./save_data";

@Table({
    tableName: 'Conern_Fac_Map',
    timestamps: true
})

export default class Conern_Fac_Map extends Model {

    @Column(
        DataType.INTEGER
    )
    match_id!:number

    @BelongsTo(() => match_worry_fac, { foreignKey: 'match_id' })
    match_worry_fac!: match_worry_fac;

    
    @Column(
        DataType.INTEGER
    )
    save_data_id!:number

    @BelongsTo(() => Save_data, { foreignKey: 'save_data_id' })
    Save_data!: Save_data;
}