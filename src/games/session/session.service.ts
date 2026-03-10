import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/auth/entities/user.entity';

import { Session } from '../entities/session.entity';
import { Game } from '../entities/game.entity';

import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findAll() {
        return this.sessionRepository.find();
    }

    findById(id: number) {
        return this.sessionRepository.findOneBy({ id });
    }

    async create(createSessionDto: CreateSessionDto) {
        const game = await this.gameRepository.findOneBy({ id: createSessionDto.game_id });
        const host = await this.userRepository.findOneBy({ id: createSessionDto.host_id });
        if (!game || !host) {
            throw new Error('Game or Host user not found');
        }

        const newSession = this.sessionRepository.create({
            status: createSessionDto.status,
            notes: createSessionDto.notes,
            game,
            host,
        });
        return this.sessionRepository.save(newSession);
    }

    async update(id: number, updateSessionDto: UpdateSessionDto) {
        const session = await this.sessionRepository.findOneBy({ id });
        if (!session) {
            throw new Error('Session not found');
        }

        if (updateSessionDto.game_id) {
            session.game = { id: updateSessionDto.game_id } as Game;
        }
        if (updateSessionDto.host_id) {
            session.host = { id: updateSessionDto.host_id } as User;
        }
        if (updateSessionDto.status !== undefined) {
            session.status = updateSessionDto.status;
        }
        if (updateSessionDto.notes !== undefined) {
            session.notes = updateSessionDto.notes;
        }

        return this.sessionRepository.save(session);
    }

    async remove(id: number) {
        const result = await this.sessionRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
}
