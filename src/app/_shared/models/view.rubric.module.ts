
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewRubricComponent } from './view.rubric.component';
import { TrustedInnerHtmlModule } from 'shared2.0.1/directives/trusted.innerhtml.module';

@NgModule({
    imports: [FormsModule, CommonModule, TrustedInnerHtmlModule],
    declarations: [ViewRubricComponent],
    exports: [ViewRubricComponent]
})


export class ViewRubricModule { }