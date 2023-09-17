import {GenericItem} from "./GenericItem";

interface IBookDetail {
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
    saleInfo: SaleInfo;
}

interface SaleInfo {
    country: string;
    saleability: boolean;
    retailPrice: number;
    buyLink: string;
}

export class BookDetail {
    id: string = '';
    title: string = '';
    authors: string[] = [];
    publishedDate: string = '';
    publisher: string = '';
    description: string = '';
    pageCount: number = 0;
    categories: string[] = [];
    averageRating: number = 0;
    ratingsCount: number = 0;
    largeThumbnail: string = '';
    language: string = '';
    previewLink: string = '';
    saleInfo: SaleInfo = {
        country: '',
        saleability: false,
        retailPrice: 0,
        buyLink: ''
    }

    constructor(data: IBookDetail);
    constructor();

    constructor(data?: IBookDetail) {
        if (!data) return;

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
        this.saleInfo = data.saleInfo;
    }
}