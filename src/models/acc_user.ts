import { AllowNull, Column, DataType, Model, Table, Unique } from "sequelize-typescript";
enum Gender {
    MALE = "ชาย",
    FEMALE = "หญิง",
    LGBTQ_PLUS = "LGBTQIAN+"
}
@Table({
    tableName : 'acc_user', 
    timestamps : true
})
export default class Acc_user extends Model{
    @AllowNull(false)
    @Unique
    @Column(
        DataType.STRING
    )
    email!:string

    @AllowNull(true)
    @Column(
        DataType.STRING
    )
    name!:string

    @AllowNull(true)
    @Column(
        DataType.STRING
    )
    id_student!:string

    @AllowNull(true)
    @Column(
        DataType.DATEONLY
    )
    birthday!:Date

    @AllowNull(true)
    @Column({
        type: DataType.ENUM(...Object.values(Gender)), // กำหนดค่า ENUM
    })
    gender!: Gender;

    
    @AllowNull(true)
    @Column(
        DataType.STRING
    )
    faculty!:string


    @AllowNull(true)
    @Column(
        DataType.STRING
    )
    phone!:string



}