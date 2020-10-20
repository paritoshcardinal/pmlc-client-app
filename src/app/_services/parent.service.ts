import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject, map, catchError,throwError } from "rxjs-operators";
import { BaseService } from '@app/_services';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class ParentService extends BaseService {
  
    private httpUrls = {     
        'associateChildWithStudentCode': '/Api/parent/AssociateChildWithStudentCode',
        'addChild': '/account/addchild',
        'parentChildrenStatus': '/API/Parent/ParentChildrenStatus',
        'getChildrenGoals': "/API/Parent/GetChildrenGoals",
        'assignGoal': "/API/Parent/AssignGoal",
        'updateGoal': "/API/Parent/UpdateGoal",
        'deleteGoal': '/API/Parent/DeleteGoal'
    };
    
    constructor(private http: HttpClient, private titleService: Title) {
        super(http);
    }
   
    private dataGetService(urlKey, paramsData, callback) {
        let httpParams = new HttpParams({ fromObject: paramsData }); 
        super.sendHttpGetRequest(this.httpUrls[urlKey], { params: httpParams }).subscribe(
            result => { callback({ "status": true, "result": result }); },
            error => { callback({ "status": false, "result": error }); },
            () => { }
        );
    }

    sendHttpPostRequest(url, params) {
        let headerOptions = {
            withCredentials: true,
            headers: new HttpHeaders({
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }
        return this.http.post(url, params, headerOptions)
            .pipe(
            catchError((error: any) => {
                return throwError(error.error);
            }));
    };
   
    associateChildWithStudentCode(params, callback) {
        this.dataGetService('associateChildWithStudentCode', params, callback);
    }

    addChild(params, callback) {
        this.sendHttpPostRequest(this.httpUrls['addChild'], params).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    getParentChildrenStatus(params, callback) {
        this.dataGetService('parentChildrenStatus', params, callback);
    }

    getChildrenGoals(params, callback) {
        this.dataGetService('getChildrenGoals', params, callback);
    }

    parentChildrenGoal(params, callback) {
        let urlKey = (params['GoalId'] && params['GoalId'] != '') ? 'updateGoal' : 'assignGoal';
        this.sendHttpPostRequest(this.httpUrls[urlKey], params).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    deleteGoal(params, callback) {
        this.dataGetService('deleteGoal', params, callback);
    }

    setPageTitle(title: string, usetType: string) {
        if (usetType === "") this.titleService.setTitle(title);
        else this.titleService.setTitle(userType.charAt(0).toUpperCase() + userType.slice(1) + "-" + title);
    }
}

