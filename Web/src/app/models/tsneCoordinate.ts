export class TsneCoordinate {
    Id: string;
    X: number;
    Y: number;
    PatientId: string;

    constructor(
        id: string = "",
        x: number = 0,
        y: number = 0,
        patientId: string = ""
    ) {
        this.Id = id,
        this.X = x,
        this.Y = y,
        this.PatientId = patientId
    }
}