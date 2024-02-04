export interface TeamAveragesDTO {
    id: number;
    eventCode: string;
    teamNumber: number;
    autoBumpAvg: number | null
    autoFlatAvg: number | null
    autoMiddleAvg: number | null
    autoMiddleEngage: number | null
    teleLowAvg: number;
    teleMidAvg: number;
    teleHighAvg: number;
    totalTeleAvg: number;
    autoBumpAttempts: number;
    autoFlatAttempts: number;
    autoMiddleAttempts: number;
    numMatches: number;
    autoChargeStation: number;
    endChargeStation: number
}

