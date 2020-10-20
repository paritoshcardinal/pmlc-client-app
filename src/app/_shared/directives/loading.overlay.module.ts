import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PmlLoadingOverlayDirective} from './loading.overlay.directive';
@NgModule({
    imports: [CommonModule],
    declarations: [PmlLoadingOverlayDirective],
    exports: [PmlLoadingOverlayDirective]
})
export class PmlLoadingOverlayModule { }