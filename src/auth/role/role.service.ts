import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';

import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleServices {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        await this.roleRepository.update(id, updateRoleDto);
        return this.roleRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.roleRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }

    findAll() {
        return this.roleRepository.find();
    }

    findByName(name: string) {
        return this.roleRepository.findOneBy({ name });
    }

    findById(id: number) {
        return this.roleRepository.findOneBy({ id });
    }
}
