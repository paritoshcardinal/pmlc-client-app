import { Directive, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var jQuery: any;
declare var Hammer: any;

@Directive({
    selector: '[doubletap]'
})
export class DoubleTapDirective {

    @Input('doubletap') settings: any;
    @Output() emitToElement: EventEmitter<any> = new EventEmitter<any>();

    constructor(public el: ElementRef, private zone: NgZone) {

    }

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        this.bindDoubleTapEvent();
    }
    
    bindDoubleTapEvent() {
        let thisRef = this;
        let stage = jQuery(this.el.nativeElement);
        let manager = new Hammer.Manager(this.el.nativeElement);

        let Tap = new Hammer.Tap({
            taps: 1
        });
        let DoubleTap = new Hammer.Tap({
            event: 'doubletap',
            taps: 2
        });

        DoubleTap.recognizeWith([Tap]);
        Tap.requireFailure([DoubleTap]);

        manager.add(DoubleTap);
        manager.add(Tap);

        manager.on('tap', function (e) {            
            thisRef.emitToElement.emit({ action: 'TAP', data: thisRef.settings});
        });

        manager.on('doubletap', function () {
            thisRef.emitToElement.emit({ action: 'DOUBLE_TAP', data: thisRef.settings });
        });
    }
}
