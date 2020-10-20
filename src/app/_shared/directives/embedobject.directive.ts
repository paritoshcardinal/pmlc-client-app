import { Directive, ElementRef, Input } from '@angular/core';
declare var jQuery: any;
@Directive({
    selector: '[embedObject]'
})
export class EmbedObjectDirective {

    @Input('embedObject') embedobjecturl: any;

    constructor(public el: ElementRef) {

    }

    ngOnInit() {
        jQuery(this.el.nativeElement).html('');
        var objectHtml = '<object width="100%" height="700px" data="' + this.embedobjecturl + '">' +
            '<param name="SRC" value="' + this.embedobjecturl + '"/>' +
            '<param name="base" value="' + this.getBaseUrl(this.embedobjecturl) + '" />' +
            '<param name="wmode" value="transparent" />' +
            '<embed width="100%" height="700px" src="' + this.embedobjecturl + '" base="' + this.getBaseUrl(this.embedobjecturl) + '" wmode="transparent"/>' +
            '</object>';

        jQuery(this.el.nativeElement).html(objectHtml);
    }

    getBaseUrl(url) {
        var swfBaseUrl = url ? url.toString().substring(0, url.toString().lastIndexOf("/") + 1) : '';
        return swfBaseUrl;
    }


}
