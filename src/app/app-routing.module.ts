import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../app/components/forgot-password/forgot-password.component';
import { AuthGuard } from "../app/guard/auth.guard";
import { VerifyEmailComponent } from '../app/components/verify-email/verify-email.component';
/* import { Product } from './models/product'; */
import { ProductsComponent } from '../app/components/products/products.component';
import {FiltroComponent} from '../app/components/filtro/filtro.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
{ path: 'sign-in', component: SignInComponent },
{ path: 'register-user', component: SignUpComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'verify-email-address', component: VerifyEmailComponent },
{ path: 'products', component: ProductsComponent },
{ path: 'filtro', component: FiltroComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
