/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema'

@Module({
    providers: [
        {
            provide: 'DRIZZLE',
            useFactory(configService: ConfigService) {
                const pool = new Pool({
                    connectionString: configService?.getOrThrow<string>('DATABASE_URL')
                });
                const db = drizzle({ client: pool, schema })
                return db;
            },
            inject: [ConfigService]
        },
    ],
    exports: ['DRIZZLE'],

})
export class DrizzleModule { }


