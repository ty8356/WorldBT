import { Patient } from "./patient";

export class TsneCoordinate {
    Id: string;
    X: number;
    Y: number;
    Patient: Patient;

    constructor(
        id: string = "",
        x: number = 0,
        y: number = 0
    ) {
        this.Id = id,
        this.X = x,
        this.Y = y
    }
}