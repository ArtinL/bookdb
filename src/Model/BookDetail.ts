export class BookDetail {
    id: string;
    title: string;
    authors: string[];
    publishedDate: string;
    publisher: string;
    description: string;
    pageCount: number;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    largeThumbnail: string;
    language: string;
    previewLink: string;

    constructor(data: {
        id: string, title: string; authors: string[]; publishedDate: string; publisher: string;
        description: string; pageCount: number; categories: string[]; averageRating: number;
        ratingsCount: number; largeThumbnail: string; language: string; previewLink: string;
    }) {
        this.id = data.id;
        this.title = data.title;
        this.authors = data.authors;
        this.publishedDate = data.publishedDate;
        this.publisher = data.publisher;
        this.description = data.description;
        this.pageCount = data.pageCount;
        this.categories = data.categories;
        this.averageRating = data.averageRating;
        this.ratingsCount = data.ratingsCount;
        this.largeThumbnail = data.largeThumbnail;
        this.language = data.language;
        this.previewLink = data.previewLink;
    }
}