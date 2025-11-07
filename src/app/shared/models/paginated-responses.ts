export interface PaginatedWithPagesResponse<T>{
    items:T[];
    pageNumber:number;
    pageSize:number;
    totalPages:number;
    totalCount:number
}