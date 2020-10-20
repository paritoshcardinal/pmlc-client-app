import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdown} from './multiselect.component';
import { EllipisePipeModule } from '../pipes/ellipise.module';

@NgModule({
    imports: [FormsModule, CommonModule, EllipisePipeModule],
    declarations: [MultiselectDropdown],
    exports: [MultiselectDropdown]
})


export class MultiselectDropdownModule { }