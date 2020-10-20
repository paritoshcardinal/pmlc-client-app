import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageDropdown } from './language.dropdown.component';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [LanguageDropdown],
    exports: [LanguageDropdown]
})


export class LanguageDropdownModule { }