# TypeORM Nodejs Rest API CRUD + Postgres

TypeORM es un modulo de Typescript para Nodejs, el cual permite crear tu base de datos a través de código, es decir, en lugar de estar escribiendo sintaxis SQL para Postgres u otra base de datos SQL, puedes llamar una función y este modulo lo traduce en SQL para la base de datos que hayas configurado. Además este modulo usa conceptos de Typescript como decoradores, Herencia, y se adapta a múltiples bases de datos. En este ejemplo crea una REST API que realiza las operaciones CRUD (CREATE, READ, UPDATE, DELETE).

### HTTP Request

* GET
```php
http://localhost:3000/api/user/get
```
* POST
```php
http://localhost:3000/api/user/create

json body { "firstname": "John", "lastname": "salchichon" }
```
* PUT
```php
http://localhost:3000/api/user/update/1

json body { "firstname": "John", "lastname": "doe" }
```
* DELETE
```php
http://localhost:3000/api/user/delete/1
```


## Project setup

> Generate a `package.json` file

```bash
npm init -y
```

> Install modules

```bash
npm i express cors dotenv morgan
```
```bash
npm i -D @types/express @types/cors @types/morgan @types/node ts-node typescript nodemon
```

> Create commands script

`./package.json` :

```json
"scripts": {
    "dev": "nodemon src/index.ts",
    "build": "npx tsc",
    "start": "node dist/index.js"
  },
```

## Install TypeORM

```bash	
npm i typeorm reflect-metadata --save
```

## Install a database driver:

* for MySQL or MariaDB

```bash
npm install mysql --save (you can install mysql2 instead as well)
```

* for PostgreSQL or CockroachDB

```bash
npm install pg --save
```

* for SQLite

```bash
npm install sqlite3 --save
```

* for Microsoft SQL Server

```bash
npm install mssql --save
```

* for sql.js

```bash
npm install sql.js --save
```

## PostgresSQL configuration

> Connection

`./src/connection/index.ts` :

```javascript
import { DataSource } from 'typeorm'
import config from '../config'
import { User } from '../entities/User';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB.URI as string,
  port: config.DB.PORT as number,
  username: config.DB.USER as string,
  password: config.DB.PASS as string,
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
})

async function connect() {
  await AppDataSource.initialize();
}

export { connect }
```

`./src/index.ts` :

```javascript
import app from './app'
import { connect } from './connection'

async function main() {
  
  try {

    // database connection
    await connect()
  
    // server listening
    app.listen(app.get('port'), () => console.log(`Server listen on port: ${app.get('port')}`))
  
  } catch (error) {
    console.log(error)
  }
}


main()
```

> Entities

`./src/entities/User.ts` :

```javascript
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

  @Column({
    default: true
  })
  active: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}
```

## Aditional configurations

`./tsconfig.json` :

```json
{
  "compilerOptions": {
    "strictPropertyInitialization": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

## TypeORM Methods

```javascript
import { User } from "../entities/User"
```

> Create

```javascript
const { firstname, lastname } = req.body
const user = new User()
user.firstname = firstname
user.lastname = lastname
await user.save()
```

> Get All

```javascript
const users = await User.find()
```

> Update

```javascript
const {firstname, lastname} = req.body

const user = await User.findOneBy({id: parseInt(req.params.id )})

if(!user) throw new Error('USER_NOT_FOUND');

user.firstname = firstname
user.lastname = lastname
user.save()

/*
await User.update( 
  {id: parseInt(req.params.id)},
  {firstname: req.body.firstname, lastname: req.body.lastname}
)
*/
```

> Delete

```javascript
const user = await User.findOneBy({id: parseInt(req.params.id )})
    
if(!user) throw new Error('USER_NOT_FOUND');

user.remove()
```