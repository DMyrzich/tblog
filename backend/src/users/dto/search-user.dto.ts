import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SearchUserDto {

    @Transform(({ value }) => (value as string).toLocaleUpperCase())
    readonly sort?: 'ASC' | 'DESC';

    @IsNotEmpty()
    readonly fullName?: string;

    @IsNotEmpty()
    readonly email?: string;

    readonly count?: number;
}
