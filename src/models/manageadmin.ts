import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Option from "./option";
import Role from "./role";


@Table({
    tableName: 'manageadmin',
    timestamps: true
})
export default class Manageadmin extends Model {
    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    firstname!: string

    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    lastname!: string

    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    username!: string

    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    password!: string

    @AllowNull(false)
    @Column(
        DataType.STRING
    )
    phone!: string


    @BelongsTo(() => Role, { foreignKey: 'role_id' })
    role!: Role;
    
    @Column(DataType.INTEGER)
    role_id!: number;


}