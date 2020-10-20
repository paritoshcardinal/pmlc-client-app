import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorDropdown } from './color.dropdown.component';


@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ColorDropdown],
    exports: [ColorDropdown]
})


export class ColorDropdownModule { }