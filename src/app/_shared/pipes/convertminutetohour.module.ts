import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConvertMinuteToHourPipe} from './convertminutetohour.pipe'
@NgModule({
    imports: [CommonModule],
    declarations: [ConvertMinuteToHourPipe],
    exports: [ConvertMinuteToHourPipe]
})
export class ConvertMinuteToHourPipeModule { }