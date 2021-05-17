import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    public static matchControls(firstField: string, secondField: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const firstControl = group.get(firstField);
            const secondControl = group.get(secondField);
            if (firstControl.value === secondControl.value || (secondControl.pristine && secondControl.value === '')) {
                return null;
            } else {
                return { fieldMismatch: true };
            }
        };
    }

    public static requireDigit(field: AbstractControl): ValidationErrors | null {
        const value: string = field.value;
        if (field.value === '') {
            return null;
        }
        const regex = /\d/;
        const digitExist = regex.test(value);
        if (digitExist) {
            return null;
        }
        return { requireDigit: true };
    }

    public static requireLowerCase(field: AbstractControl): ValidationErrors | null {
        const value: string = field.value;
        if (field.value === '') {
            return null;
        }
        const regex = /[a-z]/;
        const lowerExist = regex.test(value);
        if (lowerExist) {
            return null;
        }
        return { requireLowerCase: true };
    }

    public static requireUpperCase(field: AbstractControl): ValidationErrors | null {
        const value: string = field.value;
        if (field.value === '') {
            return null;
        }
        const regex = /[A-Z]/;
        const lowerExist = regex.test(value);
        if (lowerExist) {
            return null;
        }
        return { requireUpperCase: true };
    }

    public static requireNonAlphaNumeric(field: AbstractControl): ValidationErrors | null {
        const value: string = field.value;
        if (value === '') {
            return null;
        }
        const regex = /^[a-z0-9]+$/i;
        const doesNotExist = regex.test(value);
        if (doesNotExist) {
            return { requireNonAlphaNumeric: true };
        }
        return null;
    }

    public static requireUniqueChars(uniqueCharsRequired: number): ValidatorFn {
        return (field: AbstractControl): ValidationErrors | null => {
            const value: string = field.value;
            if (value === '') {
                return null;
            }
            const chars: string[] = [];
            for (const char of value) {
                if (!chars.includes(char)) {
                    chars.push(char);
                    if (chars.length >= uniqueCharsRequired) {
                        return null;
                    }
                }
            }
            return {
                uniqueCharsRequired:
                    { required: uniqueCharsRequired, actual: chars.length }
            };
        };
    }
}
