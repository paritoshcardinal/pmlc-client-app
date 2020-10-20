import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
@Directive({ selector: '[pmlStrictIf]' })
export class PmlStrictIfDirective {
    isNonCSS: any;
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }

    @Input() set pmlStrictIf(dataToValidate: any) {
        if (null != dataToValidate && '' != dataToValidate && 'undefined' != dataToValidate && dataToValidate.length>0) {
        // If condition is true add template to DOM
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            // Else remove template from DOM
            this.viewContainer.clear();
        }
    }

}