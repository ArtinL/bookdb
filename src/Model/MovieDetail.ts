import {GenericItem, IDisplay} from "./GenericItem";

interface IMovieDetail extends IDisplay {
    genres: string[];
    mpaaRated: string;
    runtime: number;
    writers: string[];
    starring: string[];
    awards: string;
    plot: string;
    languages: string[];
}

export class MovieDetail extends GenericItem {
    genres: string[] = [];
    mpaaRated: string = '';
    runtime: number = 0;
    writers: string[] = [];
    starring: string[] = [];
    awards: string = '';
    plot: string = '';
    languages: string[] = [];

    constructor(data: IMovieDetail);
    constructor();

    constructor(data?: IMovieDetail) {
        super(data);

        if (!data) return;

        this.id = data.id;
        this.genres = data.genres;
        this.mpaaRated = data.mpaaRated;
        this.runtime = data.runtime;
        this.writers = data.writers;
        this.starring = data.starring;
        this.awards = data.awards;
        this.plot = data.plot;
        this.averageRating = data.averageRating;
        this.ratingsCount = data.ratingsCount;
        this.languages = data.languages;
    }
}