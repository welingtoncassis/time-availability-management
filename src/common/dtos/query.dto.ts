import { IsOptional, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

const transformFields = (value: any = {}) => {
  return JSON.parse(value).reduce(
    (acc: any, cur: string) => ({ ...acc, [cur]: 1 }),
    {},
  );
};

const transformFilters = (value: any = {}) => {
  return JSON.parse(value);
};

const transformSort = (value: any = {}) => JSON.parse(value);

export class QueryDto {
  @IsOptional()
  @Transform(transformFields, { toClassOnly: true })
  fields?: { [key: string]: number };

  @IsOptional()
  @Transform(transformFilters, { toPlainOnly: true })
  filter?: { [key: string]: any };

  @IsOptional()
  @Transform(transformSort, { toClassOnly: true })
  sort?: { [key: string]: number };

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  skip?: number;
}
