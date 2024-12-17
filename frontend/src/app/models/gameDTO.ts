export class GameDTO {
    constructor(
        public ID: number,
        public name: string,
        public description: string,
        public dev: number,
        public longDescription: string,
        public price: number,

        
    ) {
        this.ID = ID,
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.price = price;
        this.dev = dev;

    }
}
