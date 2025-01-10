import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import match_worry_fac from "./match_worry_fac";

@Table({
    tableName : 'faculties',
    // timestamps : true
})


export default class faculties extends Model{

    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    faculties!: string

    @AllowNull(true)
    @Unique
    @Column(
        DataType.STRING
    )
    phone!: string

    @HasMany(() => match_worry_fac, { foreignKey: 'faculties_id' })
    match_worry_fac!: match_worry_fac[];
}
