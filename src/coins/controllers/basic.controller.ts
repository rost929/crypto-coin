import { Controller, Get } from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('base')
@Controller('base')
export class BaseController {
  constructor(private baseService: BaseService) {}

  @Get('/ping')
  @ApiOperation({ summary: 'Service to test API connection' })
  testConnection() {
    return this.baseService.pingConnection();
  }
}
