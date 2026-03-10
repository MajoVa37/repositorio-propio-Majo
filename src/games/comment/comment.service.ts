/* eslint-disable import/order */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/auth/entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { Game } from '../entities/game.entity';

import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
    ) {}

    findAll() {
        return this.commentRepository.find();
    }

    findById(id: number) {
        return this.commentRepository.findOneBy({ id });
    }

    async create(createCommentDto: CreateCommentDto) {
        const user = await this.userRepository.findOneBy({ id: createCommentDto.user_id });
        const game = await this.gameRepository.findOneBy({ id: createCommentDto.game_id });
        if (!user || !game) {
            throw new Error('User or Game not found');
        }

        const newComment = this.commentRepository.create({
            content: createCommentDto.content,
            user,
            game,
        });

        return this.commentRepository.save(newComment);
    }

    async update(id: number, updateCommentDto: UpdateCommentDto) {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) {
            throw new Error('Comment not found');
        }

        if (updateCommentDto.user_id) {
            comment.user = { id: updateCommentDto.user_id } as User;
        }
        if (updateCommentDto.game_id) {
            comment.game = { id: updateCommentDto.game_id } as Game;
        }
        if (updateCommentDto.content !== undefined) {
            comment.content = updateCommentDto.content;
        }

        return this.commentRepository.save(comment);
    }

    async remove(id: number) {
        const result = await this.commentRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }
}
