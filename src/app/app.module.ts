import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CustomerComponent } from './core/customer/customer.component';
import { MotorComponent } from './core/motor/motor.component';
import { EndowmentComponent } from './core/endowment/endowment.component';
import { HouseComponent } from './core/house/house.component';
import { CommercialComponent } from './core/commercial/commercial.component';
import { ClaimComponent } from './core/claim/claim.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './common/alert/alert.component';
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { LoaderComponent } from './common/loader/loader.component';
import { CustomerHttpInterceptor } from './services/http-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./common/material.module";
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CustomerComponent,
    MotorComponent,
    EndowmentComponent,
    HouseComponent,
    CommercialComponent,
    ClaimComponent,
    AlertComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    BrowserAnimationsModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: CustomerHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
