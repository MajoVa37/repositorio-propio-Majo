import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/auth/entities/user.entity';

import { Game } from '../entities/game.entity';

import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
    controllers: [GameController],
    providers: [GameService],
    imports: [TypeOrmModule.forFeature([Game, User])],
})
export class GameModule {}
