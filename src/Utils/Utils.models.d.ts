export interface formItem {
    id: int;
    name: int;
}

export interface EventDTO {
    eventCode: string;
    eventName: string;
}

export interface MatchDTO {
    eventCode: string;
    matchNumber: number;
    red1: number;
    red2: number;
    red3: number;
    blue1: number;
    blue2: number;
    blue3: number
}

export interface matchDataDTO_2024 {
    id?: number;
    eventCode?: string;
    teamNumber: number;
    matchNumber: number;
    autoAmp: number;
    autoSpeaker: number;
    teleAmp: number;
    teleSpeaker: string;
    teleTrap: number;
    climb: string;
    playedDefense: string;
    comment?: string
}

export interface TeamAveragesDTO_2024 {
    id?: number;
    eventCode?: string;
    teamNumber?: number;
    autoAmpAvg: number | null
    autoSpeakerAvg: number | null
    autoTotalAvg?: number | null
    teleAmpAvg: number | null
    teleSpeakerAvg: number;
    teleTrapAvg: number;
    teleTotalAvg: number;
    totalAvg?: number;
    climbPercent?: number;
    climbSuccessRate?: number;
    numMatches?: number;
    climbAttempts?: number;
    totalPoints: number;
}