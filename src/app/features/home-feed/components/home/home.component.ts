import {Component, OnInit} from '@angular/core'
import { HomeHeaderComponent } from "../header/header.component";
import { AppArticleComponent } from "../article/article.component";
import { Article, ArticleService } from '../services/articleservice';

@Component({

    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrl:'./home.component.css',
    imports: [HomeHeaderComponent, AppArticleComponent]
})

export class HomeComponent implements OnInit{

    articles:Article[]=[];
    page=1;
    pageSize=10;
    pageNumber=1;
    totalPages=0;
    totalCount=0;

    pages:number[]=[];
    constructor(private articleService:ArticleService){}

    ngOnInit(): void {
        this.LoadArticles();
    }
    
    LoadArticles(){
        this.articleService.getArticles(this.pageNumber,this.pageSize).subscribe({
            next:(res)=>{
                this.articles=res.items;
                this.totalPages=res.totalPages;
                this.totalCount=res.totalCount;
                this.pages=Array.from({length:this.totalPages},(_,i)=>i+1);
            },
            error:(err)=> console.error('Failed to load articles',err)
            }
        )
    }

    changePage(pageNum: number) {
    if (pageNum !== this.page) {
      this.page = pageNum;
      this.LoadArticles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    }

}