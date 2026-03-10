import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/auth/entities/user.entity';

import { Comment } from '../entities/comment.entity';
import { Game } from '../entities/game.entity';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
    controllers: [CommentController],
    providers: [CommentService],
    imports: [TypeOrmModule.forFeature([Comment, User, Game])],
})
export class CommentModule {}
