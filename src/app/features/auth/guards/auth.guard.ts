import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from "../services/authservice"

@Injectable({
    providedIn:"root"
})
export class AuthGuard implements CanActivate {

    constructor(private authService:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.authService.isLoggedIn()?true:this.router.createUrlTree(["/login"]);
    }

}