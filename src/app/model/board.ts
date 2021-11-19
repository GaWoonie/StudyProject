export interface Board {
  idx: number;
  title:string;
  writer:string;
  content:string;
  writeDate : string;
  hit : number;
  state: number
}


export interface ListResponse {
  column : string;
  search_option : string;
  search_word : string;
  order : string;
  total: number;
  offset: number;
  items: Board[];
}
