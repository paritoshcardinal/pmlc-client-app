import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './notfound.component';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [NotFoundComponent],
    exports: [NotFoundComponent]
})


export class NotFoundModule { }