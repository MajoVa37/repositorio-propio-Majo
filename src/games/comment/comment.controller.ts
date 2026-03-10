import { Controller, Get, Param } from '@nestjs/common';

import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.commentService.findById(+id);
    }
}
