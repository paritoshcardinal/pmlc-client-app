import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EducatorAccountComponent } from './educator.account.component';
const routes: Routes = [
    { path: '', pathMatch: 'full', component: EducatorAccountComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EducatorAccountRoutingModule { }