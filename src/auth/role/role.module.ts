import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';

import { RoleServices } from './role.service';
import { RoleController } from './role.controller';

@Module({
    providers: [RoleServices],
    imports: [TypeOrmModule.forFeature([Role])],
    exports: [RoleServices],
    controllers: [RoleController],
})
export class RoleModule {}
