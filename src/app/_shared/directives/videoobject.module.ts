import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideoObjectDirective} from './videoobject.directive';
@NgModule({
    imports: [CommonModule],
    declarations: [VideoObjectDirective],
    exports: [VideoObjectDirective]
})
export class VideoObjectModule { }