import { GameCategory } from '../../entities/game.entity';

export class CreateGameDto {
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    category: GameCategory;
    createdById: number;
}
