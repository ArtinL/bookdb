interface IBookBrief {
    id: string;
    title: string;
    authors: string[];
    publishedDate: string;
    smallThumbnail: string;
    averageRating: number;
    ratingsCount: number;
}

export class BookBrief {
    id: string = '';
    title: string = '';
    authors: string[] = [];
    publishedDate: string = '';
    smallThumbnail: string = '';
    averageRating: number = 0;
    ratingsCount: number = 0;

    constructor(data: IBookBrief);
    constructor();

    constructor(data?: IBookBrief) {
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.authors = data.authors;
            this.publishedDate = data.publishedDate;
            this.smallThumbnail = data.smallThumbnail;
            this.averageRating = data.averageRating;
            this.ratingsCount = data.ratingsCount;
        }
    }
}