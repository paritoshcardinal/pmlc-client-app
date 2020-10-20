import { Observable } from "rxjs-operators";
import { GoogleAnayticsService } from '@app/_shared/analytics';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend, HttpBackend, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class PmlHttpInterceptor  implements HttpInterceptor   {
    constructor(public gaService: GoogleAnayticsService) {
    }

    intercept(request:any, next: HttpHandler): Observable<HttpEvent<any>>  {
        if (!this.gaService) this.gaService = new GoogleAnayticsService();
        this.gaService.logAPI(request.url);
        return next.handle(request);
    }
}

