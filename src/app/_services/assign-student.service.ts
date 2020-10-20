import { Injectable, Inject} from '@angular/core';
import { Subject } from "rxjs-operators";
import {BaseService} from '@app/_services';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class AssignStudentService extends BaseService {
    httpRequestHeaders: HttpHeaders;
    httpUrls = {
        'getEducatorPlaylistAssignments': '/api/Educator/GetEducatorPlaylistAssignments',
        'updateMissingFamilyContacts': 'api/educator/v2/UpdateMissingFamilyContacts',
        'assignPlayListToGroup': '/api/Educator/V2/AssignPlayListToGroup',
        'assignPlaylist': '/api/educator/V2/AssignPlaylist',
        'getStudentAssignedNotifications': 'api/educator/GetStudentAssignedNotifications',
        'addUpdateSendOnNotificationTag': 'api/educator/AddUpdateSendOnNotificationTag',
        'deleteNotification': 'api/educator/V2/DeleteNotification',
        'updateFutureAssignedDate': 'api/educator/UpdateFutureAssignedDate',
        'updateAssignedOnDate': 'api/Educator/UpdateAssignedOn',
        'getPlayListStatusForAnalytics': 'api/Educator/GetCreatedModifiedPL'

    };
    mobileNoPreview: string;
    emailPreview: string;
    oldsubscribtionAna: any;
    constructor(private http: HttpClient, private titleService: Title) {
        super(http);
    }
   
    assignPlaylistData(url, parameter, callback) {
        this.assignGetService(url, parameter, callback);
    }
    updateMissingFamilyContacts(params, callback) {
        this.assignPostService('updateMissingFamilyContacts', params, callback);
    }
    assignPlayListToGroup(params, callback) {
        this.assignPostService('assignPlayListToGroup', params, callback);
    }
    assignPlaylist(url, parameter, callback) {
        this.assignPostService(url, parameter, callback);
    }
    getStudentAssignedNotifications(params, callback) {
        this.assignGetService('getStudentAssignedNotifications', params, callback);
    }
    addUpdateSendOnNotificationTag(parameter, callback) {
        this.assignPostService('addUpdateSendOnNotificationTag', parameter, callback);
    }
    deleteNotification(params, callback) {
        this.assignGetService('deleteNotification', params, callback);
    }

    updateAssignmentDates(param, callback) {
        this.assignPostService('updateFutureAssignedDate', param, callback);
    }

    updateAssignDate(params, callback) {
        this.assignPostService('updateAssignedOnDate', params, callback);
    }

    trimValue(value) {
        return jQuery.trim(value);
    }

    isEmptyValue(value) {
        if (typeof value == 'undefined' || this.trimValue(value).length < 1) {
            return true;
        }
        return false;
    }

    isNotValidcellPhoneNumber(value) {
        let isError = false;
        if (this.trimValue(value).length > 0) {
            let regExp = /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/;
            if (!regExp.test(value)) {
                isError = true;
            }
        }
        return isError;
    }
    
    isValidEmailFormat(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    studentAssignedCount(assignmentData) {
        let students = [];
        let classes = [];
        assignmentData.forEach((valueAssign) => {
            if (valueAssign.IsDisabled == false && valueAssign.IsPartial == false) {
                classes.push(valueAssign);
            }
            valueAssign.Students.forEach((valStu) => {
                if (valStu.IsAssigned == true && valStu.IsDisabled == false) {
                    students.push(valStu);
                }
            })
        });
        return { 'students': students, 'classes': classes };
    }
    compareSendRemindDates(sendDate, remindDate) {
        let showRemindDateError = false;
        if (moment(sendDate.valueOf()).format("MM-DD-YYYY") < moment(remindDate.valueOf()).format("MM-DD-YYYY")) {
            showRemindDateError = false;
        } else {
            showRemindDateError = true;
        }
        return showRemindDateError;
    }
    isNotValidMailAddress(email) {
        let isEMailValid = false;
        let result = this.isValidEmailFormat(email);
        if (this.isEmptyValue(email)) {
            isEMailValid= null;
        } else if (!result) {
            isEMailValid = true;
        }
        return isEMailValid;
    }
    isCellPhoneNumberValid(cellNumber) {
        let isMobileNoValid = false;
        if (this.isEmptyValue(cellNumber)) {
            isMobileNoValid = null;
        } else {
            isMobileNoValid = this.isNotValidcellPhoneNumber(cellNumber);
        }
        return isMobileNoValid;
    }

    formatMobileNumberValidation(mobileNumber) {
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
    transformTitleCaseString(input) {
        if (!input) {
            return '';
        } else {
            return input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
        }
    }
    
    populateDataToAssign(assignmentData, selectedClassCode) {
        let toCallAssignPl = false;
        let selectedAssignment = [];
        let indexSelected = '';
        for (let index in assignmentData) {
            let assn = assignmentData[index];
            let studentCountAssigned = 0;
            assn.IsPartClassDisabled = false;
            for (let i in assn.Students) {
                let student = assn.Students[i];
                if (student.IsDisabled) {
                    assn.IsPartClassDisabled = true;
                }
                if (student.IsAssigned && !student.IsDisabled) {
                    studentCountAssigned++;
                }
            }
            if (studentCountAssigned == 0) {
                assn['hidePartialStudent'] = true;
            }
            assn.IsClassSelected = true;
            if (assn.IsPartial != false) {
                assn.IsClassSelected = false;
            }
            if (selectedClassCode && selectedClassCode == assn.ClassCode) {
                //assn.IsClassSelected = true;
                toCallAssignPl = true;
                selectedAssignment = assn;
                indexSelected = index;
            }
        }
        return {
            'assignmentData': assignmentData, 'toCallAssignPl': toCallAssignPl, 'selectedAssignment': selectedAssignment, 'indexSelected': indexSelected};
    }

    assignGetService(urlKey, paramsData, callback) {
        let httpParams = new HttpParams({ fromObject: paramsData });
        super.sendHttpGetRequest(this.httpUrls[urlKey], { params: httpParams }).subscribe(
            result => { callback({ "status": true, "result": result }); },
            error => { callback({ "status": false, "result": error }); },
            () => { }
        );
    }
    assignPostService(urlKey, paramsData, callback) {
        super.sendHttpPostAjaxRequest(this.httpUrls[urlKey], paramsData).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    assignPostFormService(urlKey, paramsData, callback) {
        super.sendHttpPostFormRequest(this.httpUrls[urlKey], paramsData).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    getPlayListStatusForAnalytics(paramsData, callback) {
        if (this.oldsubscribtionAna)
            this.oldsubscribtionAna.unsubscribe();
        let httpParams = new HttpParams({ fromObject: paramsData });
        this.oldsubscribtionAna =super.sendHttpGetRequest(this.httpUrls["getPlayListStatusForAnalytics"], { params: httpParams }).subscribe(
            result => { callback({ "status": true, "result": result }); },
            error => { callback({ "status": false, "result": error }); },
            () => { }
            )
    }

}