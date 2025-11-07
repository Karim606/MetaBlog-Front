import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PaginatedWithPagesResponse } from '../../../../shared/models/paginated-responses';

export interface Article{
id:string;
title:string;
content:string;
imageUrl:string|null;
userName:string;
likesCount:number;
commentsCount:number;
}



@Injectable({providedIn:'root'})

export class ArticleService{
private Api = environment.apiUrl;

constructor(private http:HttpClient){}

getArticles(PageNumber:number,PageSize:number):Observable<PaginatedWithPagesResponse<Article>>{

return this.http.get<PaginatedWithPagesResponse<Article>>(`${this.Api}v1/posts?pagenumber=${PageNumber}&pageSize=${PageSize}`);

}

}