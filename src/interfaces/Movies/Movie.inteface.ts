export interface movie {
    title:string,
    publishingYear:number,
    poster:string,
    _id?:string
}

export interface PaginatedMovies {

    page: number; 
    pageSize: number; 
    total: number; 
  
}