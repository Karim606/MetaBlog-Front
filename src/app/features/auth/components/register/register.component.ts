import { Component, DebugElement } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule,Validators,AbstractControl} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
    styleUrls: ["../../shared/styles/form.css","./register.component.css"],
    imports: [ReactiveFormsModule, FormsModule, ImageCropperComponent,RouterModule]

})


export class RegisterComponent {
form = new FormGroup({
  email: new FormControl('',[
    Validators.required,
    Validators.email
  ]),
  password: new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    this.containsUppercase,
    this.containsLowercase,
    this.containsNumber,
  ]),
  confirmPassword: new FormControl('', Validators.required),
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  bio : new FormControl('')
},
  { validators: this.passwordsMatch}
);

// For image preview
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

  onSubmit() {
    if (this.form.invalid) return;
    
  }

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

}


