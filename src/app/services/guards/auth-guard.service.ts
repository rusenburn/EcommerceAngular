import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, private _jwtHelper: JwtHelperService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this._jwtHelper.tokenGetter();
    if (token && !this._jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      this._router.navigate(['/account/login', { redirectURL: state.url }]);
      return false;
    }
  }
}
