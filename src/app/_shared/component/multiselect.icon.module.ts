import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectIconDropdown} from './multiselect.icon.component';
import { EllipisePipeModule } from '../pipes/ellipise.module';

@NgModule({
    imports: [FormsModule, CommonModule, EllipisePipeModule],
    declarations: [MultiselectIconDropdown],
    exports: [MultiselectIconDropdown]
})


export class MultiselectIconDropdownModule { }