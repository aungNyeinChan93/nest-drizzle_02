/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Profile } from "../types/profile-types";
import { Type } from "class-transformer";



export class CreateProfileDto implements Profile {
    @IsOptional()
    id: string;

    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    isEmailVerfiy: boolean;

    @IsOptional()
    avator: string | null;

    @IsOptional()
    bio: string | null;

    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsOptional()
    timestamp: Date;

} 