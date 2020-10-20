import {Component, OnInit, HostListener, Input, ElementRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms'

@Component({
    selector: 'group-dropdown',
    templateUrl: '../../../../Template2.0/shared2.0.1/GroupDropdown.html',
    styleUrls: ['../../../../css/apps/shared2.0.1/GroupDropdown.css'],
    encapsulation: ViewEncapsulation.None
})
export class GroupDropdown implements OnInit {
    @Input() defaultValue: any;
    @Input() dataList: any = [];
    @Output('selectedmodel') model = new EventEmitter();
    @Output('clickModel') clickModel = new EventEmitter();
    @Output('handleEventModel') handleEventModel = new EventEmitter();
    public showDropdown: boolean = false;
    @HostListener('document: click', ['$event.target'])

    onClick(target) {
        let parentFound = false;
        while (target !== null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            this.showDropdown = false;
        }


        //let classList = ['filter-option pull-left', 'power-dropdown-menu-btn no-css-dropdwon-btn'];
        //if (jQuery.inArray(jQuery(target).prop("class"), classList) == -1) {
        //    this.showDropdown = false;
        //}
    }

    constructor(private element: ElementRef) {

    }

    ngOnInit() {
        
    }

    toggleDropdownButton(event) {
        this.showDropdown = !this.showDropdown;
        this.clickModel.emit(this.showDropdown);
        this.handleEventModel.emit({ value: this.showDropdown, event: event });
    }

    selectOption(opt) {
        this.defaultValue = opt.value;
        this.model.emit(opt.value);
        this.showDropdown = false;
    }
}