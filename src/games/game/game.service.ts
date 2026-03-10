import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@/auth/entities/user.entity';

import { Game } from '../entities/game.entity';

import { UpdateGameDto } from './dto/update-game.dto';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findAll() {
        return this.gameRepository.find();
    }

    findById(id: number) {
        return this.gameRepository.findOneBy({ id });
    }

    async create(createGameDto: CreateGameDto) {
        const user = await this.userRepository.findOneBy({ id: createGameDto.createdById });
        if (!user) {
            throw new Error('User not found');
        }

        const newGame = this.gameRepository.create({
            name: createGameDto.name,
            description: createGameDto.description,
            minPlayers: createGameDto.minPlayers,
            maxPlayers: createGameDto.maxPlayers,
            category: createGameDto.category,
            createdBy: user,
        });

        return this.gameRepository.save(newGame);
    }

    async update(id: number, updateGameDto: UpdateGameDto) {
        const game = await this.gameRepository.findOneBy({ id });
        if (!game) {
            throw new Error('Game not found');
        }

        if (updateGameDto.createdById) {
            game.createdBy = { id: updateGameDto.createdById } as User;
        }
        if (updateGameDto.name !== undefined) {
            game.name = updateGameDto.name;
        }
        if (updateGameDto.description !== undefined) {
            game.description = updateGameDto.description;
        }
        if (updateGameDto.minPlayers !== undefined) {
            game.minPlayers = updateGameDto.minPlayers;
        }
        if (updateGameDto.maxPlayers !== undefined) {
            game.maxPlayers = updateGameDto.maxPlayers;
        }
        if (updateGameDto.category !== undefined) {
            game.category = updateGameDto.category;
        }

        return this.gameRepository.save(game);
    }

    async remove(id: number) {
        const result = await this.gameRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
}
