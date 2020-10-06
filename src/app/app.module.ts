import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from "./services/auth.service";

// components
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';
import { TicketComponent } from './components/products/ticket/ticket.component';

// service
import { ProductService } from './services/product.service';

// Toastr, para notificaciones en angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FiltroComponent } from './components/filtro/filtro.component';
import { FilterPipe } from './pipes/filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    TicketComponent,
    FiltroComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService,   ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
