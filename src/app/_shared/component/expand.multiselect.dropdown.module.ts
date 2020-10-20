import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpandedMultiselectDropdown} from './expand.multiselect.dropdown.component';
import { EllipisePipeModule } from '../pipes/ellipise.module';

@NgModule({
    imports: [FormsModule, CommonModule, EllipisePipeModule],
    declarations: [ExpandedMultiselectDropdown],
    exports: [ExpandedMultiselectDropdown]
})


export class ExpandedMultiselectDropdownModule { }