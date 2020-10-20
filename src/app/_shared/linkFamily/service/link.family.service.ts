import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BaseService} from 'shared2.0.1/services/base.service';
import { Title } from '@angular/platform-browser';

@Injectable()
export class LinkFamilyService extends BaseService {
    private httpUrls = {
        'createParentAccount': '/api/student/CreateParentAccount',
        'updateParentAccount': '/api/student/UpdateParentAccount',
        'deAssociateParent': '/student/DeassociateParent',
        'deAssociateParentDashboard': '/student/DeassociateParentHttp',
        'familInfoUrl': '/api/student/GetFamilyInfo',
        'resendFamilyAccount': '/api/student/ResendFamilyAccount',
        'updateParentAccountByEducator': '/api/educator/UpdateParentAccount',
        'createParentAccountByEducator': '/api/educator/CreateParentAccount',
        'resendFamilyAccountByEducator':'api/educator/ResendFamilyAccount'
    };
    private errors: any = {};
    constructor(private http: HttpClient, private titleService: Title) {
        super(http);
    }

    private dataGetService(urlKey, paramsData, callback) {
        let httpParams = new HttpParams({ fromObject: paramsData });
        let headers = new HttpHeaders();
        headers.append('X-Requested-With', 'XMLHttpRequest');
     
        super.sendHttpGetRequest(this.httpUrls[urlKey], { headers: headers, params: httpParams }).subscribe(
            result => { callback({ "status": true, "result": result }); },
            error => { callback({ "status": false, "result": error }); },
            () => { }
        );
    }
    DeAssociateParent(paramsData, type, callback) {
        if (type == 'dashboard')
            this.dataGetService('deAssociateParentDashboard', paramsData, callback);
        else
            this.dataGetService('deAssociateParent', paramsData, callback);
    }

    
    CreateParentAccount(data, type, callback) {
        if (type == 'rosters') {
            super.sendHttpPostAjaxRequest(this.httpUrls['createParentAccountByEducator'], data).subscribe(
                result => { callback({ "status": "success", "result": result }); }, error => { callback({ "status": "error", "result": error }); }, () => { });
        }
        else {
            super.sendHttpPostAjaxRequest(this.httpUrls['createParentAccount'], data).subscribe(
                result => { callback({ "status": "success", "result": result }); }, error => { callback({ "status": "error", "result": error }); }, () => { });
        }
        }
    UpdateParentAccount(data, type, callback) {
        if (type == 'rosters') {
            super.sendHttpPostAjaxRequest(this.httpUrls['updateParentAccountByEducator'], data).subscribe(
                result => { callback({ "status": "success", "result": result }); }, error => { callback({ "status": "error", "result": error }); }, () => { });
        } else {
            super.sendHttpPostAjaxRequest(this.httpUrls['updateParentAccount'], data).subscribe(
                result => { callback({ "status": "success", "result": result }); }, error => { callback({ "status": "error", "result": error }); }, () => { });
        }
    }
    GetFamilyInformation(callback) {
        this.dataGetService('familInfoUrl', {}, callback);
    }
    ResendFamilyAccount(data, type, callback) {
        if (type == 'rosters') {
            this.dataGetService('resendFamilyAccountByEducator', data, callback);
        } else {
            this.dataGetService('resendFamilyAccount', data, callback);
        }
        }
    /*Filters*/
    trimValue(value) {
        return jQuery.trim(value);
    }
    isEmptyValue(value) {
        if (typeof value == 'undefined' || this.trimValue(value).length < 1) {
            return true;
        }
        return false;
    }

    emptyErrors() {
        this.errors = {};
    }
    hasWhiteSpace(mobileNo) {
        let re = /^\S+$/;
        return re.test(mobileNo);
    }
    isValidEmailFormat(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    isNotValidEmailAddress(email) {
        delete this.errors['email'];
        let result = this.isValidEmailFormat(email);
        if (!result) {
            this.errors['email'] = { message: 'Please enter a valid email address.', isValid: false };
        }
        if (this.isEmptyValue(email))
            delete this.errors['email'];
        return this.errors;
    }
    formatMobileNumber(mobileNumber) {

        if (this.isEmptyValue(mobileNumber)) {
            return "";
        }
        let value = this.trimValue(mobileNumber);

        value = value.replace(/[^0-9]/g, "");//replace non numbers
        if (value.length < 1) {
            return "";
        }
        value = value.split("-").join(""); // remove hyphens
        if (value.length > 10) {
            value = value.substring(0, 10)
        }
        if (value.length < 7) {
            value = value.match(new RegExp('.{1,3}', 'g')).join("-");
        } else {
            let tempValue = value.substring(0, 7);
            value = tempValue.match(new RegExp('.{1,3}', 'g')).join("-") + value.substring(7, value.length);
        }
        return value;
    }
    isCellNumberValid(cellNumber) {
        delete this.errors['cellPhoneNumber'];
        if (this.isEmptyValue(cellNumber)) {
            return null;
        } else {
            return this.isNotValidcellPhoneNumber(cellNumber);
        }
    }
    isNotValidcellPhoneNumber(value) {
        delete this.errors['cellPhoneNumber'];
        if (this.trimValue(value).length > 0) {
            let regExp = /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/;
            if (!regExp.test(value)) {
                this.errors['cellPhoneNumber'] = { message: 'Please specify a valid number in given format.', isValid: false };
                // status = true;
            }
        }
        return this.errors;
    }
    validateFields(dataToValidate, type) {
        let errorMsg = '';
        let service = this;
        let retVal = false;
        let errorFields = {};
        if (service.isEmptyValue(dataToValidate.FirstName)) {
            errorFields['firstName'] = true;
            if (type == 'rosters' && !(service.isEmptyValue(dataToValidate.LastName) && service.isEmptyValue(dataToValidate.Email) && service.isEmptyValue(dataToValidate.Phone))) {
                errorMsg = "This is a required field.";
                retVal = true;
                let errorModel = { "isError": retVal, "errorMessage": errorMsg, "errorFields": errorFields };
                return errorModel;
            } else {
                errorMsg = " Please enter the first and the last name, and either a mobile number or an email address.";
            }
            retVal = true;
        }
        if (service.isEmptyValue(dataToValidate.LastName)) {
            errorFields['lastName'] = true;
            if (type == 'rosters' && !(service.isEmptyValue(dataToValidate.FirstName) && service.isEmptyValue(dataToValidate.Email) && service.isEmptyValue(dataToValidate.Phone))) {
                errorMsg = "This is a required field.";
                retVal = true;
                let errorModel = { "isError": retVal, "errorMessage": errorMsg, "errorFields": errorFields };
                return errorModel;
            } else {
                errorMsg = " Please enter the first and the last name, and either a mobile number or an email address.";

            } retVal = true;
        }
        if (type == 'rosters') {
            if ((service.isEmptyValue(dataToValidate.FirstName) && service.isEmptyValue(dataToValidate.LastName)) && (service.isEmptyValue(dataToValidate.Email) && service.isEmptyValue(dataToValidate.Phone))) {
                errorFields['firstName'] = true;
                errorFields['lastName'] = true;
                errorFields['Email'] = true;
                errorFields['Phone'] = true;
                errorMsg = " Please enter the first and the last name, and either a mobile number or an email address.";
                retVal = true;
                let errorModel = { "isError": retVal, "errorMessage": errorMsg, "errorFields": errorFields };
                return errorModel;
            }
        }
        if (type == 'rosters') {
            if ((service.isEmptyValue(dataToValidate.Email) && (!dataToValidate.isEmailOptedOut)) && (!dataToValidate.isMobileOptedOut && service.isEmptyValue(dataToValidate.Phone))) {
                errorFields['Email'] = true;
                errorFields['Phone'] = true;
                errorMsg = 'Please enter either a mobile number or an email address.';
                retVal = true;
                let errorModel = { "isError": retVal, "errorMessage": errorMsg, "errorFields": errorFields };
                return errorModel;
            }
        }
        else {
            if ((service.isEmptyValue(dataToValidate.Email) && !dataToValidate.isEmailOptedOut) && (service.isEmptyValue(dataToValidate.Phone) && !dataToValidate.isMobileOptedOut)) {
                errorFields['Email'] = true;
                errorFields['Phone'] = true;
                errorMsg = "Please enter the first and the last name, and either a mobile number or an email address.";
                retVal = true;
            }
            else if ((service.isEmptyValue(dataToValidate.Email) && (!dataToValidate.isEmailOptedOut)) && (dataToValidate.isMobileOptedOut)) {
                
                errorFields['Email'] = true;
                    errorMsg = "Please enter the first and the last name, and either a mobile number or an email address.";
                    retVal = true;
            }
            else if ((service.isEmptyValue(dataToValidate.Phone) && (!dataToValidate.isMobileOptedOut)) && (dataToValidate.isEmailOptedOut)) {

                errorFields['Phone'] = true;
                errorMsg = "Please enter the first and the last name, and either a mobile number or an email address.";
                retVal = true;
            }
        }
        let tempMob = service.isCellNumberValid(dataToValidate.Phone);
        if (type == 'rosters') {
            if ((dataToValidate.Phone == null || dataToValidate.Phone == '') && (dataToValidate.isEmailOptedOut && !dataToValidate.isMobileOptedOut)) {
                errorFields['Phone'] = true;
                errorMsg = "Please specify a valid number in given format.";
                retVal = true;
                let errorModel = { "isError": retVal, "errorMessage": errorMsg, "errorFields": errorFields };
                return errorModel;
            }
                else if (tempMob != null && typeof tempMob.cellPhoneNumber != 'undefined') {
                errorFields['Phone'] = true;
                    errorMsg = "Please specify a valid number in given format.";
                    retVal = true;
                }
        }
        else{
            if (tempMob != null && typeof tempMob.cellPhoneNumber != 'undefined') {
                errorFields['Phone'] = true;
                errorMsg = "Please specify a valid number in given format.";
                retVal = true;
            }
    }
        let tempMail = service.isNotValidEmailAddress(dataToValidate.Email);
        if (type == 'rosters') {
            if ((dataToValidate.Email == null || dataToValidate.Email == '') && (dataToValidate.isMobileOptedOut && !dataToValidate.isEmailOptedOut)) {
                errorFields['Email'] = true;
                errorMsg = "Please enter a valid email address";
                retVal = true;
                let errorModel = { "isError": retVal, "errorMessage": errorMsg, "errorFields": errorFields };
                return errorModel;
            }
            else if (tempMail != null && typeof tempMail.email != 'undefined' && dataToValidate.Email != null && dataToValidate.Email != '') {
                errorFields['Email'] = true;
                errorMsg = "Please enter a valid email address";
                retVal = true;
            }
        } else {
            if (tempMail != null && typeof tempMail.email != 'undefined' && dataToValidate.Email != null && dataToValidate.Email != '') {
                errorFields['Email'] = true;
                errorMsg = "Please enter a valid email address";
                retVal = true;
            }
        }
        let errorModel = { "isError": retVal, "errorMessage": errorMsg, "errorFields": errorFields };
        return errorModel;

    }
}