import { Component, Pipe, OnInit, HostListener, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs-operators';
import { EllipisePipe } from '../pipes/ellipise.pipe';

export interface ColorOption {
    id: number;
    value: string;
    name: string;
}

export interface ColorSettings {
    pullRight?: boolean;
    enableSearch?: boolean;
    checkedStyle?: 'checkboxes' | 'glyphicon';
    buttonClasses?: string;
    selectionLimit?: number;
    closeOnSelect?: boolean;
    showCheckAll?: boolean;
    showUncheckAll?: boolean;
    dynamicTitleMaxItems?: number;
    maxHeight?: string;
    height?: string;
    maxWidth?: string;
    multiSelect: boolean;
    ellipsisCount?: number;
    toggleCallback?: any;

}

@Component({
    selector: 'color-dropdown',
    templateUrl: '../../../../Template2.0/shared2.0.1/colordropdown.html',
    styleUrls: ['../../../../css/apps/shared2.0.1/colordropdown.css',
        '../../../../css/libs/bootstrap-multiselect.css',
        //'../../../../css/libs/custom-inputs.css'
    ]
})
export class ColorDropdown implements OnInit {   
    @Input() tabColor: string;
    @Output() emitToParent = new EventEmitter();
    options: Array<ColorOption>;

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
            this.isVisible = false;
        }
    }

    numSelected: number = 0;
    isVisible: boolean = false;
    selectedColor: any;

    constructor(private element: ElementRef) {
        this.options = [
            { id: 1, value: '#e4523a', name: 'red' },
            { id: 2, value: '#fda224', name: 'orange' },
            { id: 3, value: '#ffd74f', name: 'yellow' },
            { id: 4, value: '#68a948', name: 'green' },
            { id: 5, value: '#60a2ce', name: 'light-blue' },
            { id: 6, value: '#0976b9', name: 'blue' },
            { id: 7, value: '#021d62', name: 'navy-blue' },
            { id: 8, value: '#5d2c7e', name: 'purple' },
            { id: 9, value: '#929292', name: 'gray' }
        ];
    }

    ngOnInit() {
        let temp = [];                
        this.selectedColor = { id: 1, value: '', name: '' };
        let objEle = this.options.filter(a => a.value == this.tabColor.toLowerCase());
        if (typeof objEle[0] != 'undefined') {
            this.selectedColor = objEle[0];
        }
       
    }

    toggleDropdown(event) {
        this.isVisible = !this.isVisible;        
    }

    setSingleSelected(event: Event, option: ColorOption) {
        this.selectedColor = option;
        this.toggleDropdown(event);
        this.emitToParent.emit({ action: 'set_color', value: option.value });
    }
    
}