import {Injectable} from '@angular/core';
//declare var _gaq: any;
declare var dataLayer: any;

@Injectable()
export class GoogleAnayticsService {
    enabled = true;

    ignoreResources = ["userSessionLog", "LogAction", "userSessionActivityLog"];
    
    eventTracking = [
        { Id: 'resetPassword', Category: 'Password', Action: 'ResetPassword', Label: 'Reset Password' },
        { Id: 'forgotPassword', Category: 'Password', Action: 'ForgotPassword', Label: 'Forgot Password' },
        { Id: 'login', Category: 'SignIn/Out', Action: 'SignIn', Label: 'SignIn' },    
        { Id: 'logoff', Category: 'SignIn/Out', Action: 'LogOut', Label: 'LogOut' },
        { Id: 'registrationPre', Category: 'Registration', Action: 'Pre-Reg', Label: 'Pre Registration' },
        { Id: 'registrationPost', Category: 'Registration', Action: 'Post-Reg', Label: 'Post Registration' },
        { Id: 'assignmentSubmit', Category: 'Assignment', Action: 'FamilyFeedbackSubmit', Label: 'Family Feedback Submit' },
        { Id: 'explorationSubmit', Category: 'Assignment', Action: 'FamilyExplorationSubmit', Label: 'Family Exploration Submit'  }
    ];

    logAPI(url: string) {
        if (url && this.enabled && !this.ignoreRescourseCalls(url)) {
            this.logTrackPageview(url);
        } 
        //return this.noop;
    }

    logRoute(url: string) {
        if (url && this.enabled) {
            this.logTrackPageview(url);
           }
    }

    logEvents(eventName: string, userType: string) {
        let cName = this.eventTracking.find(x => x.Id.toLowerCase() == eventName.toLowerCase());
        if (cName) {
            this.logTrackEvent(cName.Category, cName.Action, userType == "" ? cName.Label : userType);
        }
        
    }

    private logTrackEvent(category: string, action: string, label: string) {
        //if (typeof _gaq !== "undefined" && _gaq !== null) {
        //    _gaq.push(['_trackEvent', category, action, label]);
        //}
        dataLayer.push({
            'event': action,
            'Category': category,
            'Label': label,
        });
    }

    private logTrackPageview(url: String) {
        //if (typeof _gaq !== "undefined" && _gaq !== null) {
        //    _gaq.push(['_trackPageview', url]);
        //}

        dataLayer.push({
            'event': 'virtualPageView',
            'virtualUrl': url,
        });
    }

    private ignoreRescourseCalls(url: string):boolean {
        let ulrParams = url.split("/");
        if (ulrParams.length >= 3 &&  this.ignoreResources.find(x => x.toLowerCase() == ulrParams[2].toLowerCase()) != undefined) {
                return true;
            }
        return false;
    }
}