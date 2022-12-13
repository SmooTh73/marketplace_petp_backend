import constants from '../../../constants';
import { ISearchOptions } from '../interfaces';


export class SearchOptionsDto {
    limit: number;
    title: string;
    page: number;
    rating: number;
    priceRange: { low: number; high: number; }
    category?: string;
    brands?: string[];
    order?: string;
    orderDirection?: string;

    constructor(options: ISearchOptions) {
        this.limit = options.limit || constants.searchOptions.LIMIT;
        this.page = options.page || constants.searchOptions.PAGE;
        this.title = options.title || '';
        this.priceRange = options.priceRange || constants.searchOptions.PRICE_RANGE;
        if (options.category) this.category = options.category;
        this.brands = options.brands || [];
        this.order =  options.order || constants.searchOptions.ORDER;
        this.orderDirection = options.orderDirection || constants.searchOptions.ORDER_DIRECTION;
        this.rating = options.rating || constants.searchOptions.RATING;
    }
}