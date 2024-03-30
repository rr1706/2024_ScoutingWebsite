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
    comment?: string
    autoPreload?: string;
    autoClose1?: string;
    autoClose2?: string;
    autoClose3?: string;
    autoCenter1?: string;
    autoCenter2?: string;
    autoCenter3?: string;
    autoCenter4?: string;
    autoCenter5?: string;
    autoClose1Order?: number;
    autoClose2Order?: number;
    autoClose3Order?: number;
    autoCenter1Order?: number;
    autoCenter1Order?: number;
    autoCenter2Order?: number;
    autoCenter3Order?: number;
    autoCenter4Order?: number;
    autoCenter5Order?: number;
    teleFeeds: ?number;
    scoutName: string;
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
    closeAutoAvg?: number;
    closeAutoNum?: number;
    feedAvg?: number;
    centerAutoAvg?: number;
    centerAutoNum?: number;
}