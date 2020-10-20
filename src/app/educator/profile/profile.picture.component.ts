import {Component, NgModule, ViewChild, Output, EventEmitter, ViewEncapsulation, Input} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AccountService,BoxService} from '@app/_services';
import '@app/_shared/models/javascript.variable';

@Component({
    selector: 'profile-picture',
    templateUrl: './ProfilePicture.html',
    styleUrls: ['./ProfilePicture.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProfilePictureComponent {
    @Output() onClosePopup: EventEmitter<any> = new EventEmitter<any>();
    @Output() onApplyCrop: EventEmitter<any> = new EventEmitter<any>();
    @Input() cloudMediaId: any;
    isDisable: boolean;
    fileName: string = '';

    constructor(private _accountService: AccountService, private _boxService: BoxService) {
    }

    closePopup() {
        this.onClosePopup.emit();
    }

    applyCrop() {
        var img = jQuery('.cropit-image-input').val();
        if (img) {
            var imageData = jQuery('.image-editor').cropit('export');
            this.cloudMediaId ? this.updateImageInBox(imageData) : this.saveImageToBox(imageData);
        }
        else {
            this.onApplyCrop.emit(null);
        }
    }

    updateImageInBox(imageData) {
        this.isDisable = true;
        let fileObj = this._boxService.getFileObject({ fileUrl: imageData, fileName: this.fileName });
        let param = {
            fileObj: fileObj,
            fileId: this.cloudMediaId
        }
        this._boxService.updateFileDataInBox(param, (result) => {
            if (result['success']) {
                this.onApplyCrop.emit({ CloudMediaId: this.cloudMediaId, imageThumbUrl: imageData });
                this.isDisable = false;
            }
        })
    }

    saveImageToBox(imageData) {
        this.isDisable = true;
        let param = {
            fileUrl: imageData,
            fileName: this.fileName
        }
        this._boxService.uploadImageOrVideo(param, 'Image', 'ProfileImage', (result) => {
            if (result['success']) {
                let param = {
                    CloudMediaId: result.data.FileId
                }
                this.saveImageFileIdToDatabase(imageData, param);
            }
        });
    }

    async saveImageFileIdToDatabase(imageData, param) {
        let data = await this._accountService.UpdateProfilePicture(param);
        if (data) {
            this.cloudMediaId = param.CloudMediaId;
            this.onApplyCrop.emit({ CloudMediaId: this.cloudMediaId, imageThumbUrl: imageData });
            this.isDisable = false;
        }
    }  

    ngOnInit() {
        this.initCropper();
    }

    getFileName() {
        this.fileName = jQuery('.cropit-image-input').val().split('\\').pop();
    }

    initCropper() {
        jQuery('.image-editor').cropit({
            exportZoom: 1.25,
            imageBackground: true,
            imageBackgroundBorderWidth: 20,
            smallImage: "allow",
            allowAnyImageSizeToUpload: true,
            imageState: {
                src: '',
            },
        });
    }

    clickInput() {
        jQuery('.cropit-image-input').click();
    }

    resetImageData() {
        this.fileName = '';
        this.cloudMediaId = '';
    }

}