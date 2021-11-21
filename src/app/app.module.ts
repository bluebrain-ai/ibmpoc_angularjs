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
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './common/alert/alert.component';
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
