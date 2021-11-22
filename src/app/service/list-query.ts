

export type Sort = 'asc' | 'desc';

export interface ListQuery {
  search_option: string;
  search_word: string;

  sort_option: string;
  sorting: Sort;
}
/*export type sort_option = 'hit' | 'idx';*/

