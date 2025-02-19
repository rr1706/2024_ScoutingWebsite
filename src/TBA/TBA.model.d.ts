export interface TBAMatch_2025 {
    actual_time: number;
    alliances: Alliances;
    comp_level: string;
    event_key: string;
    key: string;
    match_number: number;
    post_result_time: number | null;
    predicted_time: number | null;
    score_breakdown: ScoreBreakdown;
    set_number: number | null;
    time: number | null;
    videos: Video[];
    winning_alliance: string;
}

export interface Alliances {
    blue: Alliance;
    red: Alliance;
}

export interface Alliance {
    dq_team_keys: string[];
    score: number;
    surrogate_team_keys: string[];
    team_keys: string[];
}

export interface ScoreBreakdown {
    blue: Breakdown;
    red: Breakdown;
}

export interface Breakdown {
    adjustPoints: number;
    algaePoints: number;
    autoBonusAchieved: boolean;
    autoCoralCount: number;
    autoCoralPoints: number;
    autoLineRobot1: string;
    autoLineRobot2: string;
    autoLineRobot3: string;
    autoMobilityPoints: number;
    autoPoints: number;
    autoReef: Reef;
    bargeBonusAchieved: boolean;
    coopertitionCriteriaMet: boolean;
    coralBonusAchieved: boolean;
    endGameBargePoints: number;
    endGameRobot1: string;
    endGameRobot2: string;
    endGameRobot3: string;
    foulCount: number;
    foulPoints: number;
    g206Penalty: boolean;
    g408Penalty: boolean;
    g424Penalty: boolean;
    netAlgaeCount: number;
    rp: number;
    techFoulCount: number;
    teleopCoralCount: number;
    teleopCoralPoints: number;
    teleopPoints: number;
    teleopReef: Reef;
    totalPoints: number;
    wallAlgaeCount: number;
    autoL1: number;
    autoL2: number;
    autoL3: number;
    autoL4: number;
    teleL1: number;
    teleL2: number;
    teleL3: number;
    teleL4: number;
}

export interface Reef {
    botRow: Row;
    midRow: Row;
    topRow: Row;
    trough: number;
}

export interface Row {
    nodeA: boolean;
    nodeB: boolean;
    nodeC: boolean;
    nodeD: boolean;
    nodeE: boolean;
    nodeF: boolean;
    nodeG: boolean;
    nodeH: boolean;
    nodeI: boolean;
    nodeJ: boolean;
    nodeK: boolean;
    nodeL: boolean;
}

export interface Video {
    key: string;
    type: string;
}

