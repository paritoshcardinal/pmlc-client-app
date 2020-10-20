import {Component, Pipe, OnInit, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms'
import {Observable} from 'rxjs-operators';
import { EllipisePipe } from '../pipes/ellipise.pipe';

declare function hasMin(attr, accumulator)

export interface IMultiSelectOption {
    id: string;
	value: string;
	name: string;    
}

export interface IMultiSelectSettings {
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

export interface IMultiSelectTexts {
	checkAll?: string;
	uncheckAll?: string;
	checked?: string;
	checkedPlural?: string;
	searchPlaceholder?: string;
	defaultTitle?: string;
}

@Component({
    selector: 'multiselect-dropdown',   	
    templateUrl: 'MultiSelectDropDown.html',
    styleUrls: [
        '../../../css/libs/bootstrap-multiselect.css',
        '../../../css/libs/custom-inputs.css'
        ]
})
export class MultiselectDropdown implements OnInit {
    @Input() options: Array<IMultiSelectOption>;
    @Input() settings: IMultiSelectSettings;
    @Input() texts: IMultiSelectTexts;

    @Input('defaultmodel') selectedModel: Array<string> = [];
    @Input('defaultmodelsingle') selectedModelSingle: string = '';

    @Input('titleChange') titleChange: boolean = false;

    @Output('selectedmodel') model = new EventEmitter();
    @Output() selectionLimitReached = new EventEmitter();

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
    
    public numSelected: number = 0;
    public isVisible: boolean = false;
    public search = new FormControl();
    public searchFilterText: string = '';

    public defaultSettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: false,
        showUncheckAll: false,
        dynamicTitleMaxItems: 3,
        maxHeight: '300px',
        multiSelect: true,
        ellipsisCount:15
    };

    public defaultTexts: IMultiSelectTexts = {
        checkAll: 'Check all',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'None',
    };
    selectedOptions: Array<IMultiSelectOption> = [];

    constructor(private element: ElementRef) {     
    }
    
    ngOnInit() {
        let temp = [];
        if (typeof this.options[0] === 'string') {
            this.options.forEach(function (value, index) {
                temp.push({ 'name': value,'value': value, 'id': value });
            });
            this.options = temp;
        } 
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        if (this.settings.multiSelect) {
            this.updateNumSelected();
            this.search.valueChanges
                .subscribe((text: string) => {
                    this.searchFilterText = text;
                });

            this.initSelectedOptions();
        } else {
            this.selectedOptions = [];
            let objEle = this.options.filter(a => a.value == this.selectedModelSingle);
            if (typeof objEle[0] != 'undefined') {
                this.selectedOptions.push({ 'id': objEle[0].id, 'name': objEle[0].name, 'value': objEle[0].value });
            }            
        }        
    }

    initSelectedOptions() {
        this.selectedOptions = []

        if (this.selectedModel.length > 0) {
            for (var x = 0; x < this.selectedModel.length; x++) {
                var key = this.selectedModel[x];
                var objEle = this.options.filter(a => a.value == key);
                if (typeof objEle[0] != 'undefined') {
                    this.selectedOptions.push({ 'id': objEle[0].id, 'name': objEle[0].name, 'value': objEle[0].value });
                }
            }
        }
    }
    
    getObject(keyVal: string): IMultiSelectOption {
        return this.options.filter(a => a.value == keyVal)[0];
    }

    clearSearch() {
        this.search.setValue('');
    }
    
    toggleDropdown(event) {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.settings.toggleCallback && this.settings.toggleCallback(event);
        }
    }
    
    modelChanged() {
        this.updateNumSelected();
        this.model.emit(this.selectedModel);
    }
    
    isSelected(option: IMultiSelectOption): boolean {        
        return this.selectedModel.indexOf(option.value) > -1;
    }
    
    setSelected(event: Event, option: IMultiSelectOption) {

        var index = this.selectedModel.indexOf(option.value);
        if (index > -1) {
            this.selectedModel.splice(index, 1);
            this.initSelectedOptions();
        } else {
            if (this.settings.selectionLimit === 0 || this.selectedModel.length < this.settings.selectionLimit) {
                this.selectedModel.push(option.value);
                this.initSelectedOptions();
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

    setSingleSelected(event: Event, option: IMultiSelectOption) {
        this.selectedOptions = [];
        this.selectedOptions.push(option);
        this.selectedModelSingle = option.value;
        if (this.settings.closeOnSelect) {
            this.toggleDropdown(event);
        }
        this.model.emit(this.selectedModelSingle);
    }

    setTitleFromParent(option: IMultiSelectOption) {
        this.selectedOptions = [];
        this.selectedOptions.push(option);
        this.selectedModelSingle = option.value;
        this.model.emit(this.selectedModelSingle);
    }

    hasMin(attrib, accumulator) {
        return accumulator.reduce(function (prev, curr) {
            return prev[attrib] < curr[attrib] ? prev : curr;
        }
    )};

    getTitle() {       
        var title = this.texts.defaultTitle;
        if(this.selectedOptions.length > 0){
            var obj = this.hasMin('id', this.selectedOptions);
            if (this.titleChange) {
                if (obj.name == "Anyone") {
                    title = "Created by Anyone";
                }
                else if (obj.name == "Me"){
                    title = "Created by Me";
                }
                else {
                    title = "Created by";
                }
            }
            else {
                title = obj.name;
            }
           
        }
        return title;        
    }
    
    updateNumSelected() {
        this.numSelected = this.selectedModel.length;
    }
    
    checkAll() {
        this.selectedModel = this.options.map(option => option.value);
        this.modelChanged();
    }
    
    uncheckAll() {
        this.selectedModel = [];
        this.modelChanged();
    }
    
    /**
     * Only for Single Select
     * if value change in model from parent compoment then set that value in dropdown.
     * @param value
     */
    setOptionFromParent(value) {
        this.selectedOptions = [];
        let objEle = this.options.filter(a => a.value == value);
        if (typeof objEle[0] != 'undefined') {
            this.selectedOptions.push({ 'id': objEle[0].id, 'name': objEle[0].name, 'value': objEle[0].value });
        }
    }
    
}