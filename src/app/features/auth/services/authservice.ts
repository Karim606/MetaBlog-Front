import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject,Observable, throwError } from "rxjs";
import {map,tap,catchError} from "rxjs/operators"
import { TokenService } from "./tokenservice";
import {AuthResponse} from "../interfaces/auth-response.interface";
import {jwtDecode} from "jwt-decode";
import { CurrentUser } from "../interfaces/current-user.interface";

@Injectable({
    providedIn:"root"
})

export class AuthService{

private currentUser = signal<CurrentUser|null>(null)

private refreshInProgress = false;

private Api="api/";

constructor(private http:HttpClient,private tokenService:TokenService){
    this.currentUser.set(this.tokenService.getUser());
}


login (email:string, password:string):Observable<any>{
    return this.http.post<AuthResponse>(`${this.Api}/login`,{email,password})
    .pipe(
        tap(res =>this.storeAuthResponse(res)),
        map(res => res.user ?? null),
        catchError(this.handleError)
    );
}

register (payload:any){
    return this.http.post<AuthResponse>(`${this.Api}/auth/register`,payload)
    .pipe(
        tap(res => this.storeAuthResponse(res)),
        map(res =>res.user??null),
        catchError(this.handleError)
    )

}

logout(){
this.tokenService.clearToken();
this.currentUser.set(null);

}



  isLoggedIn(): boolean {
    const token = this.tokenService.getAccessToken();
    return !!token && !this.tokenService.isAccessTokenExpired();
  }

  refreshToken(){
    return this.http.post<AuthResponse>(`${this.Api}/refresh`,"hello")
    .pipe(
        tap(
            res=>{this.storeAuthResponse(res)}
        )
    );
  }
/////////////////////////////////////////////////////////////////////
private storeAuthResponse(res:AuthResponse){
    const expiresAt = res.expiresIn ? Date.now()+res.expiresIn*60*1000:undefined;
        this.tokenService.saveToken({accessToken:res.accessToken,
        expiresAt:expiresAt,
    });
    this.currentUser.set(jwtDecode<CurrentUser>(res.accessToken)?? null);
}

private handleError(err:HttpErrorResponse){
    if(err.error&&err.error.message){
        return throwError(() => new Error(err.error.message));
    }
    return throwError(() => err);
}
}