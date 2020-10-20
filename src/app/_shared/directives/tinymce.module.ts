import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TinyMCEDirective } from './tinymce.directive';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [TinyMCEDirective],
    exports: [TinyMCEDirective]
})


export class TinyMCEModule { }