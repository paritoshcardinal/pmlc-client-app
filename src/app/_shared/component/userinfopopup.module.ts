import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UserInfoPopupComponent } from './userinfo.popup.component';
import { LanguageDropdownModule } from './language.dropdown.module';

@NgModule({
    imports: [CommonModule, LanguageDropdownModule],
    declarations: [UserInfoPopupComponent],
    exports: [UserInfoPopupComponent]
})
export class UserInfoPopupModule { }