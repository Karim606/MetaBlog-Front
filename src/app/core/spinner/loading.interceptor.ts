import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "./loading.service";
import { Injectable } from "@angular/core";

@Injectable()

export class LoadingInterceptor implements HttpInterceptor{
    constructor(private loadingService:LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();
        return next.handle(req).pipe(
            finalize(()=>{this.loadingService.hide();})
        );
    }

}