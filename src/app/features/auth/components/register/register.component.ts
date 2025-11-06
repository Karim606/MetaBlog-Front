import { Component, DebugElement } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule,Validators,AbstractControl, ValidationErrors} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { AuthService } from "../../services/authservice";
import { RegisterUserDto } from "../../Dtos/register-user.dto";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
    styleUrls: ["../../shared/styles/form.css","./register.component.css"],
    imports: [ReactiveFormsModule, FormsModule, ImageCropperComponent,RouterModule]

})


export class RegisterComponent {
form = new FormGroup({
  email: new FormControl('',{
    nonNullable:true,
    validators:[Validators.required,Validators.email ]}),
  password: new FormControl('',{
    nonNullable:true,
    validators:[
    Validators.required,
    Validators.minLength(10),
    this.containsUppercase,
    this.containsLowercase,
    this.containsNumber,
  ]}),
  confirmPassword: new FormControl('', {
    nonNullable:true,
    validators:Validators.required}),

  firstName: new FormControl('', {
    nonNullable:true,
    validators:Validators.required}),

  lastName: new FormControl ('',{
    nonNullable:true,
    validators:[ Validators.required]}),

  dob: new FormControl('',{
    nonNullable:true,
    validators:[Validators.required,this.validDobValidator]}),
  bio : new FormControl('')
},
  { validators: this.passwordsMatch}
);


//--------------------------------Constructor -------------------------------------------------------

constructor(private authService:AuthService){}

//------------------------------- For image preview--------------------------------------------------
  imageChangedEvent:any=null ;
  croppedImage:string|null=null;
  tempCroppedImage:string|null=null;
  
  
  onSelectFile(event: any): void {
   this.imageChangedEvent = event;
   
  }

  onImageCropped(event: any) {
    this.tempCroppedImage = event.objectUrl??null;
  }

  confirmCrop(){
    this.croppedImage=this.tempCroppedImage;
    this.imageChangedEvent=null;
  }

  cancelCrop(){
    this.imageChangedEvent=this.croppedImage=null;

  }
//--------------------------------------------form submitting----------------------------------------//
serverError?:string|null;

  onSubmit() {
    if (this.form.invalid) return;
    
    const payload:RegisterUserDto=this.form.getRawValue();
    this.authService.register(payload).subscribe(
      {
        next:(res) => console.log("✅registration successful:",res),
        error:(err) => {
          this.serverError=err.error.title;
          console.log("❌registration failed: ",err)}
      }
    )

    
  }
  handleError(errors:Record<string,string[]>){}

  validate(){console.log(this.form);}


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
validDobValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const dob = new Date(value);
  const today = new Date();

  if (dob > today) {
    return { invalidDob: 'Date of birth cannot be in the future.' };
  }

 
  const minAge = 18;
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  const realAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

  if (realAge < minAge) {
    return { invalidDob: `You must be at least ${minAge} years old.` };
  }

  return null;
}

}


