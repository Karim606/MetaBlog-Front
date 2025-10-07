import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';

export const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  { path: '**', redirectTo: '' } // fallback route
];
