# Reactive forms

## Installing
`npm i @angular/forms`

Make sure your current module is importing `ReactiveFormsModule`


## Overview
Add the `formBuilder` injection:

```
constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef) {}
    
    
    currentModel(): Observable<MyModel> {
    return this.store.select(selectCurrentModel).pipe(
      take(1),
      filter(md => md.id == ModelType),
      map(md => md.name!));
  }  
    
  ngAfterViewInit(): void {
    this.currentModel().subscribe(item => this.searchForm.setValue(item));
  }
  
  onFormSubmit(): void {
    if (this.myForm.valid) {
      this.store.dispatch(someAction(prepareModel(this.searchForm.value)));
    } else {
      console.log(`The Form is not valid: ${JSON.stringify(this.myForm.value)}`);
    }
  }

```

and you can extract out the form model definition into the separate file:

```TypeScript
export const searchFormModel = (formBuilder: FormBuilder) => formBuilder.group({

  id: new FormControl('Default', Validators.required),

  name: '',


  myTimeframe: formBuilder.group({

    rangeKind: new FormControl('CUSTOM', Validators.required),

    timeframe: '',

    from: '',

    to: '',
  }),

  dateFrom: '',

  dateTo: '',

  note: '',


});
```


html template:
```html
  <form [formGroup]="searchForm" (ngSubmit)="onFormSubmit()">
  
    <my-select formControlName="period"
                         *ngIf="searchForm.value.myTimeframe.rangeKind == 'CUSTOM'"
                         id="someId"
                         [options]="customValues()">
                         
                         
    <div class="col" formGroupName="myTimeframe">


```


Custom widgets:

```html
<fieldset>
  <legend>{{label}}:</legend>
  <div class="custom-control-inline" role="radiogroup">
    <label *ngFor="let item of model | keyvalue" class="custom-control custom-radio">
      <input #radio
             [attr.id]="id + item.key"
             [value]="item.key"
             [attr.aria-labelledby]="id + 'LabelFor' + item.key"
             class="custom-control-input radio-default ng-untouched ng-pristine ng-valid"
             tabindex="0"
             type="radio"
             (click)="onClickRadio($event)">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description" [attr.id]="id + 'LabelFor' + item.key">{{item.value}}</span>
    </label>
  </div>
  <ng-content></ng-content>
</fieldset>
```

```TypeScript
import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'my-radio-values',
  templateUrl: './radio-values.component.html',
  styleUrls: ['./radio-values.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioValuesComponent),
      multi: true
    }
  ]
})
export class RadioValuesComponent implements ControlValueAccessor, AfterViewInit  {

  @Input() id = '';
  @Input() label: string = "";
  @Input() model: any = {};
  @Input() isDisabled = false;

  @ViewChildren("radio")
  private radioItems?: ElementRef[];

  constructor() { }

  private val: any = '';

  get value(): any {
    return this.val;
  }

  set value(v: any) {
    if (v !== this.val) {
      this.writeValue(v);
    }
  }

  ngAfterViewInit(): void {
    this.updateUi(this.val);
  }

  updateUi(v: any) {
    this.radioItems?.forEach((ch: ElementRef) => {ch.nativeElement.checked = (ch.nativeElement.value == this.val)});
  }

  writeValue(v: any): void {

    this.val = v;

    this.updateUi(v);

    this.onChange(v);
    this.onTouched();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  onClickRadio(event: Event) {
    const currentCode = (<HTMLInputElement>event.target).value;
    if(this.val != currentCode) {
      this.writeValue(currentCode);
    }
  }
}
```

## Datepickers

### Simple Reactive Datapicker

```html
<div class="form-group">
  <label [for]="id">{{ labelText }}</label>
  <div style="width: 180px;">
    <div class="input-group">
      <input
        type="text"
        #datePicker
        #ngbDatepicker="ngbDatepicker"
        ngbDatepicker
        [id]="id"
        [name]="name"
        class="form-control calendar-input"
        [class.is-invalid]="hasErrors"
        placeholder="mm/dd/yyyy"
        [disabled]="disabled"
        [firstDayOfWeek]=firstDayOfWeek
        [displayMonths]=displayMonths
        [navigation]=navigation
        [showWeekNumbers]=showWeekNumbers
        [outsideDays]=outsideDays
        [autoClose]=autoClose
        [value]="date"
        (dateSelect)="this.updateValue(datePicker.value)"
        (change)="this.updateValue(datePicker.value)"
        (input)="this.updateValue(datePicker.value)"
        (blur)="markAsTouched()"
      />
      <div class="input-group-append">
        <button class="btn btn-secondary btn-icon-only"
                type="button"
                [disabled]="disabled"
                (click)="ngbDatepicker.toggle()">
          <span class="fa fa-calendar">
            <span class="sr-only">Calendar Icon</span>
          </span>
        </button>
      </div>
      <div class="invalid-feedback"> Invalid value.</div>
    </div>
  </div>
</div>
```

```TypeScript
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { DateParserFormatter } from "@components/widgets/datepicker/date-parser.formatter";
import * as moment from 'moment';

@Component({
  selector: 'my-datepicker',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatepickerComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DatepickerComponent,
      multi: true,
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateParserFormatter,
    }
  ],
})
export class DatepickerComponent implements ControlValueAccessor {

  @Input() id = '';
  @Input() name = '';
  @Input() date = '';
  @Input() labelText = '';
  @Input() firstDayOfWeek = 0;
  @Input() displayMonths = 1;
  @Input() navigation: 'select' | 'arrows' | 'none' = 'select';
  @Input() showWeekNumbers = false;
  @Input() outsideDays: 'visible' | 'collapsed' | 'hidden' = 'visible';
  @Input() autoClose = true;
  @Input() disabled = false;

  hasErrors = false;
  touched = false;

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  updateValue(val: any) {
    this.date = val;
    this.onChange(val);
    this.markAsTouched();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    this.onTouched();
    this.touched = true;
    this.onChange(this.date);
  }

  writeValue(value: any) {
    if (value) {
      this.date = value;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(formControl: FormControl) {
    if(formControl.value == '') {
      return true;
    }
    this.hasErrors = formControl.touched && !!formControl.errors;
    const date = moment(formControl.value, 'MM/DD/YYYY', true).isValid();
    return !date && {invalid: true};
  }
}


```

```TypeScript

import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month: parseInt(date[0], 10),
        day: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? moment(new Date(date.year, date.month - 1, date.day)).format('MM/DD/YYYY') : '';
  }
}
```

```css
.ngb-dp-month-name {
  background-color: #7a7a7a !important;
}

.invalid-feedback {
  font-size: 11px;
  margin-top: 0;
}
```

### Range Datapicker

```html
<div class="inline">
  <div class="form-group hidden">
    <div class="input-group">
      <input name="datepicker"
             class="form-control"
             ngbDatepicker
             #datepicker="ngbDatepicker"
             [autoClose]="'outside'"
             (dateSelect)="onDateSelection($event)"
             [displayMonths]="2"
             [dayTemplate]="t"
             outsideDays="hidden"
             [startDate]="fromDate!"
             tabindex="-1">
      <ng-template #t let-date let-focused="focused">
        <span class="custom-day"
              [class.focused]="focused"
              [class.range]="isRange(date)"
              [class.faded]="isHovered(date) || isInside(date)"
              (mouseenter)="hoveredDate = date"
              (mouseleave)="hoveredDate = null">
          {{ date.day }}
        </span>
      </ng-template>
    </div>
  </div>
  <div class="form-group">
    <div class="input-group">
      <input #dpFromDate
             class="form-control" placeholder="mm/dd/yyyy"
             name="dpFromDate"
             [value]="formatter.format(fromDate)"
             (input)="fromDate = validateInput(fromDate, dpFromDate.value)">
      <div class="input-group-append">
        <button class="btn btn-secondary btn-icon-only"
                type="button"
                [disabled]="disabled"
                (click)="datepicker.toggle()">
          <span class="fa fa-calendar">
            <span class="sr-only">Calendar Icon</span>
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="form-group ml-2">
    <div class="input-group">
      <input #dpToDate
             class="form-control" placeholder="mm/dd/yyyy"
             name="dpToDate"
             [value]="formatter.format(toDate)"
             (input)="toDate = validateInput(toDate, dpToDate.value)">
      <div class="input-group-append">
        <button class="btn btn-secondary btn-icon-only"
                type="button"
                [disabled]="disabled"
                (click)="datepicker.toggle()">
          <span class="fa fa-calendar">
            <span class="sr-only">Calendar Icon</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
```

```TypeScript
import {Component, Input, OnInit} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DateParserFormatter} from "@components/widgets/datepicker/date-parser.formatter";

@Component({
  selector: 'my-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DaterangepickerComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DaterangepickerComponent,
      multi: true,
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateParserFormatter,
    }
  ],
})
export class DaterangepickerComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  model: any;

  @Input() id = '';
  @Input() name = '';
  @Input() labelText = '';
  @Input() disabled = false;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
  }

  cancelDateSelection() {
    if (this.fromDate) {
      this.toDate = null;
    } else {
      this.fromDate = null;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}

```

```css
.inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.inline .form-group {
  flex: 0 0 auto;
  flex-flow: row wrap;
}

.form-group.hidden,
.form-group.hidden .input-group,
.form-group.hidden .input-group .form-control{
  width: 0;
  margin: 0;
  border: none;
  padding: 0;
}
.custom-day {
  text-align: center;
  padding: 0.185rem 0.25rem;
  display: inline-block;
  height: 2rem;
  width: 2rem;
}

```

## Checkbox list

```html
<fieldset class="checkbox-group">
  <legend>{{label}}</legend>
  <div class="checkbox-list">
    <label *ngFor="let item of model" class="custom-checkbox custom-control">
      <input #checkbox [attr.id]="id + 'itemInput' + item.code"
              [value]="item.code"
              [checked]="isChecked(item.code)"
              type="checkbox"
              tabindex="0"
              class="checkbox-default custom-control-input"
              [attr.aria-labelledby]="id + 'itemLabel' + item.code"
              (click)="onCheckboxClick($event)">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description" [attr.id]="id + 'itemLabel' + item.code">{{item.label}}</span>
    </label>
  </div>
</fieldset>

```

```TypeScript
import { Component, ElementRef, forwardRef, Input, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxItem } from './checkbox-list.const';

@Component({
  selector: 'my-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true
    }
  ]
})
export class CheckboxListComponent implements ControlValueAccessor {

  @Input() id = '';
  @Input() name = '';
  @Input() label: string = "";
  @Input() model: CheckboxItem[] | null = null;
  @Input() isDisabled = false;

  readonly ALL = 'ALL';

  @ViewChildren("checkbox")
  private checkboxes?: Array<ElementRef<HTMLInputElement>>;

  constructor() { }

  private val: any = '';
  private checkedCodes = new Set();

  get value(): any {
    return this.val;
  }

  set value(v: any) {
    if (v !== this.val) {
      this.writeValue(v);
    }
  }

  isChecked(code: string): boolean {
    return this.checkedCodes.has(code);
  }

  updateUi(v: any) {
    this.checkboxes?.forEach((ch: ElementRef) => {ch.nativeElement.checked = this.checkedCodes.has(ch.nativeElement.value)});
  }

  writeValue(v: any): void {

    this.val = v;
    this.checkedCodes = this.valueAsSet(v);

    this.updateUi(v);

    this.onChange(v);
    this.onTouched();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  valueAsSet(v: any): Set<any> {
    return (!v || v.trim().length == 0) ? new Set(): new Set(v.split(','));
  }

  onCheckboxClick(event: Event) {
    const checked = (<HTMLInputElement> event.target).checked;
    const currentCode = (<HTMLInputElement> event.target).value;

    if (currentCode === this.ALL) {
      this.checkboxes?.forEach(x => {
        if (x.nativeElement.value !== this.ALL) {
          x.nativeElement.disabled = checked;
        }
      });
      this.checkedCodes.clear();
    }

    if (checked) {
      this.checkedCodes.add(currentCode);
    } else {
      this.checkedCodes.delete(currentCode);
    }

    this.val = Array.from(this.checkedCodes).join(',');
    this.onChange(this.val);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
```



## Useful TypeScripts

```TypeScript
    violationNames: this.formBuilder.group(Object.fromEntries(VIOLATION_NAMES.map(item => [item.checkValue,  new FormControl(false)]))),
```

If you like to use object as a Map

```TypeScript
export const detailsNav: {[key:string]: string} = {
  someKey1: 'ok there',
  another: 'Big value for something',
  onemore: 'Val'
}
```