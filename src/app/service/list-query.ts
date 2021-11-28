

export type Sort = 'asc' | 'desc';

export interface ListQuery {
  search_option: string;
  search_word: string;

  sort_option: string;
  sorting: Sort;
}
/*export type sort_option = 'hit' | 'idx';*/

export type Request = 'daily' | 'weekly' | 'monthly';

export interface DateQuery {
  request : Request;
  offset_date : string;
  limit_date : string;
}
