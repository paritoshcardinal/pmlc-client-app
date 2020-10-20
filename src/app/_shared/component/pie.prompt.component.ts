import { Component, Output, Input, ElementRef, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation} from '@angular/core';
import { PieQuestionComponent } from 'shared2.0.1/piequestion/pie.question.component';
import { WindowRef } from "shared2.0.1/services/window.ref.service";

@Component({
    selector: 'pie-prompt-render',
    template: '<multiple-choice [attr.pie-id]="guid"> </multiple-choice>',    
    encapsulation: ViewEncapsulation.None
})

export class PiePromptRenderComponent {
    @Input() prompt: any;
    @Input() guid: any;

    window: any = null;
    renderMode: string;
    modelData: any = {
        "choiceMode": "radio",
        "element": "multiple-choice",
        "id": "1",
        "keyMode": "letters",
        "prompt": "",
        "choices": [],
        "showChoiceLabel": false
    }
    constructor(private _windowRef: WindowRef, public el: ElementRef) {
        this.renderMode = 'view' // 'view' mode;   
        this.window = _windowRef.nativeWindow
    }

    ngOnInit() {
        this.modelData['id'] = this.guid;
        this.modelData['prompt'] = this.prompt;
    }

    ngAfterViewInit() {
        this.window.session = [];        
        const model = this.modelData;
        this.updateElementForRendering('multiple-choice', model, model.id);
    }

    ngOnChanges(changes) {
        if (changes.prompt && changes.prompt.currentValue != changes.prompt.previousValue) {            
            this.modelData['id'] = this.guid;
            this.modelData['prompt'] = this.prompt;            
            this.window.session = [];
            const model = this.modelData;
            this.updateElementForRendering('multiple-choice', model, model.id);
            setTimeout(() => {
                let $content = jQuery(this.el.nativeElement);
                $content.find('br').remove();
            }, 500);            
        }
    }

    updateElementForRendering(elementName, model, id) {
        const session = this.getSession(id);
        this.window['pie-controller-pie-item'][elementName].model(model, session, { mode: 'view' }).then(uiModel => {
            let a = elementName + "[pie-id='" + id + "']";
            let el = this.window.document.querySelector(a);
            if (el) {
                el.model = uiModel;
                el.session = session;                
            }
        });
    }

    getSession(id) {
        const s = this.window.session.find(s => s.id === id);
        if (s) {
            return s;
        }
        const newSession = { id };
        this.window.session.push(newSession);
        return newSession;
    }
}