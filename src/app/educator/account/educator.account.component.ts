import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, ViewChildren, QueryList, ViewContainerRef} from '@angular/core';
import {EducatorAccountUI, SchoolRequest,UserProfileModel} from '@app/_models';
import { SelectPickerDirective } from '@app/_shared/directives';
import {AccountService,ImpersonationModalService,BoxService } from '@app/_services';
import { MultiselectDropdown } from '@app/_shared/component';
import '@app/_shared/models/javascript.variable';
import { ProfilePictureComponent } from '../profile/profile.picture.component';

@Component({
    selector: 'educator-account',
    templateUrl: './EducatorAccount.html',
    styleUrls: ['./educator-account.css', './common.css'],
    encapsulation: ViewEncapsulation.None
})

export class EducatorAccountComponent {
    @ViewChildren(SelectPickerDirective) selectPickerDirectives: QueryList<SelectPickerDirective>;
    educatorAccountData: any = UserProfileModel;
    schoolRequest: any = SchoolRequest;
    ui: EducatorAccountUI;
    subjectList: any;
    gradeList: any;
    selectedSubjects: any = [];
    selectedGrades: any = [];
    educatorTypeList: any = [];
    @ViewChild(ProfilePictureComponent) profilePicComponent: ProfilePictureComponent;
    @ViewChild(MultiselectDropdown) selectPickerDirective: MultiselectDropdown;
    @ViewChild('modalOutlet', { read: ViewContainerRef }) modalOutlet: ViewContainerRef;

    constructor(private _accountService: AccountService, private _boxService: BoxService, private ref: ChangeDetectorRef, private impersonateModalService: ImpersonationModalService) {
        this.ui = new EducatorAccountUI();
        _accountService.setPageTitle('MyAccount - PowerMyLearning Connect', "");
        this.ui.isSchoolEdPopup = isPremiumUser;
        this.educatorAccountData = new UserProfileModel();
        this.getUserProfile();
        this.getToken();

        this.educatorTypeList = [{ name: "I am a K-12 educator", value: "K12Teacher", id: "K12Teacher" },
            { name: "I am an educator at a higher-ed institution", value: "EducatorHigherInstitution", id: "EducatorHigherInstitution" },
            { name: "I am a school administrator", value: "SchoolAdministrator", id: "SchoolAdministrator" },
            { name: "I am a home-school teacher", value: "HomeSchoolTeacher", id: "HomeSchoolTeacher" },
            { name: "Other", value: "Other", id: "Other" }];
    }    

    ngOnInit() {
        this.subjectList = this.removeImageFromSujectList();
        this.gradeList = this.addImageInGradeList();
        let _url = window.location.href;
        let url = new URL(_url);
        let open = url.searchParams.get('open');
        if (open != null) {
            let el = document.getElementById('settings').scrollIntoView();
        }
    }

    getUserProfile() {
        let ui = this.ui;
        let data = this._accountService.GetUserProfile((userProfile) => {
            if (userProfile.status) {
                let userProfileData = userProfile.result['UserProfileModel'];
                userProfileData.EducatorType = this.educatorTypeList[userProfileData.EducatorType].value; //ui.educatorTypeArray[userProfileData.EducatorType].educatorType;
                this.selectPickerDirective.setOptionFromParent(userProfileData.EducatorType);
                this.educatorAccountData.setEducatorModelValue(userProfileData);
                this.getProfileImageThumbnail();
                ui.emailIdInitial = userProfileData.Email;
                ui.userId = userProfileData.UserId;
                ui.schoolEditionModel.schoolId = userProfileData.SchoolId;
                ui.schoolEditionModel.schoolName = userProfileData.SchoolName;
                ui.schoolEditionModel.state = userProfileData.StresetImageDataate;
                this.selectedSubjects = this.getSavedSubjectList(userProfileData.SubjectList);
                this.checkIfAllSubjectIsSelected();
                this.selectedGrades = this.getSavedGradeList(userProfileData.GradeList);
                setTimeout(() =>{
                    this.selectPickerDirectives.toArray().forEach(function (child) {
                        child.refreshSelectPicker();
                    });
                }, 600);
                this.educatorAccountData.settings = userProfile.result['UINotiPreferenceSModels'];
            }
        });        
    }

    getProfileImageThumbnail() {
        if (this.educatorAccountData.CloudMediaId) {
            this._boxService.getThumbnailFromBox(this.educatorAccountData.CloudMediaId, 'Image', { height: 94, width: 94 }, (thumbUrl) => {
                if (thumbUrl['success']) {
                    this.educatorAccountData.ProfileThumbUrl = thumbUrl.data;
                }
            });
        }
    }

    GetEducatorDetailsAndRemove() {
        if (!this.IsImpersonating()) {
            let thisRef = this;
            thisRef.ui.isRemoveButtonDisable = true;
            let data = thisRef._accountService.GetEducatorDetails((educatorDetailsData) => {
                if (educatorDetailsData.status) {
                    let educatorDetails = educatorDetailsData.result;
                    thisRef.ui.membershipStatus = {
                        'IsLastSchoolAdmin': educatorDetails.IsLastSchoolAdmin,
                        'IsLastMember': educatorDetails.IsLastMember,
                        'IsCommunityOwner': educatorDetails.IsCommunityOwner,
                        'type': 0
                    };
                    thisRef.removeAccount();
                }
            });
        }
    }

    /* Start: Staff member joins school edition (via code)  */
    resetPopupModelData() {
        this.ui.popupModelData = { open: false }
    }

    removeAccount() {
        this.resetPopupModelData();
        let schoolName = this.ui.schoolEditionModel.schoolName
        let memStatus = this.ui.membershipStatus;
        var msgList = [];
        var secondPopupMsg = '';
        if (!memStatus.IsLastSchoolAdmin && !memStatus.IsLastMember) {
            msgList = ['You will be disconnected from ' + schoolName + '\'s School Edition of PowerMyLearning Connect.', 'This means you will lose access to the School Edition features.', 'Are you sure you want to disconnect from ' + schoolName + ' School?'];
            memStatus.type = 1;
        }
        else if (memStatus.IsLastSchoolAdmin && !memStatus.IsLastMember) {
            msgList = ['You will be disconnected from ' + schoolName + '\'s School Edition of PowerMyLearning Connect.', 'By removing yourself, you will lose administrator access for your school. Please assign PowerMyLearning Connect School Edition administrator access to a new educator:'];
            memStatus.type = 2;
        }
        else if (memStatus.IsLastMember && !memStatus.IsLastSchoolAdmin) {
            msgList = ['You will be disconnected from ' + schoolName + '\'s School Edition of PowerMyLearning Connect.', 'This means you will lose access to the School Edition features.', 'Are you sure you want to disconnect from ' + schoolName + ' School?'];
            memStatus.type = 5;
        }
        else if (memStatus.IsLastMember && memStatus.IsLastSchoolAdmin) {
            msgList = ['You are the only administrator left for ' + schoolName + '\'s School Edition of PowerMyLearning Connect.', 'After removing yourself, no one will have the ability to invite new educators to join your school.', 'Are you sure you want to disconnect from School Edition?'];
            memStatus.type = 5;
        }

        this.ui.popupModelData = { removeStaffMember: true, removeStaffData: { staff: this.ui.userId, messageList: msgList, secondPopupMessage: secondPopupMsg, membershipStatus: memStatus } };
        this.ui.isSchoolEdRemovePopup = true;
    }

    receiveChildrenEvent(data) {
        if (data.deleted) {
            this.reloadPage();
        }
        else if (data.canceled) {
            this.ui.isSchoolEdRemovePopup = false;
            this.ui.isRemoveButtonDisable = false;
        }
    }

    closePopupConnected() {
        this.ui.isSchoolEdConnectedPopup = true;
        this.reloadPage();
    }

    reloadPage() {
        window.location.reload();
    }

    redirectToRoot() {
        window.location.href = "/";
    }

    verifyCode() {
        if (!this.IsImpersonating()) {
            let schoolEdCode = this.ui.schoolEdCode;
            this.ui.codeErrMsg = '';
            this.ui.isInvalidCodeErrMsg = false;

            if (schoolEdCode == undefined) {
                this.ui.codeErrMsg = "Please enter a code.";
                this.ui.isInvalidCodeErrMsg = true;
            }
            else if (schoolEdCode.trim() == '') {
                this.ui.codeErrMsg = "Please enter a code.";
                this.ui.isInvalidCodeErrMsg = true;
            }
            else {
                let thisRef = this;
                thisRef.ui.schoolEdCodeApplyLoading = false;
                let data = thisRef._accountService.joinSchoolEdition(schoolEdCode.trim(), (schoolData) => {
                    if (schoolData.status) {
                        let school = schoolData.result;
                        if (schoolData) {
                            thisRef.ui.schoolEditionModel.schoolId = school.SchoolId;
                            thisRef.ui.schoolEditionModel.schoolName = school.SchoolName;
                            thisRef.ui.schoolEditionModel.state = school.State;
                            thisRef.ui.isInvalidCodeErrMsg = false;
                            thisRef.ui.isSchoolEdPopup = isPremiumUser;
                            thisRef.ui.isSchoolEdConnectedPopup = false;
                            thisRef.ui.isSchoolAdmin = school.Role == "SchoolAdmin" ? true : false;
                        }
                        else {
                            thisRef.ui.codeErrMsg = schoolData.result[0].Message;
                            thisRef.ui.isInvalidCodeErrMsg = true;
                            thisRef.ui.schoolEdCodeApplyLoading = true;
                        }
                    }
                });
            }
        }
    }

    toggleSchoolEdHelp(val) {
        this.ui.showSchoolEdPopup = val;
    }
    /* End: Staff member joins school edition (via code)  */

    onChangeEducatorType(event) {
        this.educatorAccountData['EducatorType'] = event;
        if (this.educatorAccountData['EducatorType'] != 'K12Teacher' && this.educatorAccountData['EducatorType'] != 'HomeSchoolTeacher') {
            this.selectedSubjects = [];
            this.selectedGrades = [];            
        }
    }

    onChangeState(selectedState: string) {
        this.educatorAccountData.State = selectedState;
    }

    logError(err: any) {
        if (err && err._body != undefined) {
            //err getting in string need to fix this code after getting exception type i.e. wrong password or wrong email id
            var tempErr = err._body.split(":")[1];
            var errorMessage = tempErr.split("\"")[1];
            if (errorMessage.indexOf("password") > -1) {
                this.ui.currentPasswordErrorMessage = errorMessage;
                this.ui.currentPasswordErrorShow = true;
                this.ui.currentPasswordErrorClass = "error-password";
            } else {
                this.ui.emailErrorMessage = errorMessage;
                this.ui.emailErrorShow = true;
                this.ui.emailErrorClass = "error";
            }
        }
        jQuery('#account-updated-loading').hide();
    }

    updateMyAccountDetail() {
        if (!this.IsImpersonating()) {
            this.validateMyAccountInfo();
            let ths = this;
            if (ths.ui.isFormValid) {
                jQuery('#account-updated-loading').show();
                if (ths.educatorAccountData['EducatorType'] === 'K12Teacher' || ths.educatorAccountData['EducatorType'] === 'HomeSchoolTeacher') {
                    ths.educatorAccountData['SubjectList'] = [];
                    this.selectedSubjects.forEach((subject) => {
                        ths.educatorAccountData['SubjectList'].push(subject['value']);
                    });
                    this.educatorAccountData['GradeList'] = [];
                    this.selectedGrades.forEach((grade) => {
                        ths.educatorAccountData['GradeList'].push(parseInt(grade['value']));
                    });
                }
                let param = {
                    UserProfileModel: ths.educatorAccountData,
                    UINotiPreferenceSModels: ths.educatorAccountData.settings
                }
                ths._accountService.UpdateAccount(param, (accountUpdatedData) => {
                    if (accountUpdatedData.status) {
                        ths.educatorAccountData.IsImageRemoved = false;
                        jQuery('#account-updated').show();
                        jQuery('#account-updated-loading').hide();
                        jQuery('#account-updated').fadeOut(3000);

                        if (ths.educatorAccountData.Email != ths.ui.emailIdInitial) {
                            alert('Thank you for updating your email address. You have been logged out. Please log back in with your new email.');
                        }

                        if (accountUpdatedData.result.LoggedOut) {
                            ths.redirectToRoot();
                        }
                    }
                    else {
                        ths.logError(accountUpdatedData['result']);
                    }
                });
            }
        }
    }

    getSchoolNames() {
        this.schoolRequest = new SchoolRequest();
        this.schoolRequest.Keyword = this.educatorAccountData.SchoolName;
        this.schoolRequest.State = this.educatorAccountData.State;
        this.ui.schoolNameSuggestionArray = [];
        this.educatorAccountData.SchoolId = 0;
        let thisRef = this;
        let data = thisRef._accountService.GetSchoolNameSuggestion(thisRef.schoolRequest, (schoolNamesData) => {
            if (schoolNamesData.status) {
                thisRef.ui.schoolNameSuggestionArray = schoolNamesData.result;
            }
        });
    }

    selectSchoolNameFromSuggestion(schoolId, schoolName) {
        this.ui.schoolNameSuggestionArray = [];
        this.educatorAccountData.SchoolName = schoolName;
        this.educatorAccountData.SchoolId = schoolId;
    }

    clickOutSchoolNameSuggestion() {
        let thisRef = this;
        setTimeout(function () {
            thisRef.selectPickerDirectives.toArray().forEach(function (child) {
                thisRef.ui.schoolNameSuggestionArray = [];
            });
        }, 600);
    }

    validateMyAccountInfo() {
        /* validation for subjects and grades */

        this.ui.isFormValid = true;

        this.ui.gradesErrorShow = false;
        this.ui.subjectsErrorShow = false;
        if ((this.educatorAccountData['EducatorType'] == 'K12Teacher' || this.educatorAccountData['EducatorType'] == 'HomeSchoolTeacher') && this.selectedSubjects.length == 0) {
            this.ui.subjectsErrorShow = true;
            this.ui.isFormValid = false;
        }
        if ((this.educatorAccountData['EducatorType'] == 'K12Teacher' || this.educatorAccountData['EducatorType'] == 'HomeSchoolTeacher') && this.selectedGrades.length == 0) {
            this.ui.gradesErrorShow = true;
            this.ui.isFormValid = false;
        }

        /*validation for first name mandatory min 1 max 25 length*/
        if (this.educatorAccountData.FirstName == '') {
            this.ui.isFormValid = false;
            this.ui.firstNameErrorMessage = "Please enter your first name.";
            this.ui.firstNameErrorShow = true;
            this.ui.firstNameErrorClass = "error";
        } else if (this.educatorAccountData.FirstName.length < 1 || this.educatorAccountData.FirstName.length > 25) {
            this.ui.isFormValid = false;
            this.ui.firstNameErrorMessage = "Please make sure your first name is at least 1 letters, and no more than 25.";
            this.ui.firstNameErrorShow = true;
            this.ui.firstNameErrorClass = "error";

        } else {
            this.ui.firstNameErrorShow = false;
        }

        /*validation for last name mandatory min 1 max 25 length*/
        if (this.educatorAccountData.LastName == '') {
            this.ui.isFormValid = false;
            this.ui.lastNameErrorMessage = "Please enter your last name.";
            this.ui.lastNameErrorShow = true;
            this.ui.lastNameErrorClass = "error";
        } else if (this.educatorAccountData.LastName.length < 1 || this.educatorAccountData.LastName.length > 25) {
            this.ui.isFormValid = false;
            this.ui.lastNameErrorMessage = "Please make sure your last name is at least 1 letters, and no more than 25.";
            this.ui.lastNameErrorShow = true;
            this.ui.lastNameErrorClass = "error";

        } else {
            this.ui.lastNameErrorShow = false;
        }

        /*validation for email mandatory, valid mail, min 5 max 80 length*/
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (this.educatorAccountData.Email == '') {
            this.ui.isFormValid = false;
            this.ui.emailErrorMessage = "Please enter a valid email address.";
            this.ui.emailErrorShow = true;
            this.ui.emailErrorClass = "error";
        } else if (!regex.test(this.educatorAccountData.Email)) {
            this.ui.isFormValid = false;
            this.ui.emailErrorMessage = "Please enter a valid email address.";
            this.ui.emailErrorShow = true;
            this.ui.emailErrorClass = "error";
        } else if (this.educatorAccountData.Email.length < 5 || this.educatorAccountData.Email.length > 80) {
            this.ui.isFormValid = false;
            this.ui.emailErrorMessage = "Please make sure your email is at least 5 letters, and no more than 80.";
            this.ui.emailErrorShow = true;
            this.ui.emailErrorClass = "error";

        } else {
            this.ui.emailErrorShow = false;
            if (this.educatorAccountData.Email != '') {
                if (this.educatorAccountData.Email != this.ui.emailIdInitial) {
                    this.ui.emailErrorMessage = "You have changed your email. You will be logged out.";
                    this.ui.emailErrorShow = true;
                    this.ui.emailErrorClass = "error warn";
                }
            }
        }

        /*validation for display name mandatory, min 3, max 50 length*/
        if (this.educatorAccountData.DisplayName == '') {
            this.ui.isFormValid = false;
            this.ui.displayNameErrorMessage = "Please enter your display name.";
            this.ui.displayNameErrorShow = true;
            this.ui.displayNameErrorClass = "error";
        } else if (this.educatorAccountData.DisplayName.length < 3 || this.educatorAccountData.DisplayName.length > 50) {
            this.ui.isFormValid = false;
            this.ui.displayNameErrorMessage = "Please make sure your display name is at least 3 letters, and no more than 50.";
            this.ui.displayNameErrorShow = true;
            this.ui.displayNameErrorClass = "error";

        } else {
            this.ui.displayNameErrorShow = false;
        }
        /*validation for edu type mandatory*/
        if (this.educatorAccountData.EducatorType == '') {
            this.ui.isFormValid = false;
            this.ui.eduTypeErrorMessage = "Please select a educator type.";
            this.ui.eduTypeErrorShow = true;
            this.ui.eduTypeErrorClass = "error";
        } else {
            this.ui.eduTypeErrorShow = false;
        }

        if (this.educatorAccountData.EducatorType == 'Other') {
            /*validation for edu type other mandatory*/
            if (this.educatorAccountData.OtherEducatorType == '') {
                this.ui.isFormValid = false;
                this.ui.eduTypeOtherErrorMessage = "Please enter the role.";
                this.ui.eduTypeOtherErrorShow = true;
                this.ui.eduTypeOtherErrorClass = "error";
            }
        } else {
            this.ui.eduTypeOtherErrorShow = false;
        }

        if (this.educatorAccountData.EducatorType == 'K12Teacher') {
            /*validation for state and school if edu type is K12Teacher*/
            if (this.educatorAccountData.State == '---') {
                this.ui.isFormValid = false;
                this.ui.schoolNameErrorMessage = "Please select the state.";
                this.ui.schoolNameErrorShow = true;
                this.ui.schoolNameErrorClass = "error";
            } else if (this.educatorAccountData.SchoolName == '') {
                this.ui.isFormValid = false;
                this.ui.schoolNameErrorMessage = "Please enter your school's name or zip code.";
                this.ui.schoolNameErrorShow = true;
                this.ui.schoolNameErrorClass = "error";
            }
        } else {
            this.ui.schoolNameErrorShow = false;
        }

        if (this.educatorAccountData.NewPassword != '' || this.educatorAccountData.Password != '') {
            if (this.educatorAccountData.Password == '') {
                this.ui.isFormValid = false;
                this.ui.currentPasswordErrorMessage = "Please enter current password.";
                this.ui.currentPasswordErrorShow = true;
                this.ui.currentPasswordErrorClass = "error-password";
            } else if (this.educatorAccountData.Password.length < 6 || this.educatorAccountData.Password.length > 30) {
                this.ui.isFormValid = false;
                this.ui.currentPasswordErrorMessage = "Please make sure your password is at least 6 letters or numbers, and no more than 30.";
                this.ui.currentPasswordErrorShow = true;
                this.ui.currentPasswordErrorClass = "error-password";

            } else if (this.educatorAccountData.Password.indexOf(" ") > -1) {
                this.ui.isFormValid = false;
                this.ui.currentPasswordErrorMessage = "That is not a valid password. Please enter a password of 6-30 characters, no spaces.";
                this.ui.currentPasswordErrorShow = true;
                this.ui.currentPasswordErrorClass = "error-password";
            } else {
                this.ui.currentPasswordErrorShow = false;
            }
        }


        if (this.educatorAccountData.Password != '' || this.educatorAccountData.NewPassword != '') {
            if (this.educatorAccountData.NewPassword == '') {
                this.ui.isFormValid = false;
                this.ui.newPasswordErrorMessage = "Please enter current password.";
                this.ui.newPasswordErrorShow = true;
                this.ui.newPasswordErrorClass = "error-password";
            } else if (this.educatorAccountData.NewPassword.length < 6 || this.educatorAccountData.NewPassword.length > 30) {
                this.ui.isFormValid = false;
                this.ui.newPasswordErrorMessage = "Please make sure your password is at least 6 letters or numbers, and no more than 30.";
                this.ui.newPasswordErrorShow = true;
                this.ui.newPasswordErrorClass = "error-password";

            } else if (this.educatorAccountData.NewPassword.indexOf(" ") > -1) {
                this.ui.isFormValid = false;
                this.ui.newPasswordErrorMessage = "That is not a valid password. Please enter a password of 6-30 characters, no spaces.";
                this.ui.newPasswordErrorShow = true;
                this.ui.newPasswordErrorClass = "error-password";
            } else {
                this.ui.newPasswordErrorShow = false;
            }
        }

        if (this.educatorAccountData.Password != '' || this.ui.confirmPassword != '') {
            if (this.ui.confirmPassword == '') {
                this.ui.isFormValid = false;
                this.ui.rePasswordErrorMessage = "Please retype password.";
                this.ui.rePasswordErrorShow = true;
                this.ui.rePasswordErrorClass = "error-password";
            } else if (this.ui.confirmPassword.length < 6 || this.ui.confirmPassword.length > 30) {
                this.ui.isFormValid = false;
                this.ui.rePasswordErrorMessage = "Please make sure your password is at least 6 letters or numbers, and no more than 30.";
                this.ui.rePasswordErrorShow = true;
                this.ui.rePasswordErrorClass = "error-password";

            } else if (this.ui.confirmPassword != this.educatorAccountData.NewPassword) {
                this.ui.isFormValid = false;
                this.ui.rePasswordErrorMessage = "The two passwords you entered don't match. Please try again.";
                this.ui.rePasswordErrorShow = true;
                this.ui.rePasswordErrorClass = "error-password";
            } else {
                this.ui.rePasswordErrorShow = false;
            }
        }
    }

    removeProfileDataFrombox() {
        this._boxService.deleteFileFromBox(this.educatorAccountData.CloudMediaId, (result) => {
            if (result['success']) {
                this.educatorAccountData.CloudMediaId = '';
                this.educatorAccountData.ProfileThumbUrl = '';
                this.educatorAccountData.IsImageRemoved = true;
                this.profilePicComponent.resetImageData();
            }
        });
    }

    async removeProfileImageFromDatabase() {
        let param = { CloudMediaId: '' }
        let data = await this._accountService.UpdateProfilePicture(param);
        if (data) this.removeProfileDataFrombox();
    }

    closePopup() {
        this.ui.isProfilePicPopupClose = true;
        this.overFlowBody();
    }

    openPopup() {
        if (!this.IsImpersonating()) {
            jQuery('body').css('overflow', 'hidden');
            this.ui.isProfilePicPopupClose = false;
        }
    }

    handleClosePopup() {
        this.ui.isProfilePicPopupClose = true;
        this.overFlowBody();
    }

    handleAppplyCrop(event) {
        if (event) {
            this.educatorAccountData.CloudMediaId = event.CloudMediaId;
            this.educatorAccountData.ProfileThumbUrl = event.imageThumbUrl;
            this.educatorAccountData.IsImageRemoved = true;
        }
        this.overFlowBody();
        this.ui.isProfilePicPopupClose = true;
    }

    overFlowBody() {
        setTimeout(function () {
            jQuery('body').css('overflow', 'auto');
        }, 200);
    }

    disconnectGoogleDriveWarn() {
        if (!this.IsImpersonating())
            this.ui.disconnectModal = true;
    }

    disconnectGoogleDrive() {
        let thisRef = this;
        let apiData = thisRef._accountService.deleteAuthToken((authData) => {
            if (authData.status) {
                thisRef.ui.disconnectModal = false;
                thisRef.ui.authToken = null;
            }
        });        
    }

    getToken() {
        let thisRef = this;
        let apiData = thisRef._accountService.getAuthToken((tokenData) => {
            if (tokenData.status) {
                thisRef.ui.authToken = tokenData.result;
            }
        });
    }

    removeImageFromSujectList() {
        let subjcts = getSubjectList();
        subjcts.forEach((obj) => {
            obj.imgPath ="";
        });
        return subjcts;
    }

    addImageInGradeList() {
        let grades = getGradeList();
        grades.forEach((obj, idx) => {
            obj["imgPath"] = "";
            obj['name'] = idx > 0 ? idx : obj['name']; // Changes according to Pml - 9900
        });
        return grades;
    }

    setSubjectCriteria(event) {
        this.selectedSubjects = getSortedArray(event, 'id', 'int');
        this.checkIfAllSubjectIsSelected();
    }

    setGradeCriteria(event) {
        this.selectedGrades = getSortedArray(event, 'value', 'int');
    }

    remove(propertyName, data) {
        let idx = this[propertyName].findIndex((item) => { return item.value == data.value })
        this[propertyName].splice(idx, 1);
        if (propertyName == 'selectedSubjects')
            this.checkIfAllSubjectIsSelected();
    }

    getSavedSubjectList(savedSubjects) {
        let list = [];
        if (savedSubjects) {
            this.subjectList.forEach((object) => {
                if (savedSubjects.includes(object.value)) {
                    list.push(object);
                }
            });
        }
        return list;
    }

    getSavedGradeList(savedGrades) {
        let list = [];
        if (savedGrades) {
            this.gradeList.forEach((object) => {
                if (savedGrades.includes(parseInt(object.value))) {
                    list.push(object);
                }
            });
        }
        return list;
    }

    IsImpersonating() {
        var impersonating = false;
        this.impersonateModalService.validateImpersonation(isImpersonating => {
            if (isImpersonating == true) {
                impersonating = true;
                this.impersonateModalService.loadImpersonationPopup(this.modalOutlet);
            }
        });
        return impersonating;
    }

    checkIfAllSubjectIsSelected() {
        let isAllSubjectSelected;
        this.selectedSubjects.forEach((subjectObj) => {
            if (subjectObj.value == this.subjectList[0]['value']) {
                this.selectedSubjects = [this.subjectList[0]];
                isAllSubjectSelected = true;
            }
        });
        this.subjectList.forEach((obj, idx) => { obj.isDisable = idx > 0 && isAllSubjectSelected ? true : false });
    }
}