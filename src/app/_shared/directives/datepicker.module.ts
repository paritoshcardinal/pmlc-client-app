import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerDirective } from './datepicker.directive';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [DatePickerDirective],
    exports: [DatePickerDirective]
})


export class DatePickerModule { }