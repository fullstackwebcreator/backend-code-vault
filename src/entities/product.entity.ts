import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: string

  @Column()
  public pdname: string

  @Column()
  public pimg: string

  @Column()
  public images: string

  @Column("simple-array")
  public cids: string[]

  @Column()
  public catname: string

  @Column()
  public brand: string

  @Column()
  public variantId: string

  @Column()
  public mrp: string

  @Column()
  public offerprice: string

  @Column()
  public totalQuantity: string

  @Column("simple-json")
  public uomSingularPlural: {
    singular: string
    plural: string
    abbreviation: string
  }
}

export default Product
