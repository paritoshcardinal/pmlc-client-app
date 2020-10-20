import {Component, Pipe, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms'
import {Observable} from 'rxjs/Rx';
import { EllipisePipe } from '../pipes/ellipise.pipe';

@Component({
    selector: 'multiselect-icon-dropdown',   	
    templateUrl: 'MultiSelectIconDropDown.html',
    styleUrls: [
        '../../../css/libs/bootstrap-multiselect.css',
        '../../../css/libs/custom-inputs.css'
        ]
})
export class MultiselectIconDropdown {
    @Input() inputConfig: any;//{options:[], defaultTitle: '', multiselect: boolean, closeOnSelect: boolean, isDisable: boolean}
    @Input('defaultmodel') selectedModel: Array<any> = [];
    @Output('selectedmodel') model = new EventEmitter();

    @HostListener('document: click', ['$event.target'])

    onClick(target) {
        let parentFound = false;
        while (target !== null && !parentFound) {
            if (target === this.element.nativeElement ) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            this.isVisible = false;
        }
    }
    
    isVisible: boolean = false;

    constructor(private element: ElementRef) {     
    }
    toggleDropdown() {
        this.isVisible = !this.isVisible;
    }
    
    isSelected(option) {
        return this.selectedModel.findIndex((item) => { return item.value == option.value }) > -1;
    }
    
    setSelected(option) {
        if (this.inputConfig.multiselect) {
            var index = this.selectedModel.findIndex((item) => { return item.value == option.value });
            if (index > -1) {
                this.selectedModel.splice(index, 1);
            } else {
                this.selectedModel.push(option);
            }
        } else {
            this.selectedModel = [];
            this.selectedModel.push(option);
        }
        if (this.inputConfig.closeOnSelect) {
            this.toggleDropdown();
        }
        this.modalChanged();
    }

    modalChanged() {
        this.model.emit(this.selectedModel);
    }
    checkAll() {
        if (this.selectedModel.length == this.inputConfig.options.length) {
            this.selectedModel = [];
        } else {
            this.selectedModel = [];
            this.inputConfig.options.forEach((option) => {
                this.selectedModel.push(option);
                this.isSelected(option);
            });
        }
        this.modalChanged();
    }
    isAllSelected() {
        let arr = this.inputConfig.options.filter((option) => { return !option.disabled });
        return (arr.length == this.selectedModel.length);
    }
}