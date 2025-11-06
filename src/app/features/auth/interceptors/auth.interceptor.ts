import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable ,from,switchMap,throwError} from "rxjs";
import { catchError } from "rxjs";
import { AuthService } from "../services/authservice";
import { TokenService } from "../services/tokenservice";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    private isRefreshing=false;

    constructor(private authService:AuthService,private tokenService:TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getAccessToken();
        const authReq = token?req.clone({ headers:req.headers.set(`Authorization`,`${token}`)}):req;

        return next.handle(authReq).pipe(
            catchError( err=> {
                if(err instanceof HttpErrorResponse&& err.status==401&&!(req.url.includes('/auth/login') || req.url.includes('/auth/refresh') ) )
                    return this.handle401(authReq,next);
                return throwError(() => err);
                })
        );
    }

    private handle401(req:HttpRequest<any>,next:HttpHandler){
        
        return this.authService.refreshToken().pipe(
            switchMap(res =>{
                const newToken = res.accessToken;
                const retryReq = req.clone({
                    headers:req.headers.set(`Authorization`,`${newToken}`)
                });
                return next.handle(retryReq);
            }),
            catchError(err =>{return throwError(()=>err)})
        )
    }
}