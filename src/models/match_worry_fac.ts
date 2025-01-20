import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import basic_worry from "./basic_worry";
import faculties from "./faculties";
import Conern_Fac_Map from "./connern_fac_map";

@Table({
    tableName: 'match_worry_fac',
    // timestamps : true
})


export default class match_worry_fac extends Model {

    @BelongsTo(() => basic_worry, { foreignKey: 'basic_worry_id' })
    basic_worry!: basic_worry;

    @Column(DataType.INTEGER)
    basic_worry_id!: number;

    @BelongsTo(() => faculties, { foreignKey: 'faculties_id' })
    faculties!: faculties;

    @Column(DataType.INTEGER)
    faculties_id!: number;

    @HasMany(() => Conern_Fac_Map,{foreignKey: 'match_id'})
    concern_match:Conern_Fac_Map;
}
