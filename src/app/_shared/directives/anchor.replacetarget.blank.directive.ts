import { Directive, ElementRef, Input,AfterViewInit} from '@angular/core';

@Directive({
    selector: '[replaceTarget]'
})
export class anchorReplaceTargetBlankDirective {
   @Input() private replaceTarget: any;
    constructor(public elementRef: ElementRef) {
    }
    ngAfterViewInit() {
            jQuery(this.elementRef.nativeElement).find('a').attr('target', '_blank');
    } 
}
