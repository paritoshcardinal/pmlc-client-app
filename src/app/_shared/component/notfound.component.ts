import { Component } from '@angular/core';
import { LibraryService } from 'library-services/library.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'not-found',
    templateUrl: '../../../../Template2.0/shared2.0.1/NotFound.html',
    styles: [
        `.error-page-rel {
            background: #000;
            position: fixed;
            width:100%;
            height:100%;
            display: flex;
         }
        .error-message {
            width: 93%;
            position: relative;
            margin: 60px auto;
            background: #494949;
            color: #fff;
            padding: 45px;
            box-sizing: border-box;
            font-size: 57px;
            line-height: normal;
            font-family: MuseoSans-700;
            padding-left: 107px;
        }
        .error-message img {
            width: 36px;
            position: absolute;
            left: 58px;
            top: 62px;
        }
        .error-message p {
            font-size: 26px;
            font-family: MuseoSans-300;
            margin-top: 13px;
        }
        .close-btn {
            height: 30px;
            width: 30px;
            background: url(/Content/assets/images/close_new.png) no-repeat left top;
            position: absolute;
            top: 12px;
            right: 12px;
            background-size: 30px;
        }
        .pl-not-found-message {
            width: 525px;
            font-family: 'MuseoSans-500';
            margin: 0 auto;
            font-size: 17px;
            position: relative;
            padding: 12px 0 12px 45px;
            background: #fbf8b8 url(../../../Content/assets/images/small_thunder_bolt.png) no-repeat 8px 11px;
            margin-top: 90px;
        }
        .pl-not-found-message p {
            padding: 0;
            margin: 0;
            color: #000;
            line-height: 25px;
        }
        .error-btn-container .close-btn {
            top: 25px;
            right: 39px;
            border: 2px solid #3578b6;
            border-radius: 50%;
        },
    `]
})

export class NotFoundComponent {
    //loading: boolean = true;
    userType: string;
    errorMessage: string;
    constructor(private route: ActivatedRoute) {
        this.errorMessage = window.history.state.errorMessage;
    }


    gotoPage() {

        window.location.href = "/" + this.userType;

    }

}