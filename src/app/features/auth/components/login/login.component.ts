import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule,Validators} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AuthLayoutComponent } from "../../../../layout/auth-layout/auth-layout.component";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/authservice";
import { HttpClient } from "@angular/common/http"
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
    styleUrls: ["../../shared/styles/form.css","./login.component.css"],
    imports: [ReactiveFormsModule, FormsModule,RouterModule],

})

export class LoginComponent {

constructor(private authService:AuthService){}

serverError:string|null=null;

form = new FormGroup({
  email: new FormControl<string>('', {
    nonNullable:true,
    validators:[ Validators.required,Validators.email ]} 
  ),
  password: new FormControl<string>('',{ nonNullable:true,validators:[Validators.required]})
});

 onSubmit() {
  if (this.form.invalid) {
    console.warn('Form invalid:', this.form.value);
    return;
  }

  console.log('Submitting form:', this.form.value);

  this.authService
    .login(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    )
    .subscribe({
      next: (res) => {
        console.log('✅ Login successful:', res);
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        this.serverError=err.error.title??"invalid login";
        console.log(this.serverError);
      },
    });
}

}