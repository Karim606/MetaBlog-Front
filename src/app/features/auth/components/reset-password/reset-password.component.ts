import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, NgForm, Validators,AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/authservice";



@Component({
    selector:"app-reset-password",
    templateUrl:"./reset-password.component.html",
    styleUrls:["./reset-password.component.css","../../shared/styles/form.css"],
    imports: [FormsModule,RouterModule,ReactiveFormsModule]
})

export class ResetPasswordComponent{

    constructor(private router:Router,private Route:ActivatedRoute,private authService:AuthService){

    }
form = new FormGroup({
    password: new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    this.containsUppercase,
    this.containsLowercase,
    this.containsNumber,
  ]),
    confirmPassword: new FormControl('', Validators.required)
 },
{ validators: this.passwordsMatch}
);

    onSubmit( ){
        if(this.form.invalid)
            return
        
      const token =  this.Route.snapshot.queryParamMap.get('token');
      const email = this.Route.snapshot.queryParamMap.get('email');
      this.authService.resetPassword(email,token,this.form.controls['password'].value).subscribe({
        next:(res)=> {console.log('reset password done successfully',res);
          this.router.navigateByUrl('/auth/login');
        },
        error:(e)=> console.log('reset password failed',e)
      }
      );

        
    }


      //-----------------------------------------------------------------------
  //custom validators
  // Custom validator for uppercase
containsUppercase(control: AbstractControl) {
  const hasUppercase = /[A-Z]/.test(control.value);
  return hasUppercase ? null : { noUpperCase: true };
}

// Custom validator for lowercase
containsLowercase(control: AbstractControl) {
  const hasLowercase = /[a-z]/.test(control.value);
  return hasLowercase ? null : { noLowerCase: true };
}

// Custom validator for number
containsNumber(control: AbstractControl) {
  const hasNumber = /[0-9]/.test(control.value);
  return hasNumber ? null : { noNumber: true };
}
passwordsMatch(group:AbstractControl) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { notMatching: true };
}
}