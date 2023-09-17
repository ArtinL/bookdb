interface IDisplay {
    type: string;
    id: string;
    displayName: string;
    creators: string[];
    date: string;
    averageRating: number;
    ratingsCount: number;
    thumbnail: string;
}

export class GenericItem {
    type: string = '';
    id: string = '';
    displayName: string = '';
    creators: string[] = [''];
    date: string = '';
    averageRating: number = 0;
    ratingsCount: number = 0;
    thumbnail: string = '';

    constructor(item: IDisplay);
    constructor();

    constructor(item?: IDisplay) {
        if (!item) return;
        this.type = item.type;
        this.id = item.id;
        this.displayName = item.displayName;
        this.creators = item.creators;
        this.date = item.date;
        this.averageRating = item.averageRating;
        this.ratingsCount = item.ratingsCount;
        this.thumbnail = item.thumbnail;
    }

}