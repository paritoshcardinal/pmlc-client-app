import {Component, Input} from '@angular/core';
import { GoogleAnayticsService } from '../analytics/google.analytics.service';
import { UserInfoModel } from '../models/user.info.model';

@Component({
    selector: 'userinfo-popup',
    templateUrl: '../../../../Template2.0/shared2.0.1/UserInfoPopup.html',
    styleUrls: ['../../../../css/apps/shared2.0.1/userinfo-popup.css'],    
})

export class UserInfoPopupComponent extends UserInfoModel{
    @Input() hideoption: boolean;

    showLoginPopup: boolean;

    allLangArray = [];

    constructor(private gaService: GoogleAnayticsService) {
        super();
        this.showLoginPopup = false;        
    }

    onClickUserIcon() {        
        this.showLoginPopup = this.showLoginPopup ? false : true;
    }

    logout() {    
        logOutUtil(userType);
    }

    showMyAccount() {
        //to do later
        window.location.href = userType + "/my" + userType + "account";
       
    }
}