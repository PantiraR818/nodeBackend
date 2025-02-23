import { AllowNull, BelongsTo, Column, DataType, Default, Model, Table, Unique } from "sequelize-typescript";
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

    @AllowNull(false)
    @Default(0)
    @Column(
        DataType.SMALLINT // TINYINT
    )
    readed!: number;

    @BelongsTo(() => Acc_user, { foreignKey: 'acc_id' })
    accUser!: Acc_user;

    @Column(DataType.INTEGER)
    acc_id!: number;


}