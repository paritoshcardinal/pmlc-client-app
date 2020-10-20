import {Component, OnInit, Input, Output, ViewChild, ChangeDetectorRef, EventEmitter, ElementRef} from '@angular/core';
import { MyFamilyModel, MyFamilyMemberModel } from './model/link.family.model';
import { LinkFamilyService} from './service/link.family.service';

@Component({
    selector: 'linked-family',
    templateUrl: '../../../../Template2.0/shared2.0.1/LinkedFamily.html',
    styleUrls: ['./../../../../css/apps/shared2.0.1/linked-family.css']
})
export class LinkedFamilyComponent implements OnInit {
    @Input() params: any;
    @Output() emitToParent = new EventEmitter();
    studentFamilyData: any;    
    myFamilyModel: MyFamilyModel;

    public languageOptions: any = [];
    public selectedLang: any;

    constructor(private _linkFamilyService: LinkFamilyService, private ref: ChangeDetectorRef, private el: ElementRef) {        
        this.myFamilyModel = new MyFamilyModel();
        this.myFamilyModel.userName = userName;
        this.setModalData();
    }

    ngOnInit() {
        if (this.params.openfrom == 'rosters') {
            this.myFamilyModel.addFamilyPartnerDetail.StudentName = this.params.familyData.UserName;
            let parentDetail = this.params.familyData.ParentDetails;

            let parents = [];
            if (parentDetail != null) {
                parentDetail.forEach((val, ind) => {
                    parents.push(this.myFamilyModel.bindModelValue(val));

                });
                this.studentFamilyData = this.params.familyData;
                this.studentFamilyData.ParentDetails = parents;
                this.studentFamilyData.StudentName = this.params.familyData.FirstName +' '+ this.params.familyData.LastName;
                this.studentFamilyData.StudentCode = this.params.familyData.FamilyCode;
            }

            this.checkHasFamilyLinkCount();

        } else {
            this.getFamilyDetail();
        }
        this.languageOptions = getAllSortedLanguage();
    }

    createNewFamilyAccount() {
        let thisRef = this;
        setTimeout(function () {
            thisRef.myFamilyModel.addFamilyPartnerDetail.Language = "English";
        }, 100);
        this.myFamilyModel.isCreateNewFamilyAccountClicked = true
        this.transInputPlaceholder('create');        
    }

    transInputPlaceholder(mode) {
        /* Translation of input fields placeholders */
        let inpClass = mode == "create" ? ".create-plhdr" : ".edit-plhdr";
        setTimeout(function () {
            jQuery(".lbl-trans").each(function (i1, oVal) {
                jQuery(inpClass).each(function (i2, iVal) {
                    if (oVal.id == iVal.name) {
                        jQuery("input[name=" + iVal.name + "]").attr("placeholder", jQuery('#' + oVal.id).text());
                    }
                });
            });
        }, 50);
    }

    getFamilyDetail() {
        this.studentFamilyData = this.params.familyData;
        this.checkHasFamilyLinkCount();
    }
    setModalData() {
        let fm = this.myFamilyModel;
        fm.modalConfig = {};
        fm.modalConfig = {
            'modelHeader': 'Family Partners',
            'showFamilyMemberPopUp': true,
            'showCloseLink': true,
            'modalSectionSwitch': 'addEditPartner',
        }
    }

    hideAddEditFamilyPopUp() {
        this.emitToParent.emit({ 'action': 'closepopup' });
    }

    cancelNewFamilyLink() {
        let fm = this.myFamilyModel;
        fm.isCreateNewFamilyAccountClicked = false;
        fm.addFamilyPartnerDetail = {};
        fm.showLoadingOverlay = false;
        fm.errorModel = { "isError": false, "errorMessage": '', "errorFields": {} };
    }

    openHelpToolTip(action, studentLinkedFamily) {
        this.studentFamilyData.ParentDetails.forEach(function (val, ind) {
            val.resendToolTip = false;
        });
        studentLinkedFamily.resendToolTip = action;
    }

    toggleEditMode(studentLinkedFamily) {
        this.transInputPlaceholder('edit'); 
        studentLinkedFamily.isEditMode = !studentLinkedFamily.isEditMode;
        if (!studentLinkedFamily.isEditMode) {
            let valReset = studentLinkedFamily.valueToUpdate;
            valReset.FirstName = studentLinkedFamily.FirstName;
            valReset.LastName = studentLinkedFamily.LastName;
            valReset.Language = studentLinkedFamily.Language;
            valReset.Email = studentLinkedFamily.Email;
            valReset.Phone = studentLinkedFamily.Phone;
            studentLinkedFamily.errorModel = { "isError": false, "errorMessage": '', "errorFields": {} };
        }
    }

    saveNewFamilyAccountData() {
        let fm = this.myFamilyModel;
        let addDataModel = fm.addFamilyPartnerDetail;
        if (addDataModel.Language == "") {
            addDataModel.Language = 'English';
        }
        let addData = {};
        let mobNo = addDataModel.Phone;
        fm.errorModel = this._linkFamilyService.validateFields(addDataModel, this.params.openfrom);
       
        if (!fm.errorModel["isError"]) {
            if (mobNo)
                mobNo = mobNo.replace(/-/g, '');
            addData = { "StudentName": addDataModel.StudentName, "FirstName": addDataModel.FirstName, "LastName": addDataModel.LastName, "Language": addDataModel.Language, "Phone": mobNo, "Email": addDataModel.Email }
            fm.showLoadingOverlay = true;
            this._linkFamilyService.CreateParentAccount(addData, this.params.openfrom, (data) => {
                if (data.status == 'success') {
                    let result = data.result;
                    fm.isPartnerCreated = true;
                    fm.messageAfterCreate = result.StatusMessage;
                    fm.createdData = result.ParentDetails;
                    fm.resultStatus = result.Status;
                    fm.addFamilyPartnerDetail = { "StudentName": addDataModel.StudentName, "FirstName": "", "LastName": "", "Language": "English", "Phone": "", "Email": "" };
                    if (fm.resultStatus == 'LinkedWithNew' || fm.resultStatus == 'LinkedWithExisting') {
                        let dataCreated = fm.createdData;
                        dataCreated.forEach((val, ind) => {
                            this.studentFamilyData.ParentDetails.unshift(fm.bindModelValue(dataCreated[ind]));
                        });
                        this.checkHasFamilyLinkCount();
                        this.emitToParent.emit({ 'action': 'manageDisplay', 'data': this.studentFamilyData.ParentDetails });
                    }
                }
                fm.showLoadingOverlay = false;
            });
        }
    }
    
    updateFamilyPartner(studentLinkedFamily) {
        let editDataModelVal = studentLinkedFamily.valueToUpdate;
        let dataToUpdate = {};
        let mobNo = editDataModelVal.Phone;
        if (editDataModelVal.Language == "") {
            editDataModelVal.Language = 'English';
        }
        studentLinkedFamily.errorModel = this._linkFamilyService.validateFields(editDataModelVal,this.params.openfrom);
        if (!studentLinkedFamily.errorModel["isError"]) {
            this.myFamilyModel.showLoadingOverlay = true;
            if (mobNo)
                mobNo = mobNo.replace(/-/g, '');
            dataToUpdate = { "UserName": editDataModelVal.UserName, "FirstName": editDataModelVal.FirstName, "LastName": editDataModelVal.LastName, "Language": editDataModelVal.Language, "Phone": mobNo, "Email": editDataModelVal.Email }
            this._linkFamilyService.UpdateParentAccount(dataToUpdate, this.params.openfrom, (data) => {
                if (data.status == 'success') {
                    studentLinkedFamily.isEditMode = false;
                    studentLinkedFamily.FirstName = editDataModelVal.FirstName;
                    studentLinkedFamily.LastName = editDataModelVal.LastName;
                    studentLinkedFamily.Language = editDataModelVal.Language;
                    studentLinkedFamily.Phone = editDataModelVal.Phone;
                    studentLinkedFamily.Email = editDataModelVal.Email;                    
                }
                this.myFamilyModel.showLoadingOverlay = false;
            });
        }
    }

    /*after click on Okay*/
    updateLinkedFamilyData() {
        let fm = this.myFamilyModel;
        fm.isCreateNewFamilyAccountClicked = false;
        fm.isPartnerCreated = false;        
    }

    /*click on remove link or resend warning and action */
    removeFamilyLinkWarning(studentLinkedFamily, index, action) {
        studentLinkedFamily.toggleEditFamilyLink.toShow = true; 
        studentLinkedFamily.toggleEditFamilyLink.action = action; 
        studentLinkedFamily.toggleEditFamilyLink.removeIndex = index;
        if (action == 'remove')
            studentLinkedFamily.toggleEditFamilyLink.displayMessage = "Are you sure you want to remove " + studentLinkedFamily.FirstName + " " + studentLinkedFamily.LastName + "  from your linked family partners? " + studentLinkedFamily.FirstName + " " + studentLinkedFamily.LastName + " will be notified that the link has been removed.";
        else
            studentLinkedFamily.toggleEditFamilyLink.displayMessage = "This will reset this family partner’s password and send them a message including their username and temporary password.";
    }
    cancelRemoveResendWarning(studentLinkedFamily) {
        studentLinkedFamily.toggleEditFamilyLink = { "toShow": false, "action": "", "removeIndex": -1, "displayMessage": ""};
    }
    removeResendAction(studentLinkedFamily) {
        let thisRef = this;
        if (studentLinkedFamily.toggleEditFamilyLink.action == 'remove') {
            let param = { "parentUserName": studentLinkedFamily.UserName };
            studentLinkedFamily.showLoadingOverlay = true;
            thisRef._linkFamilyService.DeAssociateParent(param, this.params.openfrom, (data) => {
                thisRef.studentFamilyData.ParentDetails.splice(studentLinkedFamily.toggleEditFamilyLink.removeIndex, 1);
                thisRef.cancelRemoveResendWarning(studentLinkedFamily);
                studentLinkedFamily.showLoadingOverlay = false;
                thisRef.checkHasFamilyLinkCount();
                thisRef.emitToParent.emit({ 'action': 'manageDisplay', 'data': thisRef.studentFamilyData.ParentDetails });
            });
        } else {
            let parameter: any;
            if (this.params.openfrom=='rosters'){
                parameter = { "parentName": studentLinkedFamily.UserName, "studentName": this.myFamilyModel.addFamilyPartnerDetail.StudentName };
            }
            else {
                parameter = { "parentName": studentLinkedFamily.UserName };
            }
            studentLinkedFamily.showLoadingOverlay = true;
            thisRef._linkFamilyService.ResendFamilyAccount(parameter, this.params.openfrom, (data) => {
                thisRef.cancelRemoveResendWarning(studentLinkedFamily);
                studentLinkedFamily.showLoadingOverlay = false;
            });
        }
    }
    checkHasFamilyLinkCount() {
        if (this.studentFamilyData.ParentDetails.length > 0) {
            this.myFamilyModel.hasStudentFamilyLinks = true;
        } else {
            this.myFamilyModel.hasStudentFamilyLinks = false;
        }
    }
   
    /*Validations*/
    isNotValidEmailAddress(Email) {
        let temp = this._linkFamilyService.isNotValidEmailAddress(Email);
    }
    isCellNumberValid(Phone) {
        let temp = this._linkFamilyService.isCellNumberValid(Phone);
        if (temp != null) {
            //this.signupError = temp;
        }

    }
    formatMobileNumber(action,data) {
        if (action=='add')
            this.myFamilyModel.addFamilyPartnerDetail.Phone = this._linkFamilyService.formatMobileNumber(this.myFamilyModel.addFamilyPartnerDetail.Phone);
        else
            data.valueToUpdate.Phone = this._linkFamilyService.formatMobileNumber(data.valueToUpdate.Phone);
    }

    handleDropdownChange(selectedOptions: string, actionType: string, oLang: any) {
        if (actionType == 'add') {
            this.myFamilyModel.addFamilyPartnerDetail.Language = selectedOptions;
        }
        else {
            oLang.valueToUpdate.Language = selectedOptions;
        }
    }

}