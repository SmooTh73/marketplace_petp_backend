import constants from '../../../constants';
import { ISearchOptions } from '../interfaces';


export class SearchOptionsDto {
    limit: number;
    title: string;
    page: number;
    priceRange: { low: number; high: number; }
    category?: string;
    brands?: string[];
    sortType: string;
    sort: boolean;

    constructor(options: ISearchOptions) {
        this.limit = options.limit || constants.searchOptions.LIMIT;
        this.page = options.page || constants.searchOptions.PAGE;
        this.title = options.title || null;
        this.priceRange = options.priceRange || constants.searchOptions.PRICE_RANGE;
        if (options.category) this.category = options.category;
        if (options.brands) this.brands = options.brands;
        this.sort = options.sort || constants.searchOptions.SORT;
        this.sortType = options.sortType || constants.searchOptions.SORT_TYPE;
    }
}