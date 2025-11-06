import { Component, inject } from "@angular/core";
import { LoadingService } from "./loading.service";

@Component({
    selector:'app-spinner',
    templateUrl:'./spinner.Component.html',
    styleUrls:['./spinner.Component.css'],
})

export class SpinnerComponent{
    loadingService=inject(LoadingService);
    
}