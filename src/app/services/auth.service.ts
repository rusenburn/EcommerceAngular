import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { TokenModel } from '../models/token.model';
import { UserSignup } from '../models/userSignup.model';
import { MiniStoreService } from './mini-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string;
  constructor(
    private _client: HttpClient,
    appConfig: AppConfig,
    private _mini: MiniStoreService,
    private _router: Router
  ) {
    this.baseUrl = appConfig.authenticationEndpoint;
  }

  public signup(credentials: UserSignup): Observable<never> {
    return this._client.post<never>(`${this.baseUrl}register/`, credentials);
  }

  public login(credentials: UserSignup, redirectURL: string = '/', errors: string[] = []): void {
    this._client.post<TokenModel>(`${this.baseUrl}token/`, credentials)
      .subscribe({
        next: (token) => {
          this._mini.setToken(token.token);
          // this._mini.saveToken();
          // localStorage.setItem('token', token.token);
          this._router.navigate([redirectURL]);
        },
        error: (err) => {
          console.log(err);
          errors.push(err.error);
        }
      });
  }

  public logout(redirectToHomePage: boolean = true): void {
    this._mini.removeToken();
    if (redirectToHomePage) {
      this._router.navigate(['/']);
    }

  }
}
