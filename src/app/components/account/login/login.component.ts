import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { IHasForm } from 'src/app/models/IHasForm.interface';
import { UserSignup } from 'src/app/models/userSignup.model';
import { AuthService } from 'src/app/services/auth.service';
import { MiniStoreService } from 'src/app/services/mini-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, IHasForm {
  public credentials: UserSignup = new UserSignup();
  public email: string = '';
  errors: string[] = [];
  redirectURL: string = '/';
  loginForm: FormGroup;
  constructor(
    private _auth: AuthService,
    private _mini: MiniStoreService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    document.title = 'Login | Ecommmerce';

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    // TODO : make it query params instead of param
    this._route.paramMap.subscribe(
      {
        next: (params: Params) => {
          const redirect: string = params.get('redirectURL');
          if (redirect && redirect?.length) {
            this.redirectURL = params.get('redirectURL');
          } else {
            this.redirectURL = ('/');
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }
  public onSubmit(): void {
    this.errors = [];
    this.mapFormValuesToModel();
    this._mini.removeToken();
    this._auth.login(this.credentials, this.redirectURL, this.errors);
  }

  private mapFormValuesToModel(): void {
    this.credentials.email = this.loginForm.value.email;
    this.credentials.password = this.loginForm.value.password;
  }

  public getForm(): AbstractControl {
    return this.loginForm;
  }
}


