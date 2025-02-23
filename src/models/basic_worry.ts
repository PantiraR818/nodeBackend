import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import match_worry_fac from "./match_worry_fac";
import Connern_Map from "./connern_fac_map";

@Table({
    tableName: 'Basic_worry',
    // timestamps : true
})


export default class basic_worry extends Model {

    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    nameWorry!: string

    @AllowNull(true)
    @Unique
    @Column(
        DataType.STRING
    )
    nameWorryEng!: string

    @HasMany(() => match_worry_fac, { foreignKey: 'basic_worry_id' })
    match_worry_fac!: match_worry_fac[];


}
