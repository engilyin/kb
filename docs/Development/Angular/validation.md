# Angular Validation

# Custom Validation

```TypeScript

export abstract class BaseValidator implements Validator {

  abstract getKey(): string;

  abstract getMessage(): string;

  abstract isValid(control: AbstractControl): boolean;

  isEmptyValueAllowed(): boolean {
    return true;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const isEmpty = !control.value;
    const isValid = this.isValid(control);

    return (this.isEmptyValueAllowed() && isEmpty) || isValid
      ? null
      : {[this.getKey()]: this.getMessage()};
  }

  toValidationFn(): ValidatorFn {
    return control => this.validate(control);
  }
}


export class MyMaxLengthValidator extends BaseValidator {

  constructor(private readonly maxLength: number) {
    super();
  }

  getKey(): string {
    return 'maxLength';
  }

  getMessage(): string {
    return `Value should not be more than ${this.maxLength}`;
  }

  isValid(control: AbstractControl): boolean {
    return control.value?.length <= this.maxLength;
  }
  
}

```

## Cross Field Validation