import { SessionStatus } from '../../entities/session.entity';

export class CreateSessionDto {
    game_id: number;
    host_id: number;
    status?: SessionStatus;
    notes?: string;
}
