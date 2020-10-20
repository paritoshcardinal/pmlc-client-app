
export class ParentAccountUI {
    firstnameError: boolean = false;
    lastnameError: boolean = false;
    currentPasswordErr: boolean = false;
    CurrentPasswordErrorMsg: string = '';
    newPasswordErr: boolean = false;
    NewPasswordErrorMsg: string = '';
    cnfPasswordErr: boolean = false;
    cnfPasswordErrorMsg: string = '';
    emailError: boolean = false;
    emailErrorMsg: string = '';
    cellPhoneNumberError: boolean = false;
    premiumEmailError: boolean = false;
    premiumEmailErrorMsg: string = '';
    premiumCellPhoneNumberError: boolean = false;
    cellPhonePremiumErrorMsg: string = '';
    modalConfig: any = {};
    showDeleteModal: boolean = false;
    //languageArray: any = [];
    homeLanguages: any;
    preferredContactLanguages: any;
    retypeNewPassword: string;
    isValid: boolean = true;
    isPremiumEmailEnabled: boolean = false;
    isPremiumPhoneEnabled: boolean = false;
    updateNow: boolean = false;
    childToBeDeleted: string = '';
    childToBeDeletedFirstName: string = '';
    childUserToBeDeleted: string = '';
    removedLinkedChild: any = [];
    confirmChildDeleted: boolean;
    finalChildDeleted: any = [];
    StudentDetails: any=[];
    haveChildrenWithApproval: boolean = false;
    showLoadingOverlay: boolean=false;
    showLoadingOverlayDelete: boolean = false;
    constructor() {
        this.modalConfig = {
            "isModelOpen": false, "modalHeader": '', "modalTitle": '', "modalSectionSwitch": '', "showCloseBtn": false, "modalClass": ''
        };

        this.homeLanguages = homeLanguages;
        this.preferredContactLanguages = preferredContactLanguages;
        //this.languageArray = [
        //    { name: 'Choose One', value: '' },
        //    { name: 'English', value: 'English' },
        //    { name: 'Arabic', value: 'Arabic' },
        //    { name: 'Bengali', value: 'Bengali' },
        //    { name: 'Chinese', value: 'Chinese' },
        //    { name: 'French', value: 'French' },
        //    { name: 'Haitian Creole', value: 'Haitian Creole' },
        //    { name: 'Korean', value: 'Korean' },
        //    { name: 'Russian', value: 'Russian' },
        //    { name: 'Spanish', value: 'Spanish' }];
    }
    insertHypenInPhone(phone_number) {
        phone_number = jQuery.trim(phone_number);
        var p = phone_number.split('-');

        if (phone_number != '' && p.length < 2) {
            var part1 = phone_number.substring(0, 3);
            var part2 = phone_number.substring(3, 6);
            var part3 = phone_number.substring(6);
            phone_number = part1 + "-" + part2 + "-" + part3;
        }
        return phone_number;
    }
    removeHypenInPhone(phone_number) {
        phone_number = phone_number.replace(/-/g, '');
        return phone_number;
    }

}

