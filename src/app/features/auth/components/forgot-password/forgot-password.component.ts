import { Component } from "@angular/core";
import { FormsModule, NgForm, NgModel } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/authservice";



@Component({
    selector:"app-forgot-password",
    templateUrl:"./forgot-password.component.html",
    styleUrls:["./forgot-password.component.css","../../shared/styles/form.css"],
    imports: [FormsModule,RouterModule]
})

export class ForgotPasswordComponent{

    constructor(private router:Router,private authService:AuthService){

    }
    serverError?:string|null;
    email:string="";

    onSubmit(form:NgForm){
        if(form.invalid)
            return
        this.authService.forgotPassword(form.value.email as string)
        .subscribe({
            next:(res)=>{console.log("✅ successful:",res)
                this.router.navigateByUrl("/auth/forgot-password/sent");
            },
            error:(err)=>{
                this.serverError=err.error.title;
                console.log("❌ failed: ",err);
            }
        }
        )

    }
}