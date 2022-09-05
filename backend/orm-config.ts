import { ConnectionOptions } from "typeorm";

console.log(__dirname);

const ormConfig: ConnectionOptions = {

    type: 'NONE',
    host: 'NONE',
    port: NONE,
    ssl: {
        rejectUnauthorized: false
    },
    database: 'NONE',
    username: 'NONE',
    password: 'NONE',
    url: 'NONE',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    synchronize: NONE,
    cli: {

    }

}

const ormConfig1ROMMPC: ConnectionOptions = {

    // для пк подключения база данных
    type: 'NONE',
    host: 'NONE',
    port: NONE,
    username: 'NONE',
    password: 'NONE',
    database: 'jornal',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: NONE,
}

export default ormConfig;
