import {GenericItem, IDisplay} from "./GenericItem";

interface IBookDetail extends IDisplay {
    publisher: string;
    description: string;
    pageCount: number;
    categories: string[];
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

export class BookDetail extends GenericItem {

    publisher: string = '';
    description: string = '';
    pageCount: number = 0;
    categories: string[] = [];
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
        super(data);

        if (!data) return;

        this.publisher = data.publisher;
        this.description = data.description;
        this.pageCount = data.pageCount;
        this.categories = data.categories;
        this.averageRating = data.averageRating;
        this.ratingsCount = data.ratingsCount;
        this.language = data.language;
        this.previewLink = data.previewLink;
        this.saleInfo = data.saleInfo;
    }
}