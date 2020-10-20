import { UserInfoModel } from 'shared2.0.1/models/user.info.model';
export class MyFamilyMemberModel extends UserInfoModel {
    FirstName: string;
    LastName: string;
    Email: string;
    Id: string;
    IsApproved: string;
    UserName: string;
    Phone: string;
    Language: string;
    isEmailOptedOut: boolean;
    isMobileOptedOut: boolean;
    isEdit: boolean = false;
    resendToolTip: boolean=false;
    errorModel = { "isError": false, "errorMessage": '', "errorFields": {} };
    valueToUpdate: any = { "UserName": "", "FirstName": "", "LastName": "", "Email": "", "Phone": "", "Language": "" };
    toggleEditFamilyLink: any = { "toShow": false, "action": "", "removeIndex": -1, "displayMessage": "" };
    showLoadingOverlay: any = false;
    constructor() {
        super();
    }

}
export class MyFamilyModel extends UserInfoModel {
    studentLinkedFamilies: any;
    hasStudentFamilyLinks: boolean;
    hasParentSetGoal: boolean;
    modalConfig: any;
    preferredLanguage: any;
    isCreateNewFamilyAccountClicked: boolean;
    homeLangSelected: any;//to remove
    addFamilyPartnerDetail: any;
    userName: string;
    errorModel:any;
    resultStatus: string;
    isPartnerCreated: boolean;
    messageAfterCreate: string;
    createdData: any;
    toggleEditFamilyLink: any;
    showLoadingOverlay: any = false;
    getGoalsForChild: any;
    getPastGoalsForChild: any;
    showPastCompleted: boolean = false;
    constructor() {
        super();
        this.hasStudentFamilyLinks = false;
        this.hasParentSetGoal = false;
        this.isCreateNewFamilyAccountClicked = false;
        this.modalConfig = {};
        this.errorModel = { "isError": false, "errorMessage": '', "errorFields": {} };
        this.isPartnerCreated = false;
        this.messageAfterCreate = '';
        this.createdData = [];
        this.addFamilyPartnerDetail = { "StudentName": userName, "FirstName": "", "LastName": "", "Language": "English", "Phone": "", "Email": "" };
        this.preferredLanguage = [];
        this.preferredLanguage = this.preferredLanguage.concat(preferredContactLanguages);// As per ticket PML-7637
        if (userType == 'educator') {
            this.addFamilyPartnerDetail = { "StudentName": userName, "FirstName": "", "LastName": "", "Language": "", "Phone": "", "Email": "" };
            this.preferredLanguage.splice(0, 1, { name: "Preferred Language", value: "" });
            //this.homeLanguage = [
            //    { value: "", name: "Home Language" },
            //    { value: "English", name: "English" },
            //    { value: "Arabic", name: "Arabic" },
            //    { value: "Bengali", name: "Bengali" },
            //    { value: "Chinese", name: "Chinese" },
            //    { value: "French", name: "French" },
            //    { value: "Haitian Creole", name: "Haitian Creole" },
            //    { value: "Korean", name: "Korean" },
            //    { value: "Russian", name: "Russian" },
            //    { value: "Spanish", name: "Spanish" }];
        } else {                        
            this.preferredLanguage.shift();
            //this.homeLanguage = [{ value: "English", name: "English" },
            //    { value: "Arabic", name: "Arabic" },
            //    { value: "Bengali", name: "Bengali" },
            //    { value: "Chinese", name: "Chinese" },
            //    { value: "French", name: "French" },
            //    { value: "Haitian Creole", name: "Haitian Creole" },
            //    { value: "Korean", name: "Korean" },
            //    { value: "Russian", name: "Russian" },
            //    { value: "Spanish", name: "Spanish" }];
        }
    }
    bindModelValue(data) {
        let familyMember = new MyFamilyMemberModel();
        let mobileNo = data.Phone;
        let premiumMail = data.Email;
        if (mobileNo) {
            let tempValue = mobileNo.substring(0, 7);
            mobileNo = tempValue.match(new RegExp('.{1,3}', 'g')).join("-") + mobileNo.substring(7, mobileNo.length);
        }
        familyMember.FirstName = data.FirstName;
        familyMember.LastName = data.LastName;
        familyMember.Email = data.Email;
        familyMember.Id = data.Id;
        familyMember.IsApproved = data.IsApproved;
        familyMember.UserName = data.UserName;
        familyMember.Phone = mobileNo;
        familyMember.Language = data.Language;
        familyMember.isEmailOptedOut = !data.IsEmailContact;
        familyMember.isMobileOptedOut = !data.IsTextContact;
        if (familyMember.isMobileOptedOut)
            mobileNo = '';
        if (familyMember.isEmailOptedOut) {
            familyMember.Email = '';
            premiumMail = '';
        }
        familyMember.isEdit = false;
        familyMember.resendToolTip = false;
        familyMember.valueToUpdate = { "UserName": data.UserName, "FirstName": data.FirstName, "LastName": data.LastName, "Email": premiumMail, "Phone": mobileNo, "Language": data.Language, "isEmailOptedOut": !data.IsEmailContact, "isMobileOptedOut": !data.IsTextContact };
        return familyMember;
    }
}