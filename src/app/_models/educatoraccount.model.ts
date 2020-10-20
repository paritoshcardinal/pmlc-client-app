export class EducatorAccountUI {
    firstNameErrorMessage: string;
    firstNameErrorShow: boolean = false;
    firstNameErrorClass: string;

    lastNameErrorMessage: string;
    lastNameErrorShow: boolean = false;
    lastNameErrorClass: string;

    emailErrorMessage: string;
    emailErrorShow: boolean = false;
    emailErrorClass: string;

    displayNameErrorMessage: string;
    displayNameErrorShow: boolean = false;
    displayNameErrorClass: string;

    eduTypeErrorMessage: string;
    eduTypeErrorShow: boolean = false;
    eduTypeErrorClass: string;

    eduTypeOtherErrorMessage: string;
    eduTypeOtherErrorShow: boolean = false;
    eduTypeOtherErrorClass: string;

    schoolNameErrorMessage: string;
    schoolNameErrorShow: boolean = false;
    schoolNameErrorClass: string;

    currentPasswordErrorMessage: string;
    currentPasswordErrorShow: boolean = false;
    currentPasswordErrorClass: string;


    newPasswordErrorMessage: string;
    newPasswordErrorShow: boolean = false;
    newPasswordErrorClass: string;


    rePasswordErrorMessage: string;
    rePasswordErrorShow: boolean = false;
    rePasswordErrorClass: string;

    subjectsErrorShow: boolean = false;
    gradesErrorShow: boolean = false;

    isProfilePicPopupClose: boolean = true;

    schoolEdCode: string;
    codeErrMsg: string;
    isInvalidCodeErrMsg: boolean = false;
    isSchoolEdPopup: boolean = true;
    isSchoolEdRemovePopup: boolean = false;
    isSchoolEdConnectedPopup: boolean = true;    
    showSchoolEdPopup: boolean = false;
    schoolEdCodeApplyLoading: boolean = true;
    schoolEditionModel: SchoolEditionModel;

    isFormValid: boolean = true;
    schoolNameSuggestionArray: any = [];
    popupModelData: any = { open: false };
    stateArray: any[] = ['N/A', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'VI', 'PR', 'GU'];
    confirmPassword: string = '';
    emailIdInitial: string = '';
    userId: number;
    authToken: string = null;
    disconnectModal: boolean = false;
    defaultCodeErrMsg: string = "We don’t recognize that code. Please try again."
    isSchoolAdmin: boolean = false;
    membershipStatus: any = {};
    isRemoveButtonDisable: boolean = false;

    constructor() {
        this.schoolEditionModel = new SchoolEditionModel();
    }
}

export class SchoolEditionModel {
    schoolId: number;
    schoolName: string;
    state: string;
}

export class SchoolRequest {
    Keyword: string;
    State: string;
}
