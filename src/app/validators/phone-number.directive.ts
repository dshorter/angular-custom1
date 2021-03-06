import { AbstractControl } from "@angular/forms";
import { Validator, NG_VALIDATORS, FormControl } from "@angular/forms";
import { Directive, OnInit, forwardRef, ValidatorFn, Input } from "@angular/core";

@Directive({
  selector: "[appForbiddenName]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneNumberDirective,
      multi: true
    }
  ]
})
export class PhoneNumberDirective implements Validator {
  @Input("appForbiddenName") forbiddenName: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.forbiddenName
      ? this.forbiddenNameValidator(new RegExp(this.forbiddenName, "i"))(
          control
        )
      : null;
  }
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
}
