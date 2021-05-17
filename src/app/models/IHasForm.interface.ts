import { AbstractControl } from '@angular/forms';

export interface IHasForm{
    getForm(): AbstractControl;
}
