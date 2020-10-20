import { Component, Input, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import { PmlLoadingOverlayDirective } from 'shared2.0.1/directives/loading.overlay.directive';
import { MyPlaylistsService } from 'myplaylists2.0.1/services/myplaylists.service';

@Component({
    selector: 'mobile-previewlink',
    templateUrl: '../../../../Template2.0/shared2.0.1/MobilePreviewLink.html',
    styleUrls: ['../../../../css/apps/shared2.0.1/mobile-previewlink.css'],    
    encapsulation: ViewEncapsulation.None
})

export class MobilePreviewLinkComponent {
    @Input() plContentGuid: string;
    @Input() previewType: string;
    @Input() sourceUrl: string;
    
    @Output() emitToParent = new EventEmitter();
    mobileNoEducator: string = '';
    isMobileNoValid: boolean = false;
    showMobileError: boolean = false;
    showLoadingOverlay: boolean = false;
    showSuccessmessage: boolean = false;
    modalConfig = {
        message: "",
        btnMessage: ""
    };

    constructor(private _plService: MyPlaylistsService) {
    }

    ngOnInit() {
        this.mobileNoEducator = this.formatMobileNumberValidation(this._plService.mobileNoPreview);
        if (this.mobileNoEducator)
            this.isMobileNoValid = true;
        this.modalConfig.message = "Access the mobile preview on your desktop here:<a href='" + window.location.protocol + "//" + window.location.host + "/p/" + this.plContentGuid + "' target='_blank'>" + window.location.protocol + "//" + window.location.host + "/p/" + this.plContentGuid + "</a>To check that this playlist is mobile compatible, enter your mobile number to receive the preview link by text.";
        if (this.previewType == 'Dla') {
            this.modalConfig.message = "Check to make sure this activity is mobile compatible.<br /> Enter your mobile number to receive a preview link by text.";
        }
        this.showSuccessmessage = false;
    }

    close() {
        this.emitToParent.emit({ action: 'closePreviewLinkPopup'});
    }

    sendPreviewLinkToMe() {
        if (this.mobileNoEducator == '')
            this.isMobileNoValid = false;
        if (this.isMobileNoValid) {
            this.sendPreviewLink();
        }
    }

    sendPreviewLink() {
        this.showLoadingOverlay = true;
        let mobileNo = this.mobileNoEducator.replace(/-/g, '')
        let dataToSave = {
            "ContentGuid": this.plContentGuid,
            "Phone": mobileNo,
            "Email": '',
            "SendEmail": false,
            "dueDate": '',
            "PreviewType": this.previewType,
            "SourceUrl": this.sourceUrl
        };
        this._plService.SendAssignmentPreviewLink(dataToSave, (data) => {
            this._plService.mobileNoPreview= this.mobileNoEducator;
            this.showSuccessmessage = true;
            this.showLoadingOverlay = false;
        });
    }

    isCellNumberValid(cellNumber) {
        if (this.isEmptyValue(cellNumber)) {
            this.isMobileNoValid = null;
        } else {
            this.isMobileNoValid = !this.isNotValidcellPhoneNumber(cellNumber);
        }
        
        if (!this.isMobileNoValid)
            this.showMobileError = true;
        else
            this.showMobileError = false;
    }
    isNotValidcellPhoneNumber(value) {
        let isError = false;
        if (this.trimValue(value).length > 0) {
            let regExp = /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/;
            if (!regExp.test(value)) {
                isError = true;
            }
        }
        return isError;
    }
    trimValue(value) {
        return jQuery.trim(value);
    }
    isEmptyValue(value) {
        if (typeof value == 'undefined' || this.trimValue(value).length < 1) {
            return true;
        }
        return false;
    }
    formatMobileNumber(mobileNumber) {
        if (this.isEmptyValue(mobileNumber)) {
            this.isMobileNoValid = false;
        }
        this.mobileNoEducator = this.formatMobileNumberValidation(this.mobileNoEducator);

    }

    formatMobileNumberValidation(mobileNumber) {

        if (this.isEmptyValue(mobileNumber)) {
            return "";
        }
        let value = this.trimValue(mobileNumber);

        value = value.replace(/[^0-9]/g, "");//replace non numbers
        if (value.length < 1) {
            return "";
        }
        value = value.split("-").join(""); // remove hyphens
        if (value.length > 10) {
            value = value.substring(0, 10)
        }
        if (value.length < 7) {
            value = value.match(new RegExp('.{1,3}', 'g')).join("-");
        } else {
            let tempValue = value.substring(0, 7);
            value = tempValue.match(new RegExp('.{1,3}', 'g')).join("-") + value.substring(7, value.length);
        }
        this.isMobileNoValid = !this.isNotValidcellPhoneNumber(mobileNumber);
        return value;
    }
}