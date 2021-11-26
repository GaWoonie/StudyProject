export interface Board {
  num : number;
  idx:number;
  title:string;
  writer:string;
  content:string;
  writeDate : string;
  hit : number;
  state: number;
  id : string;
  group_idx : number;
  group_depth : number;
  group_order : number;
  reply : string;
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

export interface Comments {
  idxComments : number;
  id : string;
  comment : string;
  depth : number;
  order : number;
  parentIdx : number;
  postidx : number;
  status : number;
  created_at : any;
  updated_at : any;
  deleted_at : any;
}

export interface Add_Comment {
  comment : string;
  depth : number;
  parentIdx : number;
  postidx : number;
  id : string;
}
