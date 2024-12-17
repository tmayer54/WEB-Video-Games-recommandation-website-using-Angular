export class Game {
    //class Game, used to define the game object
    constructor(
        public ID: number = 0,
        public name: string = '',
        public description: string = '',
        public dev: number = 0, //ID of the developer
        public longDescription: string = '',
        public price: number = 0,
        public videoCode: string = '', //youtube video code
        public images: string[] = [''], //array of image paths
        public category: string[] = [''], //array of category names
        public cpu: string = '',
        public gpu: string = '',
        public ram: string = ''

    ) {
        this.ID = ID,
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.price = price;
        this.dev = dev;
        this.videoCode = videoCode;
        this.cpu = cpu;
        this.gpu = gpu;
        this.ram = ram;
        this.images = images;
        this.category = category;
    }
}
