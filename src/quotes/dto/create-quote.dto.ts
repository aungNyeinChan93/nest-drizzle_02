/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Quote } from "../types/quotes.types";

export class CreateQuoteDto implements Quote {
    @IsOptional()
    id: string;

    @IsNotEmpty()
    @IsString()
    quote: string;

    @IsOptional()
    created_at: Date;

    @IsOptional()
    updated_at: Date;

    @IsString()
    author_id: string;

    @IsOptional()
    isActive: boolean | null;

    @IsOptional()
    categoryId: string
}
