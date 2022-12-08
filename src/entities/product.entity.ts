import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: string

  @Column()
  public Productname: string

  @Column()
  public email: string

  @Column()
  public password: string
}

export default Product
