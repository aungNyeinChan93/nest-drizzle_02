/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "../types/categories-types";

export class CreateCategoryDto implements Category {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    id: string;

    @IsOptional()
    created_at: Date | null;

    @IsOptional()
    updated_at: Date | null;
}
