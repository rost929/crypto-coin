import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoinsService } from '../../coins/services/coins.service';
import { CategoryMarket } from '../entities/category-market.entity';
import { Category } from '../entities/category.entity';
const axios = require('axios');

@Injectable()
export class CategoriesService {
  constructor(
    private configService: ConfigService,
    private coinsService: CoinsService,
  ) {}

  async getCategories(): Promise<Category[]> {
    try {
      const BASE_URL = this.configService.get('BASE_API_URL');
      const result = await axios.get(`${BASE_URL}/coins/categories/list`);
      const categories: Category[] = result.data;
      return categories;
    } catch (error) {
      throw new Error('Error getting categories');
    }
  }

  async getCategoriesByMarket(order: string): Promise<CategoryMarket[]> {
    try {
      const BASE_URL = this.configService.get('BASE_API_URL');
      const result = await axios.get(
        `${BASE_URL}/coins/categories?order=${order}`,
      );
      const categories: CategoryMarket[] = result.data;
      return categories;
    } catch (error) {
      throw new Error('Error getting categories');
    }
  }
}
