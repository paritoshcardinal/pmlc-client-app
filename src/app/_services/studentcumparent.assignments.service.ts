import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs-operators';;
import { Title } from '@angular/platform-browser';
import {BaseService} from '@app/_services/base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class StudentCumParentAssignmentsService extends BaseService {
    private httpUrls = {
        'getAssignedClasses': '/api/Student/GetAssignedClasses',
        'getStudentAssignments': '/api/Student/StudentClassAssignmentsV2',
        'getStudentDetails': '/api/student/GetStudentDetails',
        'getEducatorsbyClassCode': '/api/Student/educatorsbyclassCode',
        'joinClass': '/api/Student/V2/joinclass',
        'leaveClass': '/api/Student/LeaveClass',        
        'getChildren': '/api/Parent/GetChildren',
        'getAssignedClassesParent': '/api/Parent/GetAssignedClasses',
        'getStudentAssignmentsParent': '/api/Parent/StudentClassAssignmentsV2',
        'parentChildrenStatus': '/api/Parent/ParentChildrenStatus',
        'UpdateIsNew': '/api/student/UpdateIsNew',

    };

    private classChangedEmitter = new Subject<any>();

    subscribeOnClassChanged(callback) {
        this.classChangedEmitter.subscribe((header) => {
            callback(header)
        });
    }

    emitOnClassChanged(classData) {
        this.classChangedEmitter.next(classData);
    }

    constructor(private http: HttpClient, private titleService: Title) {
        super(http);
    }

    setPageTitle(title: string, usetType: string) {
        if (usetType === "") this.titleService.setTitle(title);// + this.titleService.getTitle());
        else this.titleService.setTitle(userType.charAt(0).toUpperCase() + userType.slice(1) + "-" + title);// + this.titleService.getTitle());
    }

    getAssignedClasses(params, callback) {
        this.dataGetService('getAssignedClasses', params, callback);
    }

    getChildren(params, callback) {
        this.dataGetService('getChildren', params, callback);
    }

    getAssignedClassesParent(params, callback) {
        this.dataGetService('getAssignedClassesParent', params, callback);
    }

    private dataGetService(urlKey, paramsData, callback) {
        super.sendHttpGetRequest(this.httpUrls[urlKey], { params: paramsData }).subscribe(
            result => { callback({ "status": true, "result": result }); },
            error => { callback({ "status": false, "result": error }); },
            () => { }
        );
    }

    getStudentDetails(params, callback) {
        this.dataGetService('getStudentDetails', params, callback);
    }

    getEducatorsbyClassCode(params, callback) {
        this.dataGetService('getEducatorsbyClassCode', params, callback);
    }
    parentChildrenStatus(params, callback) {
        this.dataGetService('parentChildrenStatus', params, callback);
    }
    getStudentAssignments(param, callback) {
        let url = this.httpUrls['getStudentAssignments'];
        if (userType == 'parent')
            url = this.httpUrls['getStudentAssignmentsParent'];
        super.sendHttpPostFormRequest(url, param).subscribe(
            result => { callback({ "status": "success", "result": result }); }, error => { callback({ "status": "error", "result": error }); }, () => { });
    }

    joinClass(param, callback) {
        super.sendHttpPostAjaxRequest(this.httpUrls['joinClass'], param).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    leaveClass(params, callback) {
        this.dataGetService('leaveClass', params, callback);
    }

    UpdateIsNew(params, callback) {
        this.dataGetService('UpdateIsNew', params, callback);
    }
   
}

