import {Component, Pipe, OnInit, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms'
import { Observable } from 'rxjs-operators';
import { EllipisePipe } from '../pipes/ellipise.pipe';

declare function hasMin(attr, accumulator)

export interface ExpandedMultiSelectOption {
    id: string;
    value: string;
    name: string;
    isExpand; boolean;
    disabled: boolean; 
    expandArray: Array<ExpandedOption>;
}

export interface ExpandedOption {
    id: string;
    value: string;
    name: string;
    disabled: boolean;   
}

export interface ExpandedMultiSelectSettings {
    pullRight?: boolean;    
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
}

export interface ExpandedMultiSelectTexts {
    checkAll?: string;
    uncheckAll?: string;
    checked?: string;
    checkedPlural?: string;
    searchPlaceholder?: string;
    defaultTitle?: string;
}

@Component({
    selector: 'expanded-multiselect-dropdown',
    templateUrl: '../../../../Template2.0/shared2.0.1/expandedmultiselectdropdown.html',
    styleUrls: ['../../../../css/libs/bootstrap-multiselect.css',
        '../../../../css/apps/shared2.0.1/expandedmultiselectdropdown.css',
        '../../../../css/libs/custom-inputs.css']
})
export class ExpandedMultiselectDropdown implements OnInit {
    @Input() options: Array<ExpandedMultiSelectOption>;
    @Input() settings: ExpandedMultiSelectSettings;
    @Input() texts: ExpandedMultiSelectTexts;

    @Input('defaultmodel') selectedModel: any = [];
    @Input('titleChange') titleChange: boolean = false;

    @Output('selectedmodel') model = new EventEmitter();
    @Output() selectionLimitReached = new EventEmitter();

    @HostListener('document: touchstart', ['$event.target'])
    @HostListener('document: click', ['$event.target'])

    onClick(target) {
        this.clickAndTouchHandler(target);
    }

    onStart(target) {
        this.clickAndTouchHandler(target);
    }

    clickAndTouchHandler(target) {
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

    public numSelected: number = 0;
    public isVisible: boolean = false;

    public defaultSettings: ExpandedMultiSelectSettings = {
        pullRight: false,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: false,
        showUncheckAll: false,
        dynamicTitleMaxItems: 3,
        maxHeight: '300px',        
    };

    public defaultTexts: ExpandedMultiSelectTexts = {
        checkAll: 'Check all',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'None',
    };
    //selectedOptions: Array<ExpandedMultiSelectOption> = [];

    constructor(private element: ElementRef) {
    }

    ngOnInit() {        
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        
        this.updateNumSelected();       
        //this.initSelectedOptions();
    }

    //initSelectedOptions() {
    //    this.selectedOptions = []
    //    if (this.selectedModel.length > 0) {
    //        for (let x = 0; x < this.selectedModel.length; x++) {
    //            let key = this.selectedModel[x];
    //            let objEle = this.options.filter(a => a.value == key.value); 
    //            if (typeof objEle[0] != 'undefined') {
    //                this.selectedOptions.push(objEle[0]);
    //            }               
    //        }
    //    }
    //}

    getObject(keyVal: string): ExpandedMultiSelectOption {
        return this.options.filter(a => a.value == keyVal)[0];
    }

    toggleDropdown(event) {
        this.isVisible = !this.isVisible;        
    }

    modelChanged() {
        this.updateNumSelected();
        this.model.emit(this.selectedModel);
    }

    isSelected(option: ExpandedMultiSelectOption): boolean {
        let index = this.selectedModel.findIndex((obj) => { return obj.value == option.value });
        let option_0 = this.selectedModel[index];
        let flag = false;
        if (option_0) {
            let array_1 = option.expandArray.filter((child) => { return !child.disabled });
            flag = option_0.expandArray.length == array_1.length;
        }        
        return index > -1 && flag;
    }
    
    setSelected(event: Event, option) {
        var index = this.selectedModel.findIndex((obj) => { return obj.value == option.value });
        if (index > -1) {
            let option_0 = this.selectedModel[index];
            let array_1 = option.expandArray.filter((child) => { return !child.disabled });
            if (option_0.expandArray.length != 0 && array_1.length > option_0.expandArray.length) {
                option_0.expandArray = this.copyAllChild(option.expandArray);
                option_0.isAllChildSelected = option_0.expandArray.length == option.expandArray.length;
            } else {
                this.selectedModel.splice(index, 1);
            }
            //this.initSelectedOptions();
        } else {
            if (this.settings.selectionLimit === 0 || this.selectedModel.length < this.settings.selectionLimit) {
                let objcopy = this.copyOption(option);
                this.selectedModel.push(objcopy);
                if (!option.isExpand) {
                    //option.isExpand = true; PML-8227
                }
                //this.initSelectedOptions();
            } else {
                this.selectionLimitReached.emit(this.selectedModel.length);
                return;
            }
        }
        if (this.settings.closeOnSelect) {
            this.toggleDropdown(event);
        }
        this.modelChanged();
    }

    isChildSelected(option: ExpandedMultiSelectOption, child: ExpandedOption) {
        let index = -1;
        let index_0 = this.selectedModel.findIndex((obj) => { return obj.value == option.value });
        let option_0 = this.selectedModel[index_0];
        if (option_0) {
            let arr = option_0.expandArray;
            index = arr.findIndex((obj) => { return obj.value == child.value });
        }
        return index > -1;
    }

    setChildSelected($event, option, child: ExpandedOption) {
        let index_0 = this.selectedModel.findIndex((obj) => { return obj.value == option.value });
        let option_0 = this.selectedModel[index_0];
        let childCopy = this.copyChild(child);
        if (option_0) {           
            let index = option_0.expandArray.findIndex((obj) => { return obj.value == child.value });
            if (index > -1) {
                option_0.expandArray.splice(index, 1);
                if (option_0.expandArray.length == 0) {
                    this.selectedModel.splice(index_0, 1);
                }
            } else {                
                option_0.expandArray.push(childCopy);  
            }
            option_0.isAllChildSelected = option_0.expandArray.length == option.expandArray.length;
        } else {
            let objcopy = { id: option.id, name: option.name, value: option.value, expandArray: [], isAllChildSelected: false, isClassShared: false };            
            objcopy.expandArray.push(childCopy); 
            objcopy.isAllChildSelected = objcopy.expandArray.length == option.expandArray.length;           
            objcopy.isClassShared = option.isClassShared;
            this.selectedModel.push(objcopy);
            //this.initSelectedOptions();
        }
        this.modelChanged();
    }

    hasMin(attrib, accumulator) {
        return accumulator.reduce(function (prev, curr) {
            return prev[attrib] < curr[attrib] ? prev : curr;
        });
    };

    getTitle() {
        var title = this.texts.defaultTitle;
        //if (this.selectedOptions.length > 0) {
        //    var obj = this.hasMin('id', this.selectedOptions);
        //    title = obj.name;
        //}
        return title;
    }

    updateNumSelected() {
        this.numSelected = this.selectedModel.length;
    }

    checkAll() {
        if (this.selectedModel.length == this.options.length) {
            this.selectedModel = [];
        } else {
            this.selectedModel = this.copyAllOptions();            
        }        
        this.modelChanged();
    }

    //uncheckAll() {
    //    this.selectedModel = [];
    //    this.modelChanged();
    //}

    isAllSelected() {
        let arr = this.options.filter((option) => { return !option.disabled});        
        return (arr.length == this.selectedModel.length);
    }

    copyOption(option) {
        let objcopy = { id: option.id, name: option.name, value: option.value, expandArray: [], isAllChildSelected: false, IsClassShared: false };
        objcopy.expandArray = this.copyAllChild(option.expandArray);        
        objcopy.isAllChildSelected = objcopy.expandArray.length == option.expandArray.length;
        objcopy.IsClassShared = option.isClassShared
        return objcopy;
    }

    copyAllOptions() {
        let copyArray = [];
        this.options.forEach((option) => {
            if (!option.disabled) {
                let objcopy = this.copyOption(option);
                copyArray.push(objcopy);
            }
        });
        return copyArray;
    }

    copyChild(o) {
        let a = { id: o.id, name: o.name, value: o.value };
        return a;
    }

    copyAllChild(sourceArray) {
        let targetArray = [];
        sourceArray.forEach((o) => {
            if (!o.disabled) {
                let a = this.copyChild(o);
                targetArray.push(a);
            }
        });
        return targetArray;
    }

    isAnyOneChildDisbaled() {
        let arr = this.options.filter((option) => { return option.disabled });     
        return arr.length > 0   
    }
}