import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowMoreLessDirective } from './showmoreless.directive';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ShowMoreLessDirective],
    exports: [ShowMoreLessDirective]
})


export class ShowMoreLessModule { }