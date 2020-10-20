import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectPickerDirective} from './selectpicker.directive';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [SelectPickerDirective],
    exports: [SelectPickerDirective]
})


export class SelectPickerModule { }