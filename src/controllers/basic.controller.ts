import { Controller, Get } from "@nestjs/common";
import { BaseService } from "../services/base.service";


@Controller('base')
export class BaseController {
    constructor(private baseService: BaseService) {}

    @Get('/ping')
    testConnection() {
        return this.baseService.pingConnection();
    }
}