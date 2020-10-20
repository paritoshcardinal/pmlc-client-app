import { Directive, ElementRef, Input } from '@angular/core';
declare var jQuery: any;
@Directive({
    selector: '[datePicker]'
})
export class DatePickerDirective {

    @Input('datePicker') option: any;

    constructor(public el: ElementRef) {

    }

    ngOnInit() {
        var dt;
        var changeFunc = this.option.changeFunc;
        var showdatePicker = this.option.showdatePicker;
        var hidedatePicker = this.option.hidedatePicker;
        var clearDateFunc = this.option.clearDateFunc;

        let thisRef = this;
        jQuery(this.el.nativeElement).datepicker(this.option).on('show', function (ev) {
            dt = jQuery(ev.target).find('input').val();
            if (typeof dt != 'undefined' && dt != '') {
                jQuery(thisRef.el.nativeElement).datepicker('update', new Date(dt));
            }
            if (typeof showdatePicker === 'function') {
                showdatePicker(ev.format(), jQuery(ev.target).find('input'));
            } 
        }).on('hide', function (ev) {
            if (jQuery(ev.target).find('input').val() == '') {
                jQuery(ev.target).find('input').val(dt);
            }
            if (typeof hidedatePicker === 'function') {
                hidedatePicker(ev.format(), jQuery(ev.target).find('input')); 
            }  
        }).on('changeDate', function (ev) {
            if (typeof changeFunc === 'function') {
                changeFunc(ev.format(), jQuery(ev.target).find('input'));
            }            
        }).on('clearDate', function (ev) {
            if (typeof clearDateFunc === 'function') {
                clearDateFunc(thisRef.el.nativeElement);
            }
        });
    }

}
