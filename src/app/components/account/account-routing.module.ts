import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HasFormCanDeactivateGuardService } from 'src/app/services/guards/has-form-can-deactivate-guard.service';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

const routes = [
  { path: 'signup', component: SignupComponent, canDeactivate: [HasFormCanDeactivateGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'my-account', component: MyaccountComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
