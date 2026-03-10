import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { RoleServices } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        private readonly roleService: RoleServices,
        private readonly permissionService: PermissionService,
    ) {}

    findAll() {
        return this.rolePermissionRepository.find();
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
        const rolePermission = await this.rolePermissionRepository.findOneBy({ id });
        if (!rolePermission) {
            throw new Error('RolePermission not found');
        }

        if (updateRolePermissionDto.role_id) {
            rolePermission.role = { id: updateRolePermissionDto.role_id } as Role;
        }

        if (updateRolePermissionDto.permission_id) {
            rolePermission.permission = { id: updateRolePermissionDto.permission_id } as Permission;
        }

        return this.rolePermissionRepository.save(rolePermission);
    }

    async remove(id: number) {
        const result = await this.rolePermissionRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }

    async create(createRolePermissionDto: CreateRolePermissionDto) {
        const role = await this.roleService.findById(createRolePermissionDto.role_id);
        const permission = await this.permissionService.findById(createRolePermissionDto.permission_id);
        if (!role || !permission) {
            throw new Error('Role or Permission not founded');
        }

        const newRolePermission = this.rolePermissionRepository.create({
            permission: { id: createRolePermissionDto.permission_id },
            role: { id: createRolePermissionDto.role_id },
        });

        return this.rolePermissionRepository.save(newRolePermission);
    }

    findById(id: number) {
        return this.rolePermissionRepository.findOneBy({ id });
    }
}
