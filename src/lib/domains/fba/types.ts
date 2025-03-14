import type { Movements } from "../profile/types/types"

export interface League {
    id: number
    seed: number
    openTime: Date
    executeTime: Date
}

export interface LeagueParticipant {
    movement: Movements,
    tokenId:number,
    badgeId:number,
    tokenUri:string,
    points?: number
}
