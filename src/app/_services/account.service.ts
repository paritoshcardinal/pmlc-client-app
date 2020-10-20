import {Injectable}  from '@angular/core';
import { UserProfileModel } from '@app/_models';
import { BaseService } from '@app/_services';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class AccountService extends BaseService {
    userType = userType;
    constructor(private http: HttpClient, private titleService: Title) {
        super(http);
    }
    private httpAccountUrls = {
        'userProfileUrl': '/api/' + this.userType + '/GetUserProfile',
        'getEducatorDetails': '/api/' + this.userType + '/GetEducatorDetails',
        'manageAccountUrl': '/api/' + this.userType + '/ManageUserProfile',
        'updateProfilePicUrl': '/api/' + this.userType + '/UpdateProfilePicture',
        'removeChildByParent': '/api/' + this.userType + '/RemoveChildByParent',
        'deleteTokenUrl': '/api/OAuth/DeleteToken',
        'getToken': '/api/OAuth/GetToken',
        'joinSchoolEditionUrl': '/api/educator/JoinSchoolEdition',
        'getSchoolNameUrl': '/api/Anonymous/GetSchool'
    };

    GetUserProfile(callback) {
        super.sendHttpGetRequest(this.httpAccountUrls['userProfileUrl'], {}).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });       
    }

    GetEducatorDetails(callback) {
        super.sendHttpGetRequest(this.httpAccountUrls['getEducatorDetails'], {}).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    UpdateAccount(userProfileModel, callback) {
        super.sendHttpPostAjaxRequest(this.httpAccountUrls['manageAccountUrl'], userProfileModel).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });        
    }

    UpdateProfilePicture(param): Promise<any> {
        return super.sendHttpPostAjaxRequest(this.httpAccountUrls['updateProfilePicUrl'], param).toPromise();
    }

    GetSchoolNameSuggestion(schoolRequest: any, callback) {
        super.sendHttpPostAjaxRequest(this.httpAccountUrls['getSchoolNameUrl'], schoolRequest).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    deleteChildAccountFromparentProfile(UserNames, callback) {        
        super.sendHttpPostAjaxRequest(this.httpAccountUrls['removeChildByParent'], UserNames).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    deleteAuthToken(callback) {
        super.sendHttpGetRequest(this.httpAccountUrls['deleteTokenUrl'], {}).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    joinSchoolEdition(code: string, callback) {
        let httpParams = new HttpParams().set('code', code);
        super.sendHttpGetRequest(this.httpAccountUrls['joinSchoolEditionUrl'], { params: httpParams}).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });
    }

    getAuthToken(callback) {
        super.sendHttpGetRequest(this.httpAccountUrls['getToken'], {}).subscribe(
            result => { callback({ "status": true, "result": result }); }, error => { callback({ "status": false, "result": error }); }, () => { });        
    }


    isDateValid(param) {
        let tempArr = param.split('/');
        if (tempArr[0].length && tempArr[0].length == 1) {
            param = '0' + tempArr[0] + "/" + tempArr[1] + "/" + tempArr[2];
        }
        if (tempArr[1].length && tempArr[1].length == 1) {
            param = param.split('/')[0] + "/" + '0' + tempArr[1] + "/" + tempArr[2];
        }
        let currVal = param;
        if (param.split('/')[1] == '') return false;
        if (param.split('/')[0] == '' || param.split('/')[2] == '') { return true; }
        if (currVal == '')
            return false;
        //Declare Regex
        let rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        let dtArray = currVal.match(rxDatePattern); // is format OK?

        if (!this.validateDateMMDDYYYY(currVal))
            return false;
        //Checks for mm/dd/yyyy format.
        let dtMonth = parseInt(dtArray[1], 10);
        let dtDay = parseInt(dtArray[3], 10);
        let dtYear = parseInt(dtArray[5], 10);

        //if (dtMonth === '' || dtYear === '') { return false; }
        if (dtMonth < 1 || dtMonth > 12) { return false; }
        if (dtDay < 1 || dtDay > 31) { return false; }
        if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31) { return false; }
        if (dtMonth === 2) {
            let isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay === 29 && !isleap)) {
                return false;
            }
        }
        if (new Date(dtYear, (dtMonth - 1), dtDay) > new Date()) { return false; }
        return true;
    }

    validateDateMMDDYYYY(testdate) {
        let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        return date_regex.test(testdate);
    }

    /**
    * set Page Title
    * @param title Title
    * @param usetType LoggedinUser Type
    */
    setPageTitle(title: string, usetType: string) {
        if (usetType === "") this.titleService.setTitle(title);// + this.titleService.getTitle());
        else this.titleService.setTitle(userType.charAt(0).toUpperCase() + userType.slice(1) + "-" + title);// + this.titleService.getTitle());
    }

}

