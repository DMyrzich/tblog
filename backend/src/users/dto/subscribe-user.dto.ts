import { IsNotEmpty } from 'class-validator';

export class SubscribeUserDto {

    @IsNotEmpty()
    readonly userId: number;
}
