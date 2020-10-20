import {Injectable}  from '@angular/core';
import { BaseService } from './base.service';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class StudentCumParentReportsService extends BaseService {
    private sortedList = [];

    private filterDetail = {
        pagingRequired: false, currentPageNumber: 1, sortedFieldName: "ClassName",
        recordPerPage: 5, showDeleted: false, excludeDataCount: 0,
        sortingOrder: 'Asc', sortingRequired: true, pagePerBlock: 5
    };

    private httpUrls = {
        'parentChildrenStatus': '/api/parent/ParentChildrenStatus',
        'hasFamilyPlaylistAssigned': '/api/' + userType + '/HasFamilyPlaylistAssigned',
        //PML-7462'isMissionAssigned': '/api/' + userType + '/IsMissionAssigned',
        'studentCreatedDate': '/api/' + userType + '/StudentCreatedDate',
        'getPlaylistDetails': '/api/' + userType + '/GetPlaylistDetails',
        'getChildren': '/api/parent/GetChildren',
        'getTaskDetails': '/api/' + userType + '/' + (userType == 'student' ? 'MyTaskDetails' : 'GetMyChildTasks'),
        'getTaskDetailsV2': '/api/' + userType + '/v2/GetAssessmentReport',
        'getActivityUsage': '/api/' + userType + '/' + (userType == 'student' ? 'StudentUsageReport' :'ChildrenUsageReport'),       
        'getFamilyPlaylistReport': '/api/' + userType + '/GetFamilyPlaylistReport',
        'getFPDetailReport': '/api/' + userType + '/v2/GetFPDetailReport',
        //PML-7462'getMissionReport': '/api/' + userType + '/GetMissionReport',
        //'getQuizReport': '/api/' + userType + '/GetQuizReport',
        
    };

    constructor(private http: HttpClient, private titleService: Title) {
        super(http);
    }

    setPageTitle(title: string, usetType: string) {
        if (usetType === "") this.titleService.setTitle(title);// + this.titleService.getTitle());
        else this.titleService.setTitle(userType.charAt(0).toUpperCase() + userType.slice(1) + "-" + title);// + this.titleService.getTitle());
    }

    //new function/method GetFilteredClassListWithTaskForStudent added for sorting and pagination.
    getSortedData(filterDetail, callback) {
        if (typeof filterDetail == 'undefined') {
            filterDetail = {}
        }

        var ths = this;
        var recordPerPage = this.sortedList.length;
        var currentPageNumber = typeof filterDetail.currentPageNumber == 'undefined' ? ths.filterDetail.currentPageNumber : filterDetail.currentPageNumber;
        var showDeleted = typeof filterDetail.showDeleted == 'undefined' ? ths.filterDetail.showDeleted : filterDetail.showDeleted;
        var sortedFieldName = typeof filterDetail.sortedFieldName == 'undefined' ? ths.filterDetail.sortedFieldName : filterDetail.sortedFieldName;
        var sortingOrder = typeof filterDetail.sortingOrder == 'undefined' ? ths.filterDetail.sortingOrder : filterDetail.sortingOrder;
        var sortingRequired = typeof filterDetail.sortingRequired == 'undefined' ? ths.filterDetail.sortingRequired : filterDetail.sortingRequired;
        var pagingRequired = typeof filterDetail.pagingRequired == 'undefined' ? ths.filterDetail.pagingRequired : filterDetail.pagingRequired;
        currentPageNumber = parseInt(currentPageNumber);
        var startIndex = 0;
        var paginationDetail = {};
        paginationDetail['paginationRequired'] = false;
        paginationDetail['hasData'] = ths.sortedList.length > 0;

        if (pagingRequired) {
            recordPerPage = typeof filterDetail.recordPerPage == 'undefined' ? ths.filterDetail.recordPerPage : filterDetail.recordPerPage;
            var pagePerBlock = typeof filterDetail.pagePerBlock == 'undefined' ? ths.filterDetail.pagePerBlock : filterDetail.pagePerBlock;
            pagePerBlock = parseInt(pagePerBlock);
            var maxPageNumber = 0;
            //console.log(typeof ths.sortedList.length);
            let totalLength = ths.sortedList.length - ths.filterDetail.excludeDataCount;
            if (showDeleted) {
                totalLength = ths.sortedList.length;
            }
            var quotient = totalLength % recordPerPage;
            maxPageNumber = parseInt("" + (totalLength / recordPerPage));
            if (quotient > 0) {
                maxPageNumber = maxPageNumber + 1;
            }
            if (currentPageNumber >= maxPageNumber) {
                currentPageNumber = maxPageNumber;
            }
            if (currentPageNumber < 1) {
                currentPageNumber = 1;
            }
            startIndex = (currentPageNumber * recordPerPage) - recordPerPage;


            if (maxPageNumber > 1) {

                quotient = (maxPageNumber % pagePerBlock);
                var maxBlockNumber = parseInt("" + (maxPageNumber / pagePerBlock));
                if (quotient > 0) {
                    maxBlockNumber = maxBlockNumber + 1;
                }
                var currentBlockStart = 0;
                var currentBlockEnd = pagePerBlock;
                for (let count = 1; count <= maxBlockNumber; count++) {
                    currentBlockStart = (count * pagePerBlock) - pagePerBlock;
                    currentBlockEnd = (count * pagePerBlock);
                    if (count == maxBlockNumber) {
                        currentBlockEnd = currentBlockEnd - pagePerBlock + quotient;
                    }
                    if (currentPageNumber > currentBlockStart && currentPageNumber <= currentBlockEnd) {
                        break;
                    }
                }
                var pages = [];
                while (currentBlockStart < currentBlockEnd) {
                    pages.push(++currentBlockStart);
                }


                paginationDetail['paginationRequired'] = true;
                paginationDetail['pages'] = pages;
                paginationDetail['currentPage'] = currentPageNumber;
                paginationDetail['isLastPage'] = currentPageNumber == maxPageNumber;
                paginationDetail['nextPage'] = currentPageNumber + 1;
                paginationDetail['previousPage'] = currentPageNumber - 1;
                paginationDetail['isFirstPage'] = currentPageNumber == 1;
                paginationDetail['totalRecord'] = ths.sortedList.length - ths.filterDetail.excludeDataCount;
                if (showDeleted) {
                    paginationDetail['totalRecord'] = ths.sortedList.length;
                }
                paginationDetail['recordStartedFrom'] = startIndex + 1;
                paginationDetail['recordEndedTo'] = startIndex + recordPerPage;
                if ((startIndex + recordPerPage) > paginationDetail['totalRecord']) {
                    paginationDetail['recordEndedTo'] = paginationDetail['totalRecord'];
                }
            }
        }
        var tempCount = 0;
        var tempArray = [];
        if (sortingRequired) {
            ths.sortedList = ths.sortedList.sort(function (leftObj, rightObj) {
                var leftObjectField = "";
                var rightObjectField = "";
                if (sortedFieldName.indexOf(".") >= 0) {
                    var temp = sortedFieldName.split(".");
                    if (typeof leftObj[temp[0]] != 'undefined') {
                        leftObjectField = leftObj[temp[0]][temp[1]];
                    }
                    if (typeof rightObj[temp[0]] != 'undefined') {
                        rightObjectField = rightObj[temp[0]][temp[1]];
                    }
                } else {
                    leftObjectField = leftObj[sortedFieldName];
                    rightObjectField = rightObj[sortedFieldName];
                }
                leftObjectField = "" + leftObjectField;
                rightObjectField = "" + rightObjectField;


                if (sortedFieldName == 'DateAssigned' || sortedFieldName == 'DateSubmitted') {

                    let leftValue;//new Date(leftVal);
                    let rightValue;// new Date(rightVal);
                    if (leftObjectField.toString() != '')
                        leftValue = new Date(leftObjectField.toString());
                    else
                        leftValue = '';
                    if (rightObjectField.toString() != '')
                        rightValue = new Date(rightObjectField.toString());
                    else
                        rightValue = '';
                    if (sortingOrder == 'Asc') {
                        if (leftValue < rightValue) return -1;
                        if (leftValue > rightValue) return 1;
                        return 0;
                    } else {
                        if (rightValue < leftValue) return -1;
                        if (rightValue > leftValue) return 1;
                        return 0;
                    }
                } else {
                    if (sortingOrder == 'Asc') {
                        if (leftObjectField.toLowerCase().toString() < rightObjectField.toLowerCase().toString()) return -1;
                        if (leftObjectField.toLowerCase().toString() > rightObjectField.toLowerCase().toString()) return 1;
                        return 0;
                    } else {
                        if (rightObjectField.toLowerCase().toString() < leftObjectField.toLowerCase().toString()) return -1;
                        if (rightObjectField.toLowerCase().toString() > leftObjectField.toLowerCase().toString()) return 1;
                        return 0;
                    }
                }
            });
        }
        jQuery.each(ths.sortedList, function (ind, value) {
        if (ind >= startIndex) {
                if (showDeleted) {
                    tempArray.push(value);
                    tempCount++;
                } else
                    if (typeof value.Status !== 'undefined') {
                        if (value.Status != 'Deleted' && value.Status != 'Archived') {
                            tempArray.push(value);
                            tempCount++;
                        }
                    } else if (typeof value.Status !== 'undefined') {
                        if (value.Status != 'Deleted' && value.Status != 'Archived') {
                            tempArray.push(value);
                            tempCount++;
                        }
                    }
            }
            if (tempCount == recordPerPage) {
                return false;
            }
        });

        var returnObj = { list: tempArray, pagination: paginationDetail }
        callback(returnObj)
        return returnObj;
    }

    storeClassList(responseData, filterObj) {
        var ths = this;
        ths.filterDetail.excludeDataCount = 0;
        ths.sortedList = responseData;
        jQuery.each(ths.sortedList, function (ind, value) {
            if (typeof value.Status !== 'undefined') {
                if (value.Status == 'Deleted' || value.Status == 'Archived') {
                    ths.filterDetail.excludeDataCount++;
                }
            } else if (typeof value.Status !== 'undefined') {
                if (value.Status == 'Deleted' || value.Status == 'Archived') {
                    ths.filterDetail.excludeDataCount++;
                }
            };
        })
        return ths.getSortedData(filterObj, function () { });
    }

    getUsageReport(params, callback) {        
        this.reportGetService('getActivityUsage', params, callback);        
    }

    getClassListWithTask(filterData, callback) {
        let reqParams = {};
        if (filterData['userName'].length > 0) {
            reqParams = { 'childUserName': filterData['userName'] }
        }
        this.reportGetService('getTaskDetails', reqParams, callback);
    }
    getClassListWithTaskV2(filterData, callback) {
        let reqParams = {};
        if (filterData['userName'].length > 0) {
            reqParams = { 'childUserName': filterData['userName'] }
        }
        this.reportGetService('getTaskDetailsV2', reqParams, callback);
    }
    //PML-7462
    //getMissionList(reqParams,callback) {
    //    this.reportGetService('getMissionReport', reqParams, callback);   
    //}

    getFamilyPlList(filterData, callback) {      
        let reqParams = {};        
        if (filterData['userType']=== 'parent') {            
            reqParams = { 'studentId': filterData['studentId'] }
        }        
        this.reportGetService('getFamilyPlaylistReport', reqParams, callback);        
    }

    getMyChildren(params, callback) {
        this.reportGetService('getChildren', params, callback);
    }

    parentChildrenStatus(callback) {
        this.reportGetService('parentChildrenStatus', [], callback);
    }

    getPlaylistDetails(params, callback) {
        this.reportGetService('getPlaylistDetails', params, callback);
    }
    // //PML-7462
    //getMissionDetailedReportForStudent(params, callback) {
    //    this.reportGetService('getQuizReport', params, callback);       
    //}
    // //PML-7462
    //getMissionDetailedReportForParent(param, callback) { 
    //    super.sendHttpPostAjaxRequest(this.httpUrls['getQuizReport'], param).subscribe(
    //        result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });              
    //}

    //getMissionDetailedReport(param, callback) {
    //    super.sendHttpPostAjaxRequest(this.httpUrls['getQuizReport'], param).subscribe(
    //        result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    //}

    getFamilyPLDetailedReportForStudent(param, callback) {        
        super.sendHttpPostAjaxRequest(this.httpUrls['getFPDetailReport'], param).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    //PML-7462
    //hasMission(callback) {
    //    this.reportGetService('isMissionAssigned', [], callback);
    //}

    getStudentCreatedDate(callback) {
        this.reportGetService('studentCreatedDate', [], callback);        
    }

    isStudentFamilyPlaylistExists(callback) {
        this.reportGetService('hasFamilyPlaylistAssigned', [], callback);
    }

    private reportGetService(urlKey, paramsData, callback) {
        let httpParams = new HttpParams({ fromObject: paramsData }); 
        super.sendHttpGetRequest(this.httpUrls[urlKey], { params: httpParams }).subscribe(
            result => { callback({ "status": true, "result": result }); },
            error => { callback({ "status": false, "result": error }); },
            () => { }
        );
    }

    hoursAndMinsFormat(val) {
        var min = parseInt(val);
        var tip = "This student's usage exceeds 999 h 59 minutes."
        var txt = "...";

        var h = Math.floor(min / 60);
        var m = min % 60;
        txt = h + " h " + m + " min";
        if (h == 0) {
            txt = m + " min";
        }
        if (m == 0) {
            txt = h + " h";
        }

        if (min == -1)
            txt = "0 min";

        if (min == 0) {
            txt = "< 1 min";
        }
        return txt;
    }
}

