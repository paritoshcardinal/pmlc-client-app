import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { anchorReplaceTargetBlankDirective } from './anchor.replacetarget.blank.directive';
@NgModule({
    imports: [CommonModule],
    declarations: [anchorReplaceTargetBlankDirective],
    exports: [anchorReplaceTargetBlankDirective]
})
export class anchorReplaceTargetBlankModule {
}