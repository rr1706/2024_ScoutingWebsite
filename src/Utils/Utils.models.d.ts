export interface formItem {
    id: int;
    name: int;
}

export interface EventDTO {
    eventCode: string;
    eventName: string;
    year: number;
    tbaCode: string;
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
    teleSpeaker: number;
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
    ignore: number = 0;
}

export interface matchDataDTO_2025 {
    id: number;
    eventCode: string;
    teamNumber: number;
    matchNumber: number;
    coralL1: number;
    coralL2: number;
    coralL3: number;
    coralL4: number;
    autoCoralL1: number;
    autoCoralL2: number;
    autoCoralL3: number;
    autoCoralL4: number;
    processor: number;
    autoProcessor: number;
    endClimb: string;
    groundAlgae: number;
    reefAlgae: number;
    autoGroundAlgae: number;
    autoReefAlgae: number;
    barge: number;
    autoBarge: number;
    defence: number;
    defended: number;
    mobilitize: number;
    gambleAmount: number;
    notes: string;
    gambleColor: string;
    scoutName: string;
    ignore: number; 
    autoPosition?: string
}

export interface TeamAveragesDTO_2025 {
    id?: number;
    eventCode?: string;
    teamNumber?: number;
    averageAutoCoral: number;
    averageTeleCoral: number;
    averageReefRemoval: number;
    averageBargeAll: number;
    averageProcessorAll: number;
    successfulDeepClimb: number;
    totalDeepClimb: number;
    successfulShallowClimb: number;
    totalShallowClimb: number;
    percentMoblilitize: number;
    totalPoints: number;
    numMatches?: number;
    isDNPed?: number;
    sideAuto?: number;
    middleAuto?: number;
    sideAutoCount?: number;
    middleAutoCount?: number;
    offensiveCount?: number;
    defendedScored?: number;
    unDefendedScored?: number;
    defendedCount?: number;
    unDefendedCount?: number;
    totalTeleScore?: number;
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
    maxFeeds?: number;
    closeAutoPercent?: number;
    closeAutoAttempts?: number;
    closeAutoSuccessRate?: number;
    isDNPed?: number;
}