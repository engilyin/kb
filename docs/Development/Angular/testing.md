# Angular Testing

## Mock service

https://testing-angular.com/

```TypeScript
providers: [
  { provide: SignupService, useValue: signupService }
],


const signupService:
  Pick<SignupService, keyof SignupService> = {
  isUsernameTaken() {
    return of(false);
  },
  isEmailTaken() {
    return of(false);
  },
  getPasswordStrength() {
    return of(strongPassword);
  },
  signup() {
    return of({ success: true });
  },
};

const signupService = jasmine.createSpyObj<SignupService>(
  'SignupService',
  {
    // Successful responses per default
    isUsernameTaken: of(false),
    isEmailTaken: of(false),
    getPasswordStrength: of(strongPassword),
    signup: of({ success: true }),
  }
);

describe('SignupFormComponent', () => {
  let fixture: ComponentFixture<SignupFormComponent>;
  let signupService: jasmine.SpyObj<SignupService>;

  const setup = async (
    signupServiceReturnValues?:
      jasmine.SpyObjMethodNames<SignupService>,
  ) => {
    signupService = jasmine.createSpyObj<SignupService>(
      'SignupService',
      {
        // Successful responses per default
        isUsernameTaken: of(false),
        isEmailTaken: of(false),
        getPasswordStrength: of(strongPassword),
        signup: of({ success: true }),
        // Overwrite with given return values
        ...signupServiceReturnValues,
      }
    );

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        SignupFormComponent,
        ControlErrorsComponent,
        ErrorMessageDirective
      ],
      providers: [
        { provide: SignupService, useValue: signupService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    fixture.detectChanges();
  };

});
```
