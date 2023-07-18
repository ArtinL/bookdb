export class Book {
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
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
    }
    language: string;
    previewLink: string;

    constructor(data: {
        id: string, volumeInfo: {
            title: string;
            authors: string[];
            publishedDate: string;
            publisher: string;
            description: string;
            pageCount: number;
            categories: string[];
            averageRating: number;
            ratingsCount: number;
            imageLinks: {
                smallThumbnail: string;
                thumbnail: string;
            }
            language: string;
            previewLink: string;
        }
    }) {
        this.id = data.id;
        this.title = data.volumeInfo.title;
        this.authors = data.volumeInfo.authors;
        this.publishedDate = data.volumeInfo.publishedDate;
        this.publisher = data.volumeInfo.publisher;
        this.description = data.volumeInfo.description;
        this.pageCount = data.volumeInfo.pageCount;
        this.categories = data.volumeInfo.categories;
        this.averageRating = data.volumeInfo.averageRating;
        this.ratingsCount = data.volumeInfo.ratingsCount;
        this.imageLinks = data.volumeInfo.imageLinks;
        this.language = data.volumeInfo.language;
        this.previewLink = data.volumeInfo.previewLink;
    }
}