import { ScatterDataPoint } from "chart.js";

export interface ScatterDataPointCustom extends ScatterDataPoint {
    location: string;
    subgroup: string;
    tissueType: string;
}