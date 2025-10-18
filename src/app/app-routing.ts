import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';

export const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  }, // fallback route

  {
    path:'',component:AuthLayoutComponent,
    children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent}
    ]
  },
  
  { path: '**', redirectTo: '' }
];
