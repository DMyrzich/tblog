import { Transform } from 'class-transformer';
import * as joi from 'joi';

export class SearchQueryDto {

    @Transform(({ value }) => (value as string).toLocaleUpperCase())
    readonly sort?: 'ASC' | 'DESC';

    readonly count?: number;

    readonly title?: string;

    readonly body?: string;

    readonly tag?: string;

}

export const schemaFindAll = joi.object({
    sort: joi.string().valid('asc', 'desc').insensitive(),
    count: joi.number().min(1).max(1000)
})


