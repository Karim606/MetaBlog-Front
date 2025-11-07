import {Component, Input, OnChanges, SimpleChanges} from '@angular/core'
import { Article } from '../services/articleservice';
@Component({

    selector:'app-article',
    templateUrl:'./article.component.html',
    styleUrl:'./article.component.css',

})

export class AppArticleComponent implements OnChanges{
    @Input()article!:Article;

    ngOnChanges(changes:SimpleChanges){
        if(changes['article']&&this.article){
            this.reacts[0].totalNum= this.article.likesCount||0;
            this.reacts[1].totalNum= this.article.commentsCount||0;
        }
        
    }

    reacts=[
        {icon:"fa-regular fa-heart reactable",totalNum:0,isActive:false},
        {icon:"fa-regular fa-comment",totalNum:0}
    ]

    toggleReact(event:Event,reactItem:any){
        const element = event.target as HTMLElement;
        if(!element.classList.contains('reactable'))
            return;
        
        

        if(!reactItem.isActive){
        reactItem.isActive=true;
        const s = this.reacts[0].icon || '';
        this.reacts[0].icon = s.replace('regular', 'solid');
        reactItem.totalNum++
        }

        else{
            reactItem.isActive=false;
            const s = this.reacts[0].icon || '';
            this.reacts[0].icon = s.replace('solid', 'regular');
            reactItem.totalNum--;
        }
        
    }
}