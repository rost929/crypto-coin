import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all categories' })
  getCategories() {
    console.log('Enter first endpoint');

    return this.categoryService.getCategories();
  }

  @Get('market')
  @ApiOperation({ summary: 'Get all categories by order criteria' })
  getCategoriesByMarket(@Query('order') order: string) {
    return this.categoryService.getCategoriesByMarket(order);
  }
}
