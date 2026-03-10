import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/auth/entities/user.entity';

import { Participant } from '../entities/participant.entity';
import { Session } from '../entities/session.entity';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findAll() {
        return this.participantRepository.find();
    }

    findById(id: number) {
        return this.participantRepository.findOneBy({ id });
    }

    async create(createParticipantDto: CreateParticipantDto) {
        const session = await this.sessionRepository.findOneBy({ id: createParticipantDto.session_id });
        const user = await this.userRepository.findOneBy({ id: createParticipantDto.user_id });
        if (!session || !user) {
            throw new Error('Session or User not found');
        }

        const newParticipant = this.participantRepository.create({
            score: createParticipantDto.score,
            position: createParticipantDto.position,
            isWinner: createParticipantDto.isWinner,
            session,
            user,
        });
        return this.participantRepository.save(newParticipant);
    }

    async update(id: number, updateParticipantDto: UpdateParticipantDto) {
        const participant = await this.participantRepository.findOneBy({ id });
        if (!participant) {
            throw new Error('Participant not found');
        }

        if (updateParticipantDto.session_id) {
            participant.session = { id: updateParticipantDto.session_id } as Session;
        }
        if (updateParticipantDto.user_id) {
            participant.user = { id: updateParticipantDto.user_id } as User;
        }
        if (updateParticipantDto.score !== undefined) {
            participant.score = updateParticipantDto.score;
        }
        if (updateParticipantDto.position !== undefined) {
            participant.position = updateParticipantDto.position;
        }
        if (updateParticipantDto.isWinner !== undefined) {
            participant.isWinner = updateParticipantDto.isWinner;
        }

        return this.participantRepository.save(participant);
    }

    async remove(id: number) {
        const result = await this.participantRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
}
