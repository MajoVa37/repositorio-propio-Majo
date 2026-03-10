import { Controller, Get, Param } from '@nestjs/common';

import { RolePermissionService } from './role-permission.service';

@Controller('role-permission')
export class RolePermissionController {
    constructor(private readonly rolePermissionService: RolePermissionService) {}

    @Get()
    findAll() {
        return this.rolePermissionService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.rolePermissionService.findById(+id);
    }
}
