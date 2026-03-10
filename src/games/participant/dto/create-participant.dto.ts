export class CreateParticipantDto {
    session_id: number;
    user_id: number;
    score: number;
    position: number;
    isWinner: boolean;
}
