import {Component} from '@angular/core'
import { HomeHeaderComponent } from "../header/header.component";
import { AppArticleComponent } from "../article/article.component";

@Component({

    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrl:'./home.component.css',
    imports: [HomeHeaderComponent, AppArticleComponent]
})

export class HomeComponent{}