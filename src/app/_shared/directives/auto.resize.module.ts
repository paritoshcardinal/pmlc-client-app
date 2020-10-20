﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Autosize } from './auto.resize.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [Autosize],
    exports: [Autosize]
})


export class AutoSizeModule { }