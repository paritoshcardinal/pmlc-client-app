import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassSelectDropdown} from './class.select.dropdown.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ClassSelectDropdown],
    exports: [ClassSelectDropdown]
})

export class ClassSelectDropdownModule { }