import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject,Observable, throwError } from "rxjs";
import {map,tap,catchError} from "rxjs/operators"
import { TokenService } from "./tokenservice";
import {AuthResponse} from "../interfaces/auth-response.interface";
import {jwtDecode} from "jwt-decode";
import { CurrentUser } from "../interfaces/current-user.interface";
import {environment} from '../../../../environments/environment'
import { RegisterUserDto } from "../Dtos/register-user.dto";
import { StoredAuth } from "../interfaces/stored-auth.interface";
@Injectable({
    providedIn:"root"
})

export class AuthService{

private currentUser = signal<CurrentUser|null>(null)

private refreshInProgress = false;

private Api=environment.apiUrl;

public constructor(private http:HttpClient,private tokenService:TokenService){
    
}


login (email:string, password:string):Observable<any>{
    return this.http.post<AuthResponse>(`${this.Api}auth/login`,{email,password})
    .pipe(
        tap(res =>this.storeAuthResponse(res)),
        catchError(this.handleError)
    );
}

register (payload:RegisterUserDto){
    return this.http.post<AuthResponse>(`${this.Api}auth/register`,payload)
    .pipe(
        tap(res => this.storeAuthResponse(res)),
        catchError(this.handleError)
    )

}

logout(){
this.tokenService.clearToken();
this.currentUser.set(null);

}

forgotPassword(email:string){
    return this.http.post(`${this.Api}auth/forgot-password`,{email})
}

resetPassword(email:string|null,token:string|null,password:string|null){
    const payload = {
        'token':token,
        'email':email,
        'newPassword':password
    };

    return this.http.post(`${this.Api}auth/reset-password`,payload)
}


  isLoggedIn(): boolean {
    const token = this.tokenService.getAccessToken();
    return !!token && !this.tokenService.isAccessTokenExpired();
  }

  refreshToken(){
    return this.http.post<AuthResponse>(`${this.Api}auth/refresh`,null)
    .pipe(
        tap(
            res=>{this.storeAuthResponse(res)}
        )
    );
  }
/////////////////////////////////////////////////////////////////////
private storeAuthResponse(res:AuthResponse){
        const payload = jwtDecode(res.accessToken)?? null;

        const storedAuth:StoredAuth = {accessToken:res.accessToken,
            expiresAt:payload.exp
        }
        const payloadTyped=payload as CurrentUser;

        const user:CurrentUser={
            id:payloadTyped.id,
            email:payloadTyped.email,
            role:payloadTyped.role,
            name:payloadTyped.name
        };

        this.currentUser.set(payloadTyped);

        this.tokenService.saveToken(storedAuth);
}

private handleError(err:HttpErrorResponse){
    console.log(err.message);
    if(err.error&&err.error.message){
        return throwError(() => new Error(err.error.message));
    }
    return throwError(() => err);
}
}