import { NgModule, ModuleWithProviders, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmlStrictIfDirective } from './pmlstrict.if.directive';
//
@NgModule({
    imports: [CommonModule],
    declarations: [PmlStrictIfDirective],
    exports: [PmlStrictIfDirective]
})
export class  PmlStrictIfModule {

}