import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs-operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DataService {
    private subject = new Subject<any>();
    private parentChildEmitter = new Subject<any>();
    private parentChildEmitterReference: any = {};
    private studentparentPlaylistData: any = { playlist: null, item: null, selectedIndex: 0, isAlreadyDlaClicked: false };
    //private studentparentAssesmentData: any = { assessment: null, CurrentItem: null, currentItemIndex: 0, defaultDisplayItem: null, defaultDisplayItemIndex: 0 };
    private studentparentAssesmentData: any = null;

    constructor(public translate: TranslateService) {
        
    }

    setPlaylistData(pl) {
        this.studentparentPlaylistData = pl;
    }

    getPlaylistData() {
        return this.studentparentPlaylistData;
    }

    setAssesmentData(asm) {
        this.studentparentAssesmentData = asm;
    }

    getAssesmentData() {
        return this.studentparentAssesmentData;
    }

    subscribeOnParentChildChanges(name, callback) {
        this.parentChildEmitterReference[name] = this.parentChildEmitter.subscribe((header) => {
            callback(header)
        });
    }

    emitOnParentChildChanges(data) {
        this.parentChildEmitter.next(data);
    }

    unSubscribeOnParentChildChanges(name) {
        this.parentChildEmitterReference[name].unsubscribe();
    }

    sendData(data: any) {
        this.subject.next({ data: data });
    }

    clearData() {
        this.subject.next();
    }

    getData(): Observable<any> {
        return this.subject.asObservable();
    }

    notifyActivityInstruction(isClickedOutside: boolean) {
        this.subject.next({ isClick: isClickedOutside });
    }

    activityInstructionReciever(): Observable<any> {
        return this.subject.asObservable();
    }

    notifyPageHeader(data: any) {
        this.subject.next({ getData: data });
    }

    pageHeaderReciever(): Observable<any> {
        return this.subject.asObservable();
    }

    getLanguageFromCookie() {
        let pLanguage = "English";
        if (getCookie("googtrans") == "") {
            if (premiumLanguage != "") pLanguage = premiumLanguage;
        } else {
            pLanguage = getlanguage();
        }
        if (availablePrefferedLanguageJSON[pLanguage]) {
            this.translate.setDefaultLang(pLanguage);
            this.translate.use(pLanguage);
        }
    }
}

