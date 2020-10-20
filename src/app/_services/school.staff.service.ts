import {Injectable}  from '@angular/core';
import {BaseService} from '@app/_services';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class SchoolStaffService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    getAllCommunityStaffs(type, dataParam, callback) {
        let api = "";

        if (type == 2 || type == "4a") {
            api = "/api/educator/GetPremiumEducators";
        }
        else if (type == 3) {
            api = "/api/educator/GetCommunityEducators?userId=" + dataParam;
        }    

        super.sendHttpGetRequest(api, {}).subscribe(
            result => { callback(result); }, error => { callback(error); }, () => { });
    }

    updateStaffsNewRole(data, callback) {
        super.sendHttpPostAjaxRequest("/api/SchoolAdmin/UpdateStaffPermission", data).subscribe(
            result => { callback({ status: true, data: result }); }, error => { callback({ status: false, errorMessage: error }); }, () => { });
    }

    removeStaffMemberIfCommuniteeNotExist(staffId, callback) {
        let httpParams = new HttpParams().set('staffId', staffId);
        super.sendHttpGetRequest("/api/educator/RemoveSchoolEdition", { params: httpParams}).subscribe(
            result => { callback(result); }, error => { callback(error); }, () => { });
    }
}