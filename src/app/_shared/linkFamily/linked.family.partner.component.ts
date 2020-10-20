import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
//import { DomSanitizer } from '@angular/platform-browser';
import { LinkFamilyService} from './service/link.family.service';
import { MyFamilyModel, MyFamilyMemberModel } from './model/link.family.model';
@Component({
    selector: 'linked-family-partner',
    templateUrl: '../../../../Template2.0/shared2.0.1/LinkedFamilyPartner.html',
    styleUrls: ['./../../../../css/apps/shared2.0.1/linked-family.css']
})

export class LinkedFamilyPartnerComponent {
    @Input() fromDashboard: boolean;
    myFamilyModel: MyFamilyModel;
    myFamilyMemberModel: MyFamilyMemberModel;
 
    constructor(private _linkFamilyService: LinkFamilyService) {
        this.myFamilyModel = new MyFamilyModel();
        this.myFamilyMemberModel = new MyFamilyMemberModel();
    };

    ngOnInit() {
        this.myFamilyModel.studentLinkedFamilies = { ParentDetails: [], StudentCode: '', StudentName: '' };
        this.populateInvitedFamilyList();
    }

    populateInvitedFamilyList() {
        var thisref = this;
        this._linkFamilyService.GetFamilyInformation((data) => {
            let familyInfo = data.result;
            thisref.myFamilyModel.studentLinkedFamilies = { ParentDetails: [], StudentCode: '', StudentName: '' };
            thisref.myFamilyModel.studentLinkedFamilies.StudentCode = familyInfo.StudentCode;
            thisref.myFamilyModel.studentLinkedFamilies.StudentName = familyInfo.StudentName;
            if (familyInfo.ParentDetails != null) {
                thisref.myFamilyModel.hasStudentFamilyLinks = true;
            } else {
                thisref.myFamilyModel.hasStudentFamilyLinks = false;
            }
            if (familyInfo.ParentDetails != null) {
                familyInfo.ParentDetails.forEach(function (val, ind) {
                    if (val.IsApproved != null) {
                        thisref.myFamilyModel.studentLinkedFamilies.ParentDetails.push(thisref.myFamilyModel.bindModelValue(val));
                    }
                });
            }

        });
    }

    showAddEditFamilyPopUp() {
        let fm = this.myFamilyModel;
        fm.modalConfig = {};
        fm.modalConfig = {
            'showFamilyMemberPopUp': true,
        }
    }
    receiveChildrenEvent(event) {
        if (event["action"] == 'closepopup') {
            this.hideAddEditFamilyPopUp();
        } else if (event["action"] == 'manageDisplay') {
            this.manageFamilyDisplay(event["data"]);
        }
    }
    hideAddEditFamilyPopUp() {
        let ths = this;
        let fm = ths.myFamilyModel;
        fm.modalConfig = {};
        ths.myFamilyModel.studentLinkedFamilies.ParentDetails.forEach(function (val, ind) {
            ths.myFamilyModel.studentLinkedFamilies.ParentDetails[ind].isEditMode = false;
        });
    }
    manageFamilyDisplay(data) {
        let fm = this.myFamilyModel;
        if (data.length > 0) {
            fm.hasStudentFamilyLinks = true;
        } else {
            fm.hasStudentFamilyLinks = false;
        }
    }

   
   
}

