import  {Component} from '@angular/core';
import {RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './app-layout.component.html',
    styleUrl:'./app-layout.component.css',
    imports:[RouterOutlet],
})

export class AppLayoutComponent  {

    navigationItems = [
        {label:'Home',icon:"fa-solid fa-house",active:true},
        {label:'Search',icon:"fa-solid fa-magnifying-glass",active:false},
        {label:'Notifications',icon:"fa-regular fa-bell",active:false},
        {label:'Bookmarks',icon:"fa-regular fa-bookmark",active:false}
    ]
    userItems = [
        {label:'Profile',icon:"fa-regular fa-user",active:false},
        {label:'Settings',icon:"fa-solid fa-gear",active:false}
    ]
}