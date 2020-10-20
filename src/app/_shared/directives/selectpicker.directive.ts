import { Directive, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var jQuery: any;
@Directive({
    selector: '[selectPicker]'
})
export class SelectPickerDirective {
    @Output('selectPicker') onchangemodel = new EventEmitter<any>();

    constructor(public el: ElementRef, public _ngModel: NgModel, private zone: NgZone) {
         
    }

    ngOnInit() {
        let thisRef = this;
        this.zone.runOutsideAngular(() => {
            jQuery(this.el.nativeElement).selectpicker(); 
        });
        
        if (jQuery(this.el.nativeElement).attr('name') == 'InteractionType') {
            this._ngModel.control.registerOnChange(function () {                
                thisRef.onchangemodel.emit('');
            });
        } else if (jQuery(this.el.nativeElement).attr('name') == 'educatorType') {
            this._ngModel.control.registerOnChange(function () {
                thisRef.onchangemodel.emit('');
            });
        } else if (jQuery(this.el.nativeElement).attr('name') == 'homeLanguage') {
            this._ngModel.control.registerOnChange(function () {
                thisRef.onchangemodel.emit('');
            });
        } else if (jQuery(this.el.nativeElement).attr('name') == 'premiumLanguage') {
            this._ngModel.control.registerOnChange(function () {
                thisRef.onchangemodel.emit('');
            });
        } else if (jQuery(this.el.nativeElement).attr('name') == 'educatorProfileState') {
            this._ngModel.control.registerOnChange(function () {
                thisRef.onchangemodel.emit('');
            });
        } else if (jQuery(this.el.nativeElement).attr('name') == 'studentReportType') {
            this._ngModel.control.registerOnChange(function () {
                thisRef.onchangemodel.emit(jQuery(thisRef.el.nativeElement).val());
            });
        } else if (jQuery(this.el.nativeElement).attr('name') == 'childListDropDown') {
            this._ngModel.control.registerOnChange(function () {
                thisRef.onchangemodel.emit('');
            });
        } else if (jQuery(this.el.nativeElement).attr('name') == 'timePeriodDropDWN') {
            this._ngModel.control.registerOnChange(function () {
                thisRef.onchangemodel.emit('');
            });
        }
               
        jQuery(this.el.nativeElement).on("change", function () { 
            thisRef._ngModel.control.setValue(jQuery(this).val());  
            thisRef._ngModel.update.emit(jQuery(this).val());
        });  

        setTimeout(function () {
            thisRef.refreshSelectPicker();
        });
    } 

    ngAfterViewInit() {
        this.refreshSelectPicker();
    }

    refreshSelectPicker() {
        jQuery(this.el.nativeElement).selectpicker('refresh');
    }

    setValueInSelectPicker(val) {        
        this._ngModel.update.emit(val); 
        jQuery(this.el.nativeElement).val(val)             
        this.refreshSelectPicker();
    }
}
