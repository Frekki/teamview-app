export interface SPChartConfig {
    settings: { fill: string, interpolation: string };
    dataset: Array<{x: string, y: number}>
}