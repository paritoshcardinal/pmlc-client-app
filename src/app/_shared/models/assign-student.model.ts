export class AssigmentDataModel {
    mailTextSend: any;
    correctTimeAndZoneArray: any;
    isPremiumUser: boolean;
    assignmentData: any = [];
    sendDate: any;
    sendTime: string = "8:00 AM";
    sendTimeZone: string = "ET";
    reminders: any = [{ remindDate: '', remindTime: '', remindTimeZone: '', showRemindDateError: false, remindDateErrorMsg: '', isSendNow: 'false', isRemindDateEdit: false }];
    dueDate: string = "";
    assignDate: string = "";
    previousDueDate: string = "";
    previousAssignDate: string = "";
    previewLinkMobile: string = '';
    previewLinkMail: string = '';
    selectedClass: any;
    showMissingFamilyPartnerWarning: boolean = false;
    DueDatePickerOptions: any;
    AssignDatePickerOptions: any;
    showDueDateError: boolean;
    showAssignDateError: boolean;
    SendRemindDatePickerOptions: any;
    showSendDateError: boolean;
    isSendNow: string = 'false';
    showSelectedStudentError: boolean = false;
    showEmptyDateError: boolean;
    isCheckedSendMeCopy: boolean = false;
    isMobileNoValid: boolean = false;
    isEMailValid: boolean = false;
    showLoading: boolean = false;
    showMissingFamilyPartnerInformation: boolean = false;
    studentArrWithNoFamily: any = [];
    modalConfig: any = [];
    showRemindDateError: boolean = false; // used at assigned model
    remindDate: any;  //used at assigned model
    IsNotShowAlertSelected: boolean = false;
    isWholeClassSelected: boolean;
    assignStundents: any = [];
    assignClasses: any = [];
    playlist: any = [];
    tooltipAssign: any = [false, false];
    //togglePreviewMessage: any = [false, false];
    sendTimeList: any;
    remindTimeList: any;
    zoneList: any;
    dueDateErrorMsg: string = '';
    sendDateErrorMsg: string = "";
    constructor() {
        this.isPremiumUser = isPremiumUser;   
        this.sendTimeList = sendTimeListArray();
        this.remindTimeList = remindTimeListArray();
        this.zoneList = zoneListArray();
    }

    getCorrectTimeAndZoneValue() {
        let coTZ = getCookie('lastSelectedTimeZone');
        let sendTime = '08', remindTime = '08';
        let sendTimeZone = coTZ == '' ? 'ET' : coTZ, remindTimeZone = coTZ == '' ? 'ET' : coTZ;
        let checkTime = [8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0];
        let lastTimeCheck = 23.59;
        let currentTime = parseFloat(moment().format("H.m"));
        let preFilledSendDate = moment().format("dddd MM/DD/YYYY");
        let preFilledRemindDate = moment().add(4, 'days').format("dddd MM/DD/YYYY");
        checkTime.forEach((val, i) => {
            if (i == 0 && currentTime <= val) {
                sendTime = '' + val;
                remindTime = '' + val;
            } else if (currentTime > checkTime[i - 1] && currentTime <= val) {
                sendTime = '' + val;
                remindTime = '' + val;
            }
        });
        let timePopulateArray = {
            "SendTime": sendTime, "RemindTime": remindTime, "SendTimeZone": sendTimeZone,
            "RemindTimeZone": remindTimeZone, "PreFilledSendDate": preFilledSendDate, 'PreFilledRemindDate': preFilledRemindDate
        };
        return timePopulateArray;
    }
   
    finalDate(date, time, timeZone) {
        let flag = false, dateToSave = '';
        if (moment(date, 'MM-DD-YYYY').isValid()) {
            dateToSave = createDateString(date, time, timeZone);
            let isValidDate = validatePreviousDate(dateToSave);
            flag = isValidDate ? false : true;
        }
        return { 'flag': flag, 'dateToSave': dateToSave };
    }
    
    compareSendRemindDates(sendDate, remindDate) {
        let sendDateOnly, sendTimeOnly;

        let remindDateOnly = remindDate.split('T')[0];
        let remindTimeOnly = remindDate.split('T')[1].split(':')[0] + ':00:00';

        if (sendDate.indexOf('T') == -1) {
            sendDateOnly = sendDate;
            sendTimeOnly = remindTimeOnly
        } else {
            sendDateOnly = sendDate.split('T')[0];
            sendTimeOnly = sendDate.split('T')[1].split(':')[0] + ':00:00';
        }

        if (sendDateOnly < remindDateOnly) {
            return false;
        }
        if (sendDateOnly == remindDateOnly) {
            if (Date.parse('01/01/2011 ' + sendTimeOnly) <= Date.parse('01/01/2011 ' + remindTimeOnly)) {
                return false;
            }
        }
        return true;
    }
   
    setRemindDateAndTime(index) {
        let timeZoneFromCookie = getCookie('lastSelectedTimeZone');
        let ctaz = this.correctTimeAndZoneArray;
        this.reminders[index].remindTime = ctaz.RemindTime;
        this.reminders[index].remindTimeZone = timeZoneFromCookie != '' ? timeZoneFromCookie : ctaz.RemindTimeZone;
        this.reminders[index].remindDate = ctaz.PreFilledRemindDate;
    }
    getDataToAssignPopulate(assignDataReturn) {
        this.assignmentData = assignDataReturn.assignmentData;
        if (assignDataReturn.indexSelected != '' && assignDataReturn.selectedAssignment.length > 0) {
            this.assignmentData[assignDataReturn.indexSelected].IsClassSelected = assignDataReturn.selectedAssignment['IsClassSelected'];
            this.assignmentData[assignDataReturn.indexSelected].IsPartClassDisabled = assignDataReturn.selectedAssignment['IsPartClassDisabled'];
            this.assignmentData[assignDataReturn.indexSelected]['hidePartialStudent'] = assignDataReturn.selectedAssignment['hidePartialStudent'];
        }
    }

    compareWithAsignOnDate(assigndate, dateToBeCompare) {
        let assignOnDate = moment(assigndate).format('MM/DD/YYYY');
        dateToBeCompare = moment(dateToBeCompare).format('MM/DD/YYYY');
        if (moment(assignOnDate).isSameOrBefore(dateToBeCompare)) return false;
        else return true;
    }

    getDisplayTime(value) {
        let time = this.sendTimeList.find((t) => {
            return t.value == value;
        });
        if (time) {
            return time.name;
        } else {
            return this.sendTimeList[0].name;
        }
    }
}
