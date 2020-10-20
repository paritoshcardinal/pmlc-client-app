import {Component, OnInit, Input, HostListener, Output, EventEmitter,OnDestroy} from '@angular/core';
@Component({
    selector: 'pmlwindowscroll',
    template: '<div class="loading" *ngIf="!isNotLoading"><img src="/Content/assets/images/gif-load2.gif" alt="Loading.."></div>',
    styles: [`.loading {
    text-align: center;
    padding-top: 100px;
    color: #6f6f6f;
    font-size: 18px;
    font-style: italic;
    font-family: MuseoSans-300;
    clear: left;
}`]
    
})
export class PmlWindowScrollComponent{
    @Input() isNotLoading: boolean;
    @Input() scrollElement: string;
    @Input() footerId: string = null;
    @Output() parent = new EventEmitter<any>();
    public timeIntervalId: any;
    loadMore(isNotLoading) {
        let ths = this;
        if (isNotLoading && jQuery(document).height() <= jQuery(window).height()) {
            ths.parent.emit(); 
        } 
    }
    loadMoreWhenNoScroll() {
        let ths = this;
        if (typeof ths.scrollElement == 'undefined') {
           
            ths.loadMore(true);
            clearInterval(ths.timeIntervalId);
            ths.timeIntervalId = setInterval(function () {
                ths.loadMore(ths.isNotLoading);
                setTimeout(function () {
                    var winH = jQuery(window).height();
                    var docH = jQuery(document).height();
                    if ((winH - docH) < 0) {
                        clearInterval(ths.timeIntervalId);
                        ths.timeIntervalId = null;
                    }
                }, 250);
            }, 300);
        }
    }
    ngAfterViewInit() {
        let ths = this;

        let scrollBody = null;
        if (typeof ths.scrollElement == 'undefined') {
            scrollBody = jQuery(window);
        } else {
            scrollBody = jQuery(this.scrollElement);
        }
        ths.loadMoreWhenNoScroll();
        scrollBody.bind("scroll", function (e) {
            
            if (typeof ths.scrollElement == 'undefined') {
                    var winH = jQuery(window).height();
                    var docH = jQuery(document).height();
                    var scroll = jQuery(window).scrollTop();

                    if (ths.footerId != null) {
                        var foot = jQuery("#" + ths.footerId).height();
                        docH = docH - (foot - 114);
                    }
                    if ((scroll + winH) >= (docH - 10)) {
                        if (ths.isNotLoading) {
                            ths.parent.emit();
                        }
                    }
            } else {      
                let scrollH = jQuery(this)[0].scrollHeight;
                let scrollT = jQuery(this).scrollTop();
                let outerH = jQuery(this).height();
                let scrollDiff = scrollH - scrollT;
                if (ths.isNotLoading && (scrollDiff > outerH - 1 && scrollDiff < outerH + 1)) {
                    ths.parent.emit();
                }
            }
            
        });
    }

    //@HostListener("window:scroll", ["$event"])
    //onWindowScroll() {
    //    var winH = jQuery(window).height();
    //    var docH = jQuery(document).height();
    //    var scroll = jQuery(window).scrollTop();
    //    if (docH - winH == scroll) {
    //        if (this.isNotLoading) {
    //            this.parent.emit();
    //        }
    //    }
    //}
    ngOnDestroy() {
        clearInterval(this.timeIntervalId);
        this.timeIntervalId = null;
    } 
}