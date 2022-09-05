import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidationsEmail';
import { UsersEntity } from '../entities/users.entity';

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    readonly fullName: string;

    @IsNotEmpty()
    @IsEmail()
    @UniqueOnDatabase(UsersEntity, { message: 'Данный email уже используется' })
    readonly email: string;

    readonly password: string;

}
