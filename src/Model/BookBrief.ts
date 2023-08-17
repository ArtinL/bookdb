export class BookBrief {
    id: string;
    title: string;
    authors: string[];
    publishedDate: string;
    smallThumbnail: string;

    constructor(data: {
        id: string,
        title: string;
        authors: string[];
        publishedDate: string;
        smallThumbnail: string;
    }) {
        this.id = data.id;
        this.title = data.title;
        this.authors = data.authors;
        this.publishedDate = data.publishedDate;
        this.smallThumbnail = data.smallThumbnail;
    }
}