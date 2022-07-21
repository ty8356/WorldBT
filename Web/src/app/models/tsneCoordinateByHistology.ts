import { TsneCoordinate } from "./tsneCoordinate";

export class TsneCoordinateByHistology {
    Histology: string;
    TsneCoordinates: Array<TsneCoordinate>

    constructor(
        histology: string = "",
        tsneCoordinates: Array<TsneCoordinate> = []
    ) {
        this.Histology = histology,
        this.TsneCoordinates = tsneCoordinates
    }
}