import { Injectable, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import { Subject,Observable,of } from "rxjs-operators";
import { BaseService } from '@app/_services';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ImpersonationModalService {
    
   public modalOutletFactory: any = null;
   public  modalOutletsubscription: any;
     validateImpersonation(callback) {      
         return of(impUserId!=="0").subscribe(result => { callback(result); }, error => { callback(error); }, () => { });
    };

    constructor() {
    }

    loadImpersonationPopup(modalOutlet:any) {
    }
    receiveChildrenEmitter(event) {
    }
    ngOnDestroy() {
    }
}