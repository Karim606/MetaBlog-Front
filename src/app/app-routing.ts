import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import {ForgotPasswordComponent} from './features/auth/components/forgot-password/forgot-password'
import { ForgotPasswordSentComponent } from './features/auth/components/forgot-password/request-sent/request-sent';
import { ResetPasswordComponent } from './features/auth/components/reset-password/reset-password';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { HomeComponent } from './features/home-feed/components/home/home.component';
export const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  }, // fallback route

  {
    path:'auth',component:AuthLayoutComponent,
    children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'forgot-password',component:ForgotPasswordComponent,},
      {path:'forgot-password/sent',component:ForgotPasswordSentComponent},
      {path:'reset-password',component:ResetPasswordComponent}
    ]
  },

  {
    path:'app',component:AppLayoutComponent,
    children:[
      {path:'home',component:HomeComponent}
    ]
    
  },
  
  { path: '**', redirectTo: '' }
];
