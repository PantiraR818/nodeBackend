import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Save_data from "./save_data";

@Table({
    tableName: 'Status_user',
    timestamps: true
})

export default class status_user extends Model {
    
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

    @HasMany(() => Save_data, { foreignKey: 'status_id' })
    save_data!: Save_data[];
}
