import { Histology } from "./histology";
import { Location } from "./location";
import { Subgroup } from "./subgroup";
import { TissueType } from "./tissueType";

export class Patient {
    Id: string;
    FileName: string;
    Histology: Histology;
    Location: Location;
    Subgroup: Subgroup;
    TissueType: TissueType;

    constructor(
        id: string = "",
        fileName: string = ""
    ) {
        this.Id = id,
        this.FileName = fileName
    }
}