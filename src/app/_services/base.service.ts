import handleError from '@app/_services/errorlogs/error.logger';
import { Observable, map, catchError, throwError} from "rxjs-operators";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
export class BaseService {

    constructor(private proHttp: HttpClient) {

    }
    protected sendHttpGetRequest(url, data) {
        if (typeof data.params === 'undefined') {
            return this.proHttp.get(url).pipe(
                catchError((error: any) => {
                    return throwError(error.error);
                }));
        } else {
            return this.proHttp.get(url, data)
                .pipe(
                catchError((error: any) => {
                    return throwError(error.error);
                }));
        }
    };

    protected sendHttpGetRequestMap(url, data) {
        if (typeof data.params === 'undefined') {
            return this.proHttp.get(url).pipe(
                map((resp => resp),
                    catchError((error: any) => {
                        return throwError(error.error);
                })));
        } else {
            return this.proHttp.get(url,data).pipe(
                map((resp => resp),
                    catchError((error: any) => {
                        return throwError(error.error);
                    })));
        }
    };

    protected sendHttpPostAjaxRequest(url, params) {
        return this.proHttp.post(url, params, { headers: new HttpHeaders().set('Content-Type', 'application/json') }).pipe(
            catchError((error: any) => {
                return throwError(error.error);
            }));

    };

    protected sendHttpPostFormRequest(url, params) {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            let value = params[key];
            if (typeof value === "object" && value.length) {
                value.forEach(function (s) {
                    httpParams = httpParams.append(key, s);
                });
            } else {
                httpParams = httpParams.append(key, value);
            }
        })

        return this.proHttp.post(url, httpParams.toString(), {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Accept': 'application/json;charset=utf-8'
                }
            )
        }).pipe(
            catchError((error: any) => {
                return throwError(error.error);
            }));
    };
}

