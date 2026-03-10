import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { RoleServices } from '../role/role.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleServices,
    ) {}

    findAll() {
        return this.userRepository.find();
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }

    async create(createUserDto: CreateUserDto) {
        const role = await this.roleService.findByName(createUserDto.roleName);
        if (!role) {
            throw new Error('Role not found');
        }

        const newUser = this.userRepository.create({
            ...createUserDto,
            role,
        });

        return this.userRepository.save(newUser);
    }

    findById(id: number) {
        return this.userRepository.findOneBy({ id });
    }
}
