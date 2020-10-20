import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { MobilePreviewLinkComponent } from './mobile.previewlink.component'
import { PmlLoadingOverlayModule } from 'shared2.0.1/directives/loading.overlay.module';

@NgModule({
    imports: [CommonModule, FormsModule, PmlLoadingOverlayModule],
    declarations: [MobilePreviewLinkComponent],
    exports: [MobilePreviewLinkComponent]
})

export class MobilePreviewLinkModule { }