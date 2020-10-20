import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PmlNgForPipe} from './pml.ngfor.pipe'
@NgModule({
    imports: [CommonModule],
    declarations: [PmlNgForPipe],
    exports: [PmlNgForPipe]
})
export class PmlNgForPipeModule { }