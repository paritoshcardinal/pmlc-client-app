import {OnInit, ElementRef, AfterViewInit, Directive, Component, Input, NgZone } from '@angular/core';

@Directive({
    selector: '[showmoreless]'
})

export class ShowMoreLessDirective implements AfterViewInit {

    @Input('showMoreLessConfig') settings: any
    @Input() content: any
    private currentWidth: number;
    private id: string = Math.random().toString(36).substr(2, 5);
    elementRef: ElementRef;

    constructor(private el: ElementRef, private zone: NgZone) {
        this.elementRef = el;

    }

    ngOnInit() {
        if (!this.el.nativeElement.getAttribute('id'))
            this.el.nativeElement.setAttribute('id', this.id);
        else
            this.id = this.el.nativeElement.getAttribute('id')
    }

    ngAfterViewInit() {
          
           let thisRef = this;
     
           setTimeout(function () {
               if (!thisRef.settings.hideShowMore) {
                   if (thisRef.settings.isToDO) {
                       thisRef.settings.showMore = '';
                       thisRef.settings.ellipsis = '...';
                       if (thisRef.elementRef.nativeElement.innerHTML.indexOf('<br class="mention-no-data">') != -1) {
                           thisRef.settings.showMore = '&hellip;';
                       }
                   }
                   else {
                       thisRef.settings.showMore = '<div style="display:inline-block;position:relative">&hellip; <a id="' + 'showmore' + thisRef.id + '" class="more-link" href="javascript:void(0)">Show More</a><div>';
                   }
                   jQuery(thisRef.elementRef.nativeElement).truncate(thisRef.settings);
               }
            }, 100)

           jQuery(document).on('click', '#showmore' + thisRef.id, (event) => {
                event.stopPropagation();
                if (event.currentTarget.innerHTML == "Show More") {
                    jQuery(thisRef.elementRef.nativeElement).truncate('expand');
                }
               
                return false;
            });
           
     
    }



}
