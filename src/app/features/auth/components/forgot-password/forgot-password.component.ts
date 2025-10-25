import { Component } from "@angular/core";
import { FormsModule, NgForm, NgModel } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";



@Component({
    selector:"app-forgot-password",
    templateUrl:"./forgot-password.component.html",
    styleUrls:["./forgot-password.component.css","../../shared/styles/form.css"],
    imports: [FormsModule,RouterModule]
})

export class ForgotPasswordComponent{

    constructor(private router:Router){

    }
    email:string="";

    onSubmit(form:NgForm){
        if(form.invalid)
            return
        
        this.router.navigateByUrl("/auth/forgot-password/sent");
        console.log("hello");
    }
}