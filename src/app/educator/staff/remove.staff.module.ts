import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RemoveStaffComponent} from './remove.staff.component';
import {SchoolStaffService} from '@app/_services';
import { TrustedInnerHtmlModule } from '@app/_shared/directives'; 

@NgModule({
    imports: [FormsModule, CommonModule, HttpClientModule, TrustedInnerHtmlModule],
    declarations: [RemoveStaffComponent],
    providers: [SchoolStaffService],
    exports: [RemoveStaffComponent]
})
         
export class RemoveStaffModule {
  
}