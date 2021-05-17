import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { CustomValidators } from 'src/app/customValidators/customValidator.validator';
import { IHasForm } from 'src/app/models/IHasForm.interface';
import { UserSignup } from 'src/app/models/userSignup.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, IHasForm {
  public signupForm: FormGroup;
  public userModel: UserSignup = new UserSignup();
  errors: any[] = [];
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    document.title = 'Signup | Ecommerce';
    this.signupForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this._fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.requireDigit,
          CustomValidators.requireLowerCase,
          CustomValidators.requireUpperCase,
          CustomValidators.requireNonAlphaNumeric,
          CustomValidators.requireUniqueChars(1)
        ]],
        password2: ['', [Validators.required]]
      }, { validators: [CustomValidators.matchControls('password', 'password2')] }
      )
    });

  }
  public submitForm(): void {
    const credentials = this.mapFormValuesToModel();
    this._auth.signup(credentials).subscribe({
      next: () => {
        toast(
          {
            message: 'Account created ,please log in!',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          });
        this._router.navigate(['/']);
      },
      error: (err) => {
        toast(
          {
            message: 'Error please try again!',
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          });
        this.errors = [];
        for (const property of err.error) {
          this.errors.push(property);
        }
      }
    });
  }

  private mapFormValuesToModel(): UserSignup {
    this.userModel.email = this.signupForm.value.email;
    const passwordGroup = this.signupForm.get('passwordGroup');
    this.userModel.password = passwordGroup.value.password;
    this.userModel.password2 = passwordGroup.value.password2;
    return this.userModel;
  }

  public getForm(): AbstractControl {
    return this.signupForm;
  }

  public get getPasswordError(): string {
    const field = this.signupForm.controls.passwordGroup.get('password');
    let errorMessage = '';
    if (field.errors) {
      if (field.errors.required) {
        errorMessage = 'Password Field is required.';
      }
      else if (field.errors.minlength) {
        errorMessage = `Password must be at least ${field.errors.minlength.requiredLength} characters.`;
      } else if (field.errors.requireLowerCase) {
        errorMessage = 'Password must contain at least 1 lower case character.';
      } else if (field.errors.requireUpperCase) {
        errorMessage = 'Password must contain at least 1 upper case character.';
      } else if (field.errors.uniqueCharsRequired) {
        errorMessage = `Password must contain at least ${field.errors.uniqueCharsRequired.required} unique characters.`;
      } else if (field.errors.requireDigit) {
        errorMessage = 'Password must contain at least 1 digit.';
      } else if (field.errors.requireNonAlphaNumeric) {
        errorMessage = 'Password must contain at least 1 non-alpha numeric.';
      }
    }
    return errorMessage;
  }
}
