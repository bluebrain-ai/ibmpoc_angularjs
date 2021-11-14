import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClaimComponent } from './core/claim/claim.component';
import { CommercialComponent } from './core/commercial/commercial.component';
import { CustomerComponent } from './core/customer/customer.component';
import { EndowmentComponent } from './core/endowment/endowment.component';
import { HouseComponent } from './core/house/house.component';
import { MotorComponent } from './core/motor/motor.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'motor', component: MotorComponent, canActivate: [AuthGuard] },
  {
    path: 'endowment',
    component: EndowmentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'house', component: HouseComponent, canActivate: [AuthGuard] },
  {
    path: 'commercial',
    component: CommercialComponent,
    canActivate: [AuthGuard],
  },
  { path: 'claim', component: ClaimComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
