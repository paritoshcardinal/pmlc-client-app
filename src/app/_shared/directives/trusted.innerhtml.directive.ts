import { Directive, OnChanges, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[trustedInnerHtml]'
})
export class TrustedInnerHtmlDirective {
    @Input() trustedInnerHtml: any='';
    constructor(public el: ElementRef,private renderer: Renderer) {
    }
    ngOnInit() {
    } 
    ngAfterContentInit() {
        let innerHtml = this.trustedInnerHtml;
        if (innerHtml != null && !innerHtml.updateOnChange) {                      
            this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.trustedInnerHtml);
            this.removeBRTag();  
            this.removeNBSPTag();
        }
    }
    ngOnChanges(changes) {
        let currentValue = changes.trustedInnerHtml.currentValue;
        if (currentValue != null) {                       
            this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', currentValue);
            this.removeBRTag();
            this.removeNBSPTag();
        }       
    }

    removeBRTag() {
        if (jQuery(this.el.nativeElement).hasClass('no-css-remove-br')) {
            let $content = jQuery(this.el.nativeElement);
            $content.find('br').remove();
            let allPTags = $content.find('p');
            let emptyPTags = [];
            for (let i = 0; i < allPTags.length; i++) {
                let txt = jQuery.trim(jQuery(allPTags[i]).text());
                if (txt.length > 0) {
                    break;
                } else {
                    emptyPTags.push(allPTags[i]);
                }
            }
            emptyPTags.forEach((val) => {
                jQuery(val).remove();
            });
        }
    }

    removeNBSPTag() {
     if (jQuery(this.el.nativeElement).hasClass('remove-amp')) {
       jQuery(".remove-amp").html(function (i, html) {
           return html.replace(/&amp; nbsp;/g, '');
            });
        };
        
    }
}
