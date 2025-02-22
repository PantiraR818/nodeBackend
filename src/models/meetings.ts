import { AllowNull, BelongsTo, Column, DataType, Model, Table, Unique } from "sequelize-typescript";
import Form_type from "./form_type";
import Acc_user from "./acc_user";

@Table({
    tableName: 'meetings',
    timestamps: true
})

export default class Meetings extends Model {
    @AllowNull(false)
    @Unique
    @Column(
        DataType.DATE
    )
    meeting_date!: Date

    @AllowNull(false)
    @Column(
        DataType.TIME
    )
    start_time!: Date

    @AllowNull(false)
    @Column(
        DataType.TIME
    )
    end_time!: Date


    @AllowNull(false)
    @Column(
        DataType.TEXT
    )
    description!: string

    @BelongsTo(() => Acc_user, { foreignKey: 'acc_id' })
    accUser!: Acc_user;

    @Column(DataType.INTEGER)
    acc_id!: number;


}