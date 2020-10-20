import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LinkedFamilyPartnerComponent} from './linked.family.partner.component';
import { LinkedFamilyComponent} from './linked.family.component';
import {MultiselectDropdownModule} from 'shared2.0.1/component/multiselect.module';
import { PmlLoadingOverlayModule } from 'shared2.0.1/directives/loading.overlay.module';
import { GroupDropdownModule } from 'shared2.0.1/component/groupdropdown.module';

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, MultiselectDropdownModule, PmlLoadingOverlayModule, GroupDropdownModule],
    declarations: [LinkedFamilyPartnerComponent,LinkedFamilyComponent],
    exports: [LinkedFamilyPartnerComponent,LinkedFamilyComponent]
})


export class LinkedFamilyModule { }