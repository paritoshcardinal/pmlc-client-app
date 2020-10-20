import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FamilyReportRowHeightDirective } from './family.report.row.height.directive';
@NgModule({
    imports: [CommonModule],
    declarations: [FamilyReportRowHeightDirective],
    exports: [FamilyReportRowHeightDirective]
})
export class FamilyReportRowHeightModule { }