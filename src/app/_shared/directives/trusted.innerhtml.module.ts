import {NgModule, ModuleWithProviders, NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrustedInnerHtmlDirective} from './trusted.innerhtml.directive';
//
@NgModule({
    imports: [CommonModule],
    declarations: [TrustedInnerHtmlDirective],
    exports: [TrustedInnerHtmlDirective]
})
export class TrustedInnerHtmlModule {

}