import {Component} from '@angular/core'

@Component({

    selector:'app-article',
    templateUrl:'./article.component.html',
    styleUrl:'./article.component.css'
})

export class AppArticleComponent{

    reacts=[
        {icon:"fa-regular fa-heart",totalNum:0},
        {icon:"fa-regular fa-comment",totalNum:0}
    ]
}