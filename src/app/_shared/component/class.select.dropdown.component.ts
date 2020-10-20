import {Component, Pipe, OnInit, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms'
import {Observable} from 'rxjs-operators';


@Component({
    selector: 'class-select-dropdown',   	
    templateUrl: '../../../../Template2.0/shared2.0.1/ClassSelectDropDown.html',
    styleUrls: [
        '../../../../css/apps/shared2.0.1/classSelectDropdown.css',
        '../../../../css/libs/bootstrap-multiselect.css',
        '../../../../css/libs/custom-inputs.css'
        ]
})
export class ClassSelectDropdown {
    @Input() inputConfig: any;
    @Output() emitToParent = new EventEmitter();

    selectClass(classData) {        
        this.emitToParent.emit({ action: 'get_selected_class', data: classData });
    }
}
