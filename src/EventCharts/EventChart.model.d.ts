
export interface ScatterDTO {
    datasets: ScatterChartDataset[];
}
export interface ScatterChartDataset {
    label: string;
    data: Point[];
    backgroundColor: string;
}

export interface ScatterPoint {
    x: number;
    y: number;
}

