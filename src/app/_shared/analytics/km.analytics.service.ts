import {Injectable} from '@angular/core';
declare var _kmq1: any;

export interface KissmetricsAnayticsService {

        
    logKMEventsAll(userType: string, string, eventName, data: any, dataType?: string):void;
    
    logKMTrackEvent(category: string, action: string, label: string): void;
    
}