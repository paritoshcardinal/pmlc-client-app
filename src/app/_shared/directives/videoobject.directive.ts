import { Directive, ElementRef, Input } from '@angular/core';
declare var jQuery: any;
@Directive({
    selector: '[videoObject]'
})
export class VideoObjectDirective {

    @Input('videoObject') videoobjecturl: any;

    constructor(public el: ElementRef) {

    }

    ngOnInit() {
        jQuery(this.el.nativeElement).html('');
        var objectHtml = '<video width="100%" height="700px" controls>' +
            '<source src="' + this.videoobjecturl + '" type="video/mp4">' +
            '<source src="' + this.videoobjecturl + '" type="video/ogg">' +
            'Your browser does not support the video tag.</video>';

        jQuery(this.el.nativeElement).html(objectHtml);
    }

}
