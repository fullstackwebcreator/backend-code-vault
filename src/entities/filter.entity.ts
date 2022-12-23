import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Filter {
  @PrimaryGeneratedColumn()
  public id: string

  @Column()
  public fname: string
}

export default Filter
