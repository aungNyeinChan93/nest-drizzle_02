/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './quotes.schema'
import { eq } from 'drizzle-orm';
import { UpdateQuote } from './types/quotes.types';
import { categoryQuoteTable } from 'src/categories/categories-schema';


@Injectable()
export class QuotesService {

  constructor(
    @Inject('DRIZZLE') private readonly db: NodePgDatabase<typeof schema>
  ) { }

  async create(createQuoteDto: CreateQuoteDto) {
    const [quote] = await this.db.insert(schema?.quoteTable)
      .values({ ...createQuoteDto })
      .returning();

    if (createQuoteDto?.categoryId) {
      await this.db.insert(categoryQuoteTable).values({
        quote_id: quote?.id,
        category_id: createQuoteDto?.categoryId
      })
    }
    return quote;
  }

  async findAll() {
    const quotes = await this.db.query.quoteTable.findMany({
      with: {
        user: true,
        categoryQuote: {
          columns: { id: true },
          with: { category: { columns: { name: true } }, quote: { columns: { quote: true } } },

        }
      },
      orderBy: (table, fns) => fns.desc(table?.created_at)
    })
    return quotes;
  }

  async findOne(id: string) {
    const quote = await this.db.query.quoteTable.findFirst({
      where: eq(schema.quoteTable?.id, id),
      with: {
        user: {
          columns: { name: true, id: true },
          with: { profile: true }
        },
        categoryQuote: {
          columns: { id: true },
          with: { category: { columns: { name: true } }, quote: { columns: { quote: true } } }
        }
      }
    })
    return quote;
  }

  async update(id: string, updateQuoteDto: UpdateQuote) {
    const [updateQuote] = await this.db.update(schema.quoteTable).set({ ...updateQuoteDto, isActive: true })
      .where(eq(schema.quoteTable?.id, id))
      .returning();
    return updateQuote;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
