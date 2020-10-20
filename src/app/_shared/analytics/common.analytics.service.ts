import { Injectable } from '@angular/core';
import { KissmetricsAnayticsService } from './km.analytics.service';

declare var _kmq: any;
declare var userId: any;
declare var userName: any;
declare var userType: any;
declare var isPremiumUser: any;



@Injectable()
export class CommonAnayticsService implements KissmetricsAnayticsService {

    kmenabled: boolean = true;
    
  
    logCMEvents(analyticsName: string,eventName:string, userType: string, data?: any, dataType?: string) {
        if (analyticsName === 'kissmetrics' && this.kmenabled) {
            this.logKMEvents(userType, eventName, data, dataType);
        }

    }

    logKMEvents(userType: string, eventName: string, data?: any, dataType?: string):void {
        if (userType === 'educator') {
            this.logKMEventsAll(userType, eventName, data);
        }

    }

    logKMTrackEvent(category: string, action: string, label: string) {
        //TO DO 
    }

    logKMEventsAll(userType: string, eventName: string, data: any, dataType?: string) {
        let th = this;
        if (typeof (_kmq) != 'undefined') {
            if (userType === 'educator' && isPremiumUser) {
                
                let devent = th.getSearchEventNameKM(eventName);
                //delete data.PR_EVENT;
                let e: any;
                if (typeof (data.PR_VAL) === 'undefined') return;
                th.addCommonDatatoKM(data);
                e = data.PR_VAL;
                
               _kmq.push(['record', devent, e, function () {
                    console.log('Your ' + devent + ' has been tracked.');
                }]);
            }
        }
    }

    private addCommonDatatoKM(d) {  
        if (userType == "educator" && d.PR_VAL != 'undefined') {
            d.PR_VAL["Educator ID"] = userId;
            d.PR_VAL["Educator username"] = userName;
        }
    }



    getSearchEventNameKM(val) {
    var loc = window.location.href;
    var name = "";
    if (val && val === "misc") return "Clicking on Misc Buttons";
    if (val && val === "cppersonal") return "Copy to Personal";
    if (val && val === "svpersonal") return "Save to Personal";
    if (val && val === "maincontent") return "Searching for content";
    if (val && val === "searchmethod") return "Search method";
    if (val && val === "contenttype") return "Content Type";
    if (val && val === "category") return "Category";
    if (val && val === "assignpl") return "Assigning a Playlist";
    if (val && val === "selcstu") return "Selecting Students";
    if (val && val === "subject") {
        if (loc.indexOf('activities') > -1) name = "Searching for a activity";
        if (loc.indexOf('playlist') > -1) name = "Searching for a playlist";
        if (loc.indexOf('checkpoints') > -1) name = "Searching for a question";
        return name = name + " by Subject";
    }
    if (val && val === "nostext") {
        if (loc.indexOf('activities') > -1) name = "Activity";
        if (loc.indexOf('playlist') > -1) name = "Playlist";
        if (loc.indexOf('checkpoints') > -1) name = "Question";
        return name;
        }
        if (val && val === "assignbutpage") {
            name = "Playlist play view";
            if (loc.indexOf('myplaylists') > -1) name = "My Playlists";
            if (loc.indexOf('assignments') > -1) name = "Assignments page";
            
            return name;
        }
    if (loc.indexOf('activities') > -1) name = "Searching for a activity";
    if (loc.indexOf('playlist') > -1) name = "Searching for a playlist";
    if (loc.indexOf('checkpoints') > -1) name = "Searching for a question";
    return name;
}

 getSearchEventButtonKMObj(val) {
    var loc = window.location.href;
    var name = {};
    if (loc.indexOf('activities') > -1) name = { "Buttons on Library Activities page": val };
    if (loc.indexOf('playlist') > -1) name = { "Buttons on Library Playlists page": val };
    if (loc.indexOf('checkpoints') > -1) name = { "Buttons on Library Questions page": val };

    return name;
}


 isEmptyKM(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

   
 }