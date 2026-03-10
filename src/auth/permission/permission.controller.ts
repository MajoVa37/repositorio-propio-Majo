import { Controller, Get, Param } from '@nestjs/common';

import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    findAll() {
        return this.permissionService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.permissionService.findById(+id);
    }
}
