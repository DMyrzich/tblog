import { ConnectionOptions } from "typeorm";

console.log(__dirname);

const ormConfig: ConnectionOptions = {

    type: 'postgres',
    host: 'ec2-54-158-247-210.compute-1.amazonaws.com',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    database: 'd8codgb9a9qc8p',
    username: 'zdxdtpoohdqohv',
    password: '9157eb0e23f8c48fa6db5eab3ce2d60ace7d2077f5b7cf559981b0192d3444f5',
    url: 'postgres://zdxdtpoohdqohv:9157eb0e23f8c48fa6db5eab3ce2d60ace7d2077f5b7cf559981b0192d3444f5@ec2-54-158-247-210.compute-1.amazonaws.com:5432/d8codgb9a9qc8p',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    synchronize: true,
    cli: {

    }

}

const ormConfig1ROMMPC: ConnectionOptions = {

    // для пк подключения база данных
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'jornal',
    password: '123',
    database: 'jornal',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}

export default ormConfig;