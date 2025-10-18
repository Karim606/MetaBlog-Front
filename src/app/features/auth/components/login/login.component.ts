import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule,Validators} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AuthLayoutComponent } from "../../../../layout/auth-layout/auth-layout.component";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
    styleUrls: ["../../shared/styles/form.css","./login.component.css"],
    imports: [ReactiveFormsModule, FormsModule,RouterModule],

})

export class LoginComponent {
form = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),
  password: new FormControl('', [
    Validators.required
  ])
});

  onSubmit() {
    if (this.form.valid) {
      // Handle form submission
      console.log(this.form.value);
    }
  }
}