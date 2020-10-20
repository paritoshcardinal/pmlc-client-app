import {ActivitySessionLogService} from 'library2.0.1/services/activitylog.session.service';
export class UserInfoModel {
    userType: string;
    isAdminUser: boolean;
    isPremiumUser: boolean;
    userName: string;
    premiumLanguage: string;
    displayName: string;
    STUDENT: string;
    EDUCATOR: string;
    PARENT: string;

    constructor() {
        this.userType = userType;
        this.isAdminUser = isAdminUser;

        this.isPremiumUser = false;
        /* this condition is for anonymous user.*/
        if (typeof isPremiumUser != 'undefined')
            this.isPremiumUser = isPremiumUser;

        /* this condition is for anonymous user.*/
        if (typeof userName != 'undefined')
            this.userName = userName;

        /* this condition is for anonymous user.*/
        if (typeof displayName != 'undefined')
            this.displayName = displayName;

        //this.premiumLanguage = premiumLanguage;
        this.STUDENT = 'student';
        this.EDUCATOR = 'educator';
        this.PARENT = 'parent';
    }

    getElement(selector: any): any {
        return document.querySelectorAll(selector);
    }

    showElement(selector) {
        let nodeList = this.getElement(selector);
        nodeList.forEach((ele) => {
            ele.style.display = "block";
        });
    }

    hideElement(selector) {
        let nodeList = this.getElement(selector);
        nodeList.forEach((ele) => {
            ele.style.display = "none";
        });
    }

    removeClass(selector, className) {
        let nodeList = this.getElement(selector);
        nodeList.forEach((ele) => {
            ele.classList.remove(className);
        });
    }

    addClass(selector, className) {
        let nodeList = this.getElement(selector);
        nodeList.forEach((ele) => {
            ele.classList.add(className);
        });
    }

    fadeOut(element) {
        let op = 1;  // initial opacity
        let timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 10);
    }

    fadeIn(element) {
        let op = 0.1;  // initial opacity
        element.style.display = 'block';
        let timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }

}

export class UserLogInfo{
    private logId: any;
    private playTimer: any;
    private contentGuid: any;
    private contentType: any;
    private playlistGuid: any;
    private assessmentGuid: any;
    _activitySessionLogService: ActivitySessionLogService;

    constructor(activitySessionLogService) {
        this._activitySessionLogService = activitySessionLogService;
    }

    startLogging(contentGuid, contentType, playlistId, assessmentId) {
        this.contentGuid = contentGuid;
        this.contentType = contentType;
        this.playlistGuid = playlistId;
        this.assessmentGuid = assessmentId;
        let model = {
            'Id': 0,
            'DlaId': contentGuid,
            'ContentType': contentType
        }

        if (playlistId) {
            model['PlayListId'] = playlistId;
        }

        if (assessmentId) {
            model['AssignmentId'] = assessmentId;
        }

        let ths = this;
        this._activitySessionLogService.getActivityLogId(model, function (result) {
            ths.logId = result.Id;
            ths.startTimer();
        });

    }

    startTimer() {
        this.playTimer = setInterval(() => {
            this.countTime();
        }, timeintervale);
    }

    countTime() {
        let model = {
            'Id': this.logId,
            'DlaId': this.contentGuid,
            'ContentType': this.contentType
        }

        if (this.playlistGuid) {
            model['PlayListId'] = this.playlistGuid;
        }

        if (this.assessmentGuid) {
            model['AssignmentId'] = this.assessmentGuid;
        }

        let ths = this;
        this._activitySessionLogService.userSessionActivityLog(model, function (result) {
            ths.logId = result;
        });
    }

    clearTimer() {
        clearInterval(this.playTimer);
    }
}