export interface matchDataDTO {
    id?: number;
    eventCode: string;
    teamNumber: number;
    matchNumber: number;
    startingPosition: string;
    autoLow: number; 
    autoMid: number;
    autoHigh: number;
    autoChargeStation: string;
    teleLow: number;
    teleMid: number;
    teleHigh: number;
    endChargeStation: string;
    comments?: string
}

