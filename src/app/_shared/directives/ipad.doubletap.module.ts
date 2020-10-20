import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleTapDirective } from './ipad.doubletap.directive';
@NgModule({
    imports: [CommonModule],
    declarations: [DoubleTapDirective],
    exports: [DoubleTapDirective]
})
export class DoubleTapModule {
}