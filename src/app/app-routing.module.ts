import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';

const routes: Routes = [
    {

        path: 'myeducatoraccount',
        children: [
            {
                path: '',
                loadChildren: './educator/account/educator.account.module#EducatorAccountModule'
            },
        ]
    },
    { path: '', redirectTo: '/myeducatoraccount', pathMatch: 'full' }
    ]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(router: Router) {
    }
}
