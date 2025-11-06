import { Injectable } from "@angular/core";
import {StoredAuth} from "../interfaces/stored-auth.interface";

@Injectable({
    providedIn:"root"
})

export class TokenService{

    private readonly key="myapp_auth";
    private memory:StoredAuth|null=null;
    constructor(){
        
    }

    
    public saveToken(auth:StoredAuth){
        this.memory={...auth};
        

    }
    public clearToken(){
        this.memory=null;
       
    }

    /////////////////getters///////////////
    public getAccessToken(){
        return this.memory?.accessToken??null;
    }


    public isAccessTokenExpired(){
        const exp = this.memory?.expiresAt;
        if(!exp) return true;

        return Date.now()>exp;
    }
}