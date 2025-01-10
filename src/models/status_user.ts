import { AllowNull, Column, DataType, Model, Table, Unique } from "sequelize-typescript";

@Table({
    tableName : 'Status_user',
    timestamps : true
})

export default class status_user extends Model{
    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    status!: string

    @AllowNull(true)
    @Unique
    @Column(
        DataType.STRING
    )
    statusEng!: string
}
