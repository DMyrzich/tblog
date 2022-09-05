import { Transform } from 'class-transformer';
import * as joi from 'joi';

export class FindAllQueryDto {

    @Transform(({ value }) => (value as string).toLocaleUpperCase())
    readonly sort?: 'ASC' | 'DESC';

    readonly count?: number;
}

export const schemaSearch = joi.object({
    sort: joi.string().valid('asc', 'desc').insensitive(),
    count: joi.number().min(1).max(1000)
})


