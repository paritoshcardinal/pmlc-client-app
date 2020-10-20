import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { EllipisePipe } from './ellipise.pipe';
import { NewLineEllipisePipe } from './newline.elipses.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [EllipisePipe,NewLineEllipisePipe],
    exports: [EllipisePipe,NewLineEllipisePipe]
})
export class EllipisePipeModule { }