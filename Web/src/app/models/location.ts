export class Location {
    Id: number;
    Name: string;

    constructor(
        id: number = 0,
        name: string = ""
    ) {
        this.Id = id,
        this.Name = name
    }
}