import { Controller, Get, Param } from '@nestjs/common';

import { ParticipantService } from './participant.service';

@Controller('participant')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) {}

    @Get()
    findAll() {
        return this.participantService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.participantService.findById(+id);
    }
}
