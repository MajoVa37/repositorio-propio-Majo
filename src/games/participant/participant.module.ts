import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Participant } from '../entities/participant.entity';
import { Session } from '../entities/session.entity';
import { User } from '@/auth/entities/user.entity';

import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
    controllers: [ParticipantController],
    providers: [ParticipantService],
    imports: [TypeOrmModule.forFeature([Participant, Session, User])],
})
export class ParticipantModule {}
