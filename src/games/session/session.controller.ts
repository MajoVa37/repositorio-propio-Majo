import { Controller, Get, Param } from '@nestjs/common';

import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Get()
    findAll() {
        return this.sessionService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.sessionService.findById(+id);
    }
}
