import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Permission } from '../entities/permission.entity';

import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    findAll() {
        return this.permissionRepository.find();
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        await this.permissionRepository.update(id, updatePermissionDto);
        return this.permissionRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.permissionRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }

    create(CreatePermissionDto: CreatePermissionDto) {
        const newPermission = this.permissionRepository.create({
            ...CreatePermissionDto,
        });
        return this.permissionRepository.save(newPermission);
    }

    findById(id: number) {
        return this.permissionRepository.findOneBy({ id });
    }
}
