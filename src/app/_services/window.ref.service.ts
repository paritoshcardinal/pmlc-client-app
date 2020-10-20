import { Injectable } from '@angular/core';
import { Subject } from "rxjs-operators";

function _window(): any {
    // return the native window obj
    return window;
}

@Injectable()
export class WindowRef {

    public pieEmitterReference: any = {};
    public pieQuestionChangeEmitter = new Subject<any>();

    get nativeWindow(): any {
        return _window();
    }

    subscribeOnQuestionChange(subscribeedFrom, callback) {
        this.pieEmitterReference[subscribeedFrom] = this.pieQuestionChangeEmitter.subscribe((data) => {
            callback && callback(data)
        });
    }

    emitOnQuestionChange(dataObj) {
        this.pieQuestionChangeEmitter.next(dataObj);
    }

    unSubscribeOnQuestionChange(unSubscribeedFrom) {
        if (this.pieEmitterReference[unSubscribeedFrom])
            this.pieEmitterReference[unSubscribeedFrom].unsubscribe();
    }

}
