import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalPopupComponent } from './modal.popup.component';
import { PmlLoadingOverlayModule } from 'shared2.0.1/directives/loading.overlay.module';
import { MultiselectDropdownModule } from 'shared2.0.1/component/multiselect.module';
import { TrustedInnerHtmlModule } from 'shared2.0.1/directives/trusted.innerhtml.module';
import { DynamicComponentLoaderModule } from "shared2.0.1/dynamic-component-loader/dynamic-component-loader.module";
@NgModule({
    imports: [CommonModule, PmlLoadingOverlayModule, FormsModule, MultiselectDropdownModule, TrustedInnerHtmlModule, DynamicComponentLoaderModule.forChild(ModalPopupComponent)],
    exports: [ModalPopupComponent],
    declarations: [ModalPopupComponent ]
})
export class ModalPopupModule {
}