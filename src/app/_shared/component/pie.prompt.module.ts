import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { WindowRef } from "shared2.0.1/services/window.ref.service";
import { PiePromptRenderComponent } from "./pie.prompt.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [PiePromptRenderComponent],
    exports: [PiePromptRenderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [WindowRef]
})
export class PiePromptModule { }