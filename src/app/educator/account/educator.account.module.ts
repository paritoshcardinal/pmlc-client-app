import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {SelectPickerModule}  from '@app/_shared/directives';
import {MultiselectIconDropdownModule,MultiselectDropdownModule}  from '@app/_shared/component';
import {AccountService,BoxService} from '@app/_services';
import { GoogleAnayticsService } from '@app/_shared/analytics';
import { PmlHttpInterceptor } from '@app/_shared/interceptors';

import { EducatorAccountComponent } from './educator.account.component';
import { EducatorAccountRoutingModule } from './educator.account.routing';
import {RemoveStaffModule} from '../staff/remove.staff.module';
import {ProfilePictureComponent} from '../profile/profile.picture.component';



@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, EducatorAccountRoutingModule, RemoveStaffModule, SelectPickerModule, MultiselectIconDropdownModule, MultiselectDropdownModule],
    declarations: [EducatorAccountComponent, ProfilePictureComponent],
    exports: [EducatorAccountComponent],
    providers: [AccountService,BoxService, GoogleAnayticsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PmlHttpInterceptor,
            multi: true
        }],
    entryComponents: [EducatorAccountComponent]
})
export class EducatorAccountModule { }

