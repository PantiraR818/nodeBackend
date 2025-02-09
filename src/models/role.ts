import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Option from "./option";
import Manageadmin from "./manageadmin";


@Table({
    tableName: 'role',
    timestamps: true
})
export default class Role extends Model {
    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    role!: string



       @HasMany(() => Manageadmin, { foreignKey: 'role_id' })
        manageadmin!: Manageadmin[];


}