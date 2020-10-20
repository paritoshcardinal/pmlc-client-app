import {NgModule, ModuleWithProviders,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmbedObjectDirective} from './embedobject.directive';
@NgModule({
    imports: [CommonModule],
    declarations: [EmbedObjectDirective],
    exports: [EmbedObjectDirective]
})
export class EmbedObjectModule{
  
}