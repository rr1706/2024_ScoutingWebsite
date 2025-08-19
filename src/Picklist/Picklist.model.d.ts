export interface PicklistOrderDTO {
    id: number;
    eventCode: string;
    teamNumber: number;
    order: number;
    isDNPed?: number;
}
export interface ColumnsSelectedDTO
{
    sideCoralAuto: boolean;
    middleCoralAuto: boolean;
    middleNetAuto: boolean;
    teleCoral: boolean;
    barge: boolean;
    processor: boolean;
    totalTele: boolean;
    totalTeleAdjusted: boolean;
    deepClimb: boolean;
}
