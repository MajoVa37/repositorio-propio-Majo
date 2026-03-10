import { Controller, Get, Param } from '@nestjs/common';

import { RoleServices } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleServices) {}

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.roleService.findById(+id);
    }
}
