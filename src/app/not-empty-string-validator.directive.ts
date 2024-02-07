import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[validatorDirective]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidatorDirective, multi: true }]
})

export class ValidatorDirective implements Validator {
  @Input('validatorDirective')
  validationType!: string;
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value && this.validationType === 'stringType' && (value.trim()).length === 0) {
      return { 'notEmptyString': true };
    }

    if (value && this.validationType === 'stringType' && /^\d+$/.test(value.trim())) {
      return { 'notComplete': true };
    }

    if (value && this.validationType === 'stringType' && /\d/.test(value.trim())) {
      return { 'notCorrect': true };
    }

    if (value && this.validationType === 'capType' && !/^\d{5}$/.test(value)) {
      return { 'capCheck': false };
    }
    return null;
  }
}