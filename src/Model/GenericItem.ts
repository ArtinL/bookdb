export interface IDisplay {
    type: string;
    id: string;
    title: string;
    creators: string[];
    date: string;
    averageRating: number;
    ratingsCount: number;
    thumbnail: string;
}

export class GenericItem {
    type: string = '';
    id: string = '';
    title: string = '';
    creators: string[] = [''];
    date: string = '';
    averageRating: number = 0;
    ratingsCount: number = 0;
    thumbnail: string = '';

    constructor(item: IDisplay | undefined);
    constructor();

    constructor(item?: IDisplay) {
        if (!item) return;
        this.type = item.type;
        this.id = item.id;
        this.title = item.title;
        this.creators = item.creators;
        this.date = item.date;
        this.averageRating = item.averageRating;
        this.ratingsCount = item.ratingsCount;
        this.thumbnail = item.thumbnail;
    }

}