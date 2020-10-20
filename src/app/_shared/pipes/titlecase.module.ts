import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TitleCasePipe} from './titlecase.pipe'
@NgModule({
    imports: [CommonModule],
    declarations: [TitleCasePipe],
    exports: [TitleCasePipe]
})
export class TitleCasePipeModule { }