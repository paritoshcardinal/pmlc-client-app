import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from "rxjs-operators";

@Injectable()
export class ReportService extends BaseService {
    private httpRequestHeaders: HttpHeaders;

    private httpUrls = {
        'getAssignedPlaylistsByClasses': '/api/educator/v2/GetAssignedPlaylistsByClasses',
        'GetFPSummaryReport': '/api/educator/GetFPSummaryReport',
        'getAllClassList': '/api/educator/v2/GetAllClassessWithStudents',
        'listOfAssessmentforPlaylist': '/api/educator/v2/ListOfAssessmentforPlaylist',
        'updateSupportingImages': 'api/educator/v2/UpdateSupportingImages',
        'SaveTeacherResponse': 'api/educator/SaveTeacherResponse',
        'familyPlaylistReport': '/api/educator/FamilyPlaylistReport',
        'familyPlaylistExcelReport': '/educator/GenerateFPExcelReport',
        'fpPrintStudentReport': 'api/educator/V2/FPPrintStudentReport',
        'getStudentsTasksV2': '/api/educator/v2/GetStudentsTasksPie',
        'sendFeedBacks': 'api/educator/v2/SendFeedBacks',
        'saveFeedBack': 'api/educator/v2/SaveFeedBack',
        'getStudentScoreChartByAssessment': '/api/educator/v2/GetStudentScoreChartByAssessment',
        'getStudentStatusChartByAssessment': '/api/educator/v2/GetStudentStatusChartByAssessment',
        'getStudentChartByPlaylistContent': '/api/educator/v2/GetStudentChartByPlaylistAssessment',
        'getStudentChartByPlaylistContentMC': 'api/educator/v2/GetStudentSummaryChartByAssessmentForMC',
        'getAssessmentWithStudentsV2': '/api/educator/v2/GetAssessmentQuestionWithStudents',
        'generatePlaylistAssessmentExcel': '/educator/GeneratePlaylistAssessmentExcel',
        'generatePlaylistTaskExcel': '/educator/GeneratePlaylistTaskExcel',
        'classAndStudentSummary': '/api/educator/ClassAndStudentSummary',
        'studentActivityReport': '/api/educator/StudentActivityReport',
        'getAssignedStudents': '/api/educator/GetAssignedStudents',
        'FamilyPlaylistChart': '/api/educator/FamilyPlaylistChart',
        'familyPlaylistReportHeader': '/api/educator/v2/FamilyPlaylistReportHeaderPie',
        'postTeacherResponsesSendOn': '/api/Educator/PostTeacherResponsesSendOn',
        'FamilyPlaylistDetailReportV2': '/api/educator/V2/FamilyPlaylistDetailReport',
        'sendFamilyPlaylistReportEmail': 'api/educator/SendFamilyPlaylistReportEmail',
        'getClassWithStudents': 'api/educator/v2/GetClassWithStudents',
        'getShareHighlightsDetails': '/api/anonymous/GetShareHighlightsDetails',
        'postSupportingImages': '/api/family/PostSupportingImages',
        'fpReportGroupDetails': '/api/educator/FPReportGroupDetails',
        'RemindNow': '/api/educator/RemindNow'
    };

    private reportEmitterReference: any = {};
    private reportChangeEmitter = new Subject<any>();

    private allClassList: any;
    private allPlaylists: any;
    sortingMapConfig = {
        'ScoreDisplayString': { 'value': 'Score', 'type': 'int' },
        'Response': { 'value': 'answerStatus', 'type': 'string' },
        'FirstName': { 'value': 'FirstName', 'type': 'string' },
        'StatusDisplayString': { 'value': 'StatusDisplayString', 'type': 'string' },
        'TotalPlaylistPoints': { 'value': 'TotalPointPercent', 'type': 'int' },
        'ActivityTitle': { 'value': 'ActivityTitle', 'type': 'string' },
        'ContentArea': { 'value': 'ContentArea', 'type': 'string' },
        'GradeLevelInt': { 'value': 'GradeLevelInt', 'type': 'int' },
        'UsageTime': { 'value': 'UsageTime', 'type': 'int' },
        'LastLogin': { 'value': 'LastLogin', 'type': 'string' },
        'TopActivityTitle': { 'value': 'TopActivityTitle', 'type': 'string' },
        'MinGrade': { 'value': 'MinGrade', 'type': 'string' },
        'TotalUsageTime': { 'value': 'TotalUsageTime', 'type': 'string' }
    };
    constructor(private http: HttpClient, private titleService: Title) {
        super(http);
        this.httpRequestHeaders = new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
    }

    subscribeOnReportChange(subscribeedFrom, callback) {
        this.reportEmitterReference[subscribeedFrom] = this.reportChangeEmitter.subscribe((data) => {
            callback && callback(data)
        });
    }

    emitOnReportChange(dataObj) {
        this.reportChangeEmitter.next(dataObj);
    }

    unSubscribeOnReportChange(unSubscribeedFrom) {
        if (this.reportEmitterReference[unSubscribeedFrom])
            this.reportEmitterReference[unSubscribeedFrom].unsubscribe();
    }

    setClassList(list) {
        this.allClassList = list;
    }

    getClassList() {
        return this.allClassList;
    }

    getActiveArchivedCount() {
        return { active: this.allClassList.ActiveClassCount, archived: this.allClassList.ArchivedClassCount };
    }

    setAllPlaylists(data) {
        this.allPlaylists = data;
    }

    getAllPlaylists() {
        return this.allPlaylists;
    }

    findPlaylistById(id) {
        return this.allPlaylists.find(pl => pl.PlaylistGuid === id);
    }

    speratePlaylistsInToStandardAndFamily(standardPlaylist, familyPlaylist) {
        this.allPlaylists.forEach((playlist) => {
            if (playlist.ContentType == 'Playlist') {
                standardPlaylist.push({
                    "value": playlist.PlaylistGuid, "name": playlist.PlaylistTitle, "assignedOn": playlist.AssignedOn
                });
            } else if (playlist.ContentType == 'FamilyPlaylist') {
                familyPlaylist.push({
                    "value": playlist.PlaylistGuid, "name": 'Family Playlist: ' + playlist.PlaylistTitle, "assignedOn": playlist.AssignedOn
                });
            }
        });
    }

    getAssignedPlaylistsByClasses(params, callback) {
        this.reportPostService('getAssignedPlaylistsByClasses', params, callback);
    }

    getFPSummaryReport(params, callback) {
        this.reportGetService('GetFPSummaryReport', params, callback);
    }

    getAllClassList(params, callback) {
        this.reportPostService('getAllClassList', params, callback);
    }

    setPageTitle(title: string, usetType: string) {
        if (usetType === "")
            this.titleService.setTitle(title);
        else
            this.titleService.setTitle(userType.charAt(0).toUpperCase() + userType.slice(1) + "-" + title);
    }

    createClassDropDownList() {
        let data = [];
        let classList = this.allClassList.ReportClass;        
        classList.forEach((val, ind) => {
            let student = [];
            let classDisabled = true;
            val.Students.forEach((stu, index) => {
                let studentName = stu.FirstName + " " + stu.LastName + " (" + stu.UserName + ")";
                student.push({ id: index, value: stu.StudentId, name: studentName, disabled: stu.Disable });
                if (!stu.Disable)
                    classDisabled = false;
            });
            data.push({
                id: ind,
                value: val.ClassCode,
                name: val.ClassName,
                isExpand: false,
                disabled: classDisabled,
                expandArray: student,
                isClassShared: val.IsClassShared
            });
        });
        return data;
    }

    createSingleClassStudentList(classList) {
        let data = [];
            let student = [];
            let classDisabled = true;
            classList.Students.forEach((stu, index) => {
                let studentName = stu.FirstName + " " + stu.LastName + " (" + stu.UserName + ")";
                student.push({ id: index, value: stu.StudentId, name: studentName, disabled: stu.Disable });
                if (!stu.Disable)
                    classDisabled = false;
            });
            data.push({
                id: 0,
                value: classList.ClassCode,
                name: classList.ClassName,
                isExpand: false,
                disabled: classDisabled,
                expandArray: student
            });
        return data;
    }

    getClassDataForUsageReport(selectedClassList) {
        let classData = [];
        let classList = this.allClassList.ReportClass;
        classList.forEach((cls) => {
            selectedClassList.forEach((selClass) => {
                if (cls.ClassCode == selClass.value) {
                    let stuIds = [];
                    selClass.expandArray.forEach((id) => { stuIds.push(id.value) });
                    classData.push({ 'classCode': cls.ClassCode, 'className': cls.ClassName, 'studentIds': stuIds, 'createdDate': cls.CreatedOn });
                }
            });
        });
        return classData;
    }
    
    setClassData(data, classCode, className, createdDate) {
        let classData = [];
        let stuIds = [];
        data.expandArray.forEach((id) => { stuIds.push(id.value) });
        classData.push({ 'classCode': classCode, 'className': className, 'studentIds': stuIds, 'createdDate': createdDate });
        return classData;
    }
    
    createClassDetails(classList) {
        let model = [];
        classList.forEach((val) => {
            let student = [];
            val.expandArray.forEach((stu) => {
                student.push(stu.value);
            });
            model.push({ ClassCode: val.value, StudentIds: student });
        });
        return model;
    }
    changeSortingService(column, index, fieldName, sort, UserQuestionDetails) {
        sort = this.setSortingColumnClass(sort, column);
        let studentArray = UserQuestionDetails;
        UserQuestionDetails = studentArray.sort((leftObj, rightObj) => {
            let leftVal, rightVal;
            if (fieldName && fieldName != 'ScoreDisplayString') {
                leftVal = leftObj.QuestionDetails[index][fieldName].toUpperCase();
                rightVal = rightObj.QuestionDetails[index][fieldName].toUpperCase();
            } else {
                if (fieldName == 'ScoreDisplayString') {
                    leftVal = leftObj.QuestionDetails[index]['ScorePercent'];
                    rightVal = rightObj.QuestionDetails[index]['ScorePercent'];
                } else if (column == 'TotalPlaylistPoints' || column == 'FirstName') {
                    let columnobjectToSort = this.sortingMapConfig[column];
                    let obj = this.getSortingValue(columnobjectToSort, leftObj, rightObj);
                    leftVal = obj.leftVal;
                    rightVal = obj.rightVal;
                } else {
                    leftVal = leftObj[column].toUpperCase().toString();
                    rightVal = rightObj[column].toUpperCase().toString();
                }
            }
            return this.sortData(sort, leftVal, rightVal);
        });
        return UserQuestionDetails;
    }
    setSortingColumnClass(sort, column) {
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
        sort.sortClass = sort.descending ? 'sorting_desc' : 'sorting_asc';
        return sort;
    }
    sortData(sort, leftVal, rightVal) {
        if (!sort.descending) {
            if (leftVal < rightVal) return -1;
            if (leftVal > rightVal) return 1;
            return 0;
        } else {
            if (rightVal < leftVal) return -1;
            if (rightVal > leftVal) return 1;
            return 0;
        }
    }

    getSortingValue(columnobjectToSort, leftObj, rightObj) {
        let leftVal, rightVal;
        if (columnobjectToSort.type == 'string') {
            leftVal = leftObj[columnobjectToSort.value] ? leftObj[columnobjectToSort.value].toUpperCase().toString() : '';
            rightVal = rightObj[columnobjectToSort.value] ? rightObj[columnobjectToSort.value].toUpperCase().toString() : '';
        } else {
            leftVal = leftObj[columnobjectToSort.value];
            rightVal = rightObj[columnobjectToSort.value];
        }
        return { leftVal, rightVal};
    }

    GetAssessmentforPlaylist(params, callback) {
        this.reportGetService('listOfAssessmentforPlaylist', params, callback);
    }
    updateSupportingImages(params, callback) {
        //this.sendImageHttpPostRequest(this.httpUrls['updateSupportingImages'], params).subscribe(
        //    result => {
        //        callback({ 'status': 'success', 'result': result });
        //    }, error => {
        //        callback({ 'status': 'error', 'result': error });
        //    }, () => { });
        this.reportPostService('updateSupportingImages', params, callback);
    }
    saveTeacherResponse(params, callback) {
        this.reportPostService('SaveTeacherResponse', params, callback);
    }
    familyPlaylistReport(params, callback) {
        this.reportPostService('familyPlaylistReport', params, callback);
    }
    familyPlaylistExcelReport(params, callback) {
        let timeZone = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
        params.timeZone = timeZone;
        this.reportPostService('familyPlaylistExcelReport', params, callback);
    }
    fpPrintStudentReport(params, callback) {
        this.reportPostService('fpPrintStudentReport', params, callback);
    }
    getStudentsTasks(params, callback) {
        this.reportPostService('getStudentsTasksV2', params, callback);
    }
    sendFeedBacks(params, callback) {
        this.reportPostService('sendFeedBacks', params, callback);
    }
    saveFeedBack(params, callback) {
        this.reportPostService('saveFeedBack', params, callback);
    }
    getStudentScoreChartByAssessment(params, callback) {
        this.reportPostService('getStudentScoreChartByAssessment', params, callback);
    }
    getStudentStatusChartByAssessment(params, callback) {
        this.reportPostService('getStudentStatusChartByAssessment', params, callback);
    }
    getStudentChartByPlaylistContent(params,url, callback) {
        this.reportPostService(url, params, callback);
    }
    //getStudentChartByPlaylistContentMC(params, callback) {
    //    this.reportPostService('getStudentChartByPlaylistContentMC', params, callback);
    //}
    getAssessmentDetailsV2(params, callback) {
        this.reportPostService('getAssessmentWithStudentsV2', params, callback);
    }
    //generatePlaylistAssessmentExcel(params, callback) {
    //    this.reportPostService('generatePlaylistAssessmentExcel', params, callback);
    //}
    //generatePlaylistTaskExcel(params, callback) {
    //    this.reportPostService('generatePlaylistTaskExcel', params, callback);
    //}
    generatePlaylistExcel(params,url, callback) {
        this.reportPostService(url, params, callback);
    }
    getUsageReportClassAndStudentSummary(params, callback) {
        this.reportPostService('classAndStudentSummary', params, callback);
    }
    getStudentActivityReport(params, callback) {
        this.reportPostService('studentActivityReport', params, callback);
    }
    getAssignedStudents(params, callback) {
        this.reportGetService('getAssignedStudents', params, callback);
    }
    familyPlaylistChart(params, callback) {
        this.reportPostService('FamilyPlaylistChart', params, callback);
    }

    fpReportGroupDetails(params, callback) {
        this.reportPostService('fpReportGroupDetails', params, callback);
    }

    familyPlaylistReportHeader(params, callback) {
        this.reportPostService('familyPlaylistReportHeader', params, callback);
    }
    postTeacherResponsesSendOn(params, callback) {
        this.reportPostService('postTeacherResponsesSendOn', params, callback);
    }
    familyPlaylistDetailReportV2(params, callback) {
        this.reportPostService('FamilyPlaylistDetailReportV2', params, callback);
    }
    sendFamilyPlaylistReportEmail(params, callback) {
        this.reportPostService('sendFamilyPlaylistReportEmail', params, callback);
    }
    getClassWithStudents(params, callback) {
        this.reportGetService('getClassWithStudents', params, callback);
    }

    getShareHighlightsDetails(params, callback) {
        let httpParams = new HttpParams().set('emailId', params.emailId).set('shareId', params.shareId);
        super.sendHttpGetRequest(this.httpUrls["getShareHighlightsDetails"], { params: httpParams }).subscribe(
            result => { callback(result); }, error => { callback(error); }, () => { });
    }
   
    validateScore(enteredScoreDetail, maxScore) {
        if (isNaN(enteredScoreDetail.Score)) {
            enteredScoreDetail.Score = enteredScoreDetail.Score.substring(0, enteredScoreDetail.Score.length - 1)
            return false;
        }
        if (enteredScoreDetail.Score && enteredScoreDetail.Score != '') {
            if (typeof enteredScoreDetail.Score.substring != 'undefined') {
                if (enteredScoreDetail.Score.substring(enteredScoreDetail.Score.length - 1, enteredScoreDetail.Score.length) == '.') {
                    enteredScoreDetail.Score = enteredScoreDetail.Score.substring(0, enteredScoreDetail.Score.length - 1)
                    return false;
                }
            }
            if (enteredScoreDetail.Score < 0) {
                enteredScoreDetail.Score = enteredScoreDetail.Score.substring(0, enteredScoreDetail.Score.length - 1)
                return false;
            }
            if (parseInt(enteredScoreDetail.Score) > parseInt(maxScore)) {
                enteredScoreDetail.Score = enteredScoreDetail.Score.substring(0, enteredScoreDetail.Score.length - 1)
                return false;
            }
        }
        return true;
    }
    private reportGetService(urlKey, paramsData, callback) {
        let httpParams = new HttpParams({ fromObject: paramsData });
        super.sendHttpGetRequest(this.httpUrls[urlKey], { params: httpParams }).subscribe(
            result => { callback({ "status": true, "result": result }); },
            error => { callback({ "status": false, "result": error }); },
            () => { }
        );
    }

    private reportPostService(urlKey, paramsData, callback) {
        super.sendHttpPostAjaxRequest(this.httpUrls[urlKey], paramsData).subscribe(
            result => { callback({ 'status': 'success', 'result': result }); }, error => { callback({ 'status': 'error', 'result': error }); }, () => { });
    }

    postSupportingImages(TaskUISModel, callback) {
        this.reportPostService('postSupportingImages', TaskUISModel, callback);
    }

    remindNow(param, callback) {
        this.reportGetService('RemindNow', param, callback);
    }
} 
