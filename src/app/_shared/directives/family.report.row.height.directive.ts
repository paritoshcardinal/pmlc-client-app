import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;

@Directive({
    selector: '[setRowHeight]'
})
export class FamilyReportRowHeightDirective {
    constructor(public el: ElementRef) {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateHeight(); 
        }, 50);
    }

    updateHeight() {
        let h = jQuery(this.el.nativeElement).parent().parent().height();
        jQuery(this.el.nativeElement).css({ 'min-height': h + 'px' }); //height(h);
    }
}
