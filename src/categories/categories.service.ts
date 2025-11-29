import { categoryTable } from './categories-schema';
/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './categories-schema'
import { eq } from 'drizzle-orm';
import { CreateCategoryAndQuote } from './types/categories-types';
@Injectable()
export class CategoriesService {

  constructor(
    @Inject('DRIZZLE') private readonly db: NodePgDatabase<typeof schema>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const [category] = await this.db.insert(schema?.categoryTable).values(createCategoryDto).returning()
    return category;
  }

  async findAll() {
    const categories = await this.db.query.categoryTable.findMany({
      with: {
        categoryQuote: {
          columns: { id: true },
          with: {
            quote: { columns: { quote: true } }
          }
        }
      },
      orderBy: (t, fns) => fns.desc(t.created_at)
    })
    return categories;
  }

  async findOne(id: string) {
    const category = await this.db.query.categoryTable.findFirst({
      where: eq(categoryTable?.id, id),
      with: {
        categoryQuote: {
          columns: { id: true },
          with: {
            quote: { columns: { quote: true } }
          }
        }
      }
    });
    if (!category) throw new NotFoundException('category not found')
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.db.update(categoryTable)
      .set({ ...updateCategoryDto })
      .where(eq(categoryTable?.id, id)).returning();
    return updateCategory;
  }

  async remove(id: string) {
    const [deleteCategory] = await this.db.delete(categoryTable).where(eq(categoryTable?.id, id)).returning();
    return `${deleteCategory?.name} was successfully deleted!`
  }

  async createCategoryWithQuote(createCategoryQuote: CreateCategoryAndQuote) {
    const [categoryQuote] = await this.db.insert(schema.categoryQuoteTable)
      .values({ category_id: createCategoryQuote?.categoryId, quote_id: createCategoryQuote?.quoteId })
      .returning();
    return categoryQuote;
  }
}
