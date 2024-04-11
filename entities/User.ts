import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  
  // ./tsconfig.json
  // "strictPropertyInitialization": false,    

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  active: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}