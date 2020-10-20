import { Injectable } from '@angular/core';
import { BaseService } from '@app/_services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BoxService extends BaseService {
    boxClient: any;
    folderDefaultProp: string;
    boxFolderId: any;
    accessToken: string = '';
    maincallback: any;
    thumbnailCounter: number = 0;

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
        super(http);
        this.folderDefaultProp = 'parent_id';
    }

    uploadImageOrVideo(param, type, folderType, callback) {
        let fileObj: any = this.getFileObject(param);
        this.uploadFileToBox(fileObj, folderType, (file) => {
            if (file['success']) {
                let sizeObj = formatBytes(fileObj.size, 0);
                let FileInfo = {
                    FilePath: param.fileName,
                    FileId: file.data.entries[0].id,
                    VersionNumber: file.data.entries[0].file_version.id,
                    FileThumbnail: 'randomethumbnail.jpg',
                    FileSize: sizeObj.size + '' + sizeObj.unit,
                    FileType: type
                };
                callback({ success: true, data: FileInfo });
            }
        });
    }

    updateFileDataInBox(param, callback?) {
        this.updateBoxClientObject(() => {
            let formData = new FormData();
            formData.append(param.fileObj.name, param.fileObj);
            formData.append('id', param.fileId);
            this.boxClient.files.uploadNewFileVersion({ body: formData }).then((result) => {
                callback({ success: true, data: result });
            }).catch((error) => {
                this.checkAndUpdateAccessToken('updateFile', formData, (result) => {
                    callback(result);
                });
            });
        });
    }

    async uploadFileToBox(fileInfo, folderType, callback?) {
        this.boxFolderId = await this.getFolderId(folderType); // Gets The Box Folder Id Before Uploading Image or Video
        this.updateBoxClientObject(() => {
            let formData = new FormData();
            formData.append(fileInfo.name, fileInfo);
            formData.append(this.folderDefaultProp, this.boxFolderId);
            this.boxClient.files.upload({ body: formData }).then((result) => {
                callback({ success: true, data: result });
            }).catch((error) => {
                this.checkAndUpdateAccessToken('uploadFile', formData, (result) => {
                    callback(result);
                });
            });
        });
    }

    checkAndUpdateAccessToken(type, data, callback) {
        this.accessToken = '';
        let promise;
        this.updateBoxClientObject(() => {
            if (type == 'uploadFile') {
                promise = this.boxClient.files.upload({ body: data });
            } else if (type == 'sharedLink') {
                promise = this.boxClient.files.createSharedLink({ id: data });
            } else if (type == 'downloadUrl') {
                promise = this.boxClient.files.getDownloadUrl({ id: data });
            } else if (type == 'deleteFile') {
                promise = this.boxClient.files.delete({ id: data });
            } else if (type == 'updateFile') {
                promise = this.boxClient.files.uploadNewFileVersion({ body: data });
            } else if (type == 'downloadMp4Url') {
                promise = this.getMp4ReprsentationVideo(data);
            } else if (type == 'thumbUrl') {
                promise = this.getThumbnail(data);
            }
            promise.then((result) => {
                callback({ success: true, data: result });
            }).catch((error) => {
                callback({ success: false, data: error });
            });
        });
    }

    getRandomFileName(fileName) {
        let n = fileName;
        return new Date().getMilliseconds() + n;
    }

    getDownloadUrlOfFileFromBox(fileId, callback?) {
        this.updateBoxClientObject(() => {
            this.boxClient.files.getDownloadUrl({ id: fileId }).then((result) => {
                callback({ success: true, data: result });
            }).catch((error) => {
                this.checkAndUpdateAccessToken('downloadUrl', fileId, (result) => {
                    callback(result);
                });
            });
        });
    }

    getSharedLinkOfFileFromBox(fileId, callback?) {
        this.updateBoxClientObject(() => {
            this.boxClient.files.createSharedLink({ id: fileId }).then((result) => {
                callback({ success: true, data: result });
            }).catch((error) => {
                this.checkAndUpdateAccessToken('sharedLink', fileId, (result) => {
                    callback(result);
                });
            });
        });
    }

    deleteFileFromBox(fileId, callback?) {
        this.updateBoxClientObject(() => {
            this.boxClient.files.delete({ id: fileId }).then((result) => {
                callback({ success: true, data: result });
            }).catch((error) => {
                this.checkAndUpdateAccessToken('deleteFile', fileId, (result) => {
                    callback(result);
                });
            });
        });
    }

    getBase64URLtoFileObject(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    getFileObject(param) {
        let randomName = this.getRandomFileName(param.fileName);
        return this.getBase64URLtoFileObject(param.fileUrl, randomName);
    }

    getThumbnailFromBox(fileId, fileType, dimension, callback) {
        this.updateBoxClientObject(() => {
            this.getThumbnail({ fileId: fileId, fileType: fileType, dimension: dimension }).then((result) => {
                callback({ success: true, data: result });
            }).catch((error) => {
                this.checkAndUpdateAccessToken('thumbUrl', { fileId: fileId, fileType: fileType, dimension: dimension }, (result) => {
                    callback(result);
                });
            })
        });
    }

    convertBlobUrlToDataUrl(blobUrl, callback) {
        var xhr = new XMLHttpRequest;
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var recoveredBlob = xhr.response;
            var reader = new FileReader;
            reader.onload = function () {
                var blobAsDataUrl = reader.result;
                callback(blobAsDataUrl);
            };
            reader.readAsDataURL(recoveredBlob);
        };
        xhr.open('GET', blobUrl);
        xhr.send();
    }

    getBoxAccessToken(callback) {
        super.sendHttpGetRequest('/api/' + userType + '/GetBoxAccessToken', {}).subscribe(
            result => { callback({ success: true, 'data': result }); }, error => { callback({ success: false, 'data': error }); }, () => { });
    }

    updateBoxClientObject(callback) {
        if (this.accessToken == '') {
            this.getBoxAccessToken((result) => {
                this.accessToken = result.data;
                let box = new BoxSdk();
                this.boxClient = new box.BasicBoxClient({ accessToken: this.accessToken });
                callback();
            });
        } else {
            callback()
        }
    }

    getFolderId(folderType): Promise<any> {
        if (!this.boxFolderId) {
            let httpParams = new HttpParams().set('folderType', folderType);
            return super.sendHttpGetRequest('api/' + userType + '/GetVideoImageFolderId', { params: httpParams }).toPromise();
        } else {
            return new Promise((resolve, reject) => { resolve(this.boxFolderId) });
        }
    }

    getMp4ReprsentationVideo(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://dl.boxcloud.com/api/2.0/internal_files/' + data.fileId + '/versions/' + data.versionNumber + '/representations/mp4/content/', true);
            xhr.responseType = "blob";
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
            xhr.onload = (oEvent: any) => {
                if (oEvent.target.response.size > 0) {
                    var blob = new Blob([oEvent.target.response], { type: "video/mp4" });
                    resolve(this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob)));
                } else if (oEvent.target && oEvent.target.statusText == 'Unauthorized' && oEvent.target.status == 401) {
                    reject(false);
                }
            }
            xhr.onerror = (error) => {
                reject(false);
            }
            xhr.send();
        });
    }

    getDownloadUrlOfMp4Videos(fileId, versionNumber, callback) {
        this.updateBoxClientObject(() => {
            this.getConvertedMp4UrlRec({ fileId: fileId, versionNumber: versionNumber }, (data) => {
                if (data['success']) {
                    callback(data);
                } else {
                    this.checkAndUpdateAccessToken('downloadMp4Url', { fileId: fileId, versionNumber: versionNumber }, (result) => {
                        callback(result);
                    });
                }
            });
        });
    }

    getConvertedMp4UrlRec(data: any, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://dl.boxcloud.com/api/2.0/internal_files/' + data.fileId + '/versions/' + data.versionNumber + '/representations/mp4/content/', true);
        xhr.responseType = "blob";
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
        xhr.onload = (oEvent: any) => {
            if (oEvent.target.response.size > 0) {
                var blob = new Blob([oEvent.target.response], { type: "video/mp4" });
                callback({ success: true, data: this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob)) });
            }
            else if (oEvent.target && oEvent.target.statusText == 'Unauthorized' && oEvent.target.status == 401) {
                callback({ success: false });
            }
            else if (oEvent.target.response.size <= 0) {
                setTimeout(() => { this.getConvertedMp4UrlRec(data, callback) }, 1000);
            }
        }
        xhr.onerror = (error) => {
            callback({ success: false });
        }
        xhr.send();
    }

    getThumbnail(data): Promise<any> {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://api.box.com/2.0/files/' + data.fileId + '/thumbnail.jpg?max_height=' + data.dimension.height + '&max_width=' + data.dimension.width + '', true);
            xhr.responseType = "blob";
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
            xhr.onload = (oEvent: any) => {
                if (oEvent.target.response && oEvent.target.response.size > 0) {
                    var blob = new Blob([oEvent.target.response], { type: "image/jpg" });
                    this.convertBlobUrlToDataUrl(URL.createObjectURL(blob), (blobAsDataUrl) => {
                        resolve(blobAsDataUrl);
                    });
                } else if (oEvent.target && oEvent.target.statusText == 'Unauthorized' && oEvent.target.status == 401) {
                    reject(false);
                } else {
                    let defThumb = data.fileType == 'Video' ? '/Content/assets/images/play_video_thmpng.png' : '/Content/assets/images/upload_image_thm.png';
                    resolve(defThumb); // for Default thumbnail
                }
            }
            xhr.onerror = (error: any) => {
                let defThumb = data.fileType == 'Video' ? '/Content/assets/images/play_video_thmpng.png' : '/Content/assets/images/upload_image_thm.png';
                resolve(defThumb); // for Default thumbnail
            }
            xhr.send();
        });
    }

    getThumbnailRecursive(fileId, fileType, dimension, callback) {
        this.updateBoxClientObject(() => {
            this.getThumbnailRec(fileId, fileType, dimension, (data) => {
                if (data['success']) {
                    callback(data);
                } else {
                    this.checkAndUpdateAccessToken('thumbUrl', { fileId: fileId, fileType: fileType, dimension: dimension }, (result) => {
                        callback(result);
                    });
                }
            });
        });
    }

    getThumbnailRec(fileId, fileType, dimension, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://api.box.com/2.0/files/' + fileId + '/thumbnail.jpg?max_height=' + dimension.height + '&max_width=' + dimension.width + '', true);
        xhr.responseType = "blob";
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
        xhr.onload = (oEvent: any) => {
            if (oEvent.target.response && oEvent.target.response.size > 0) {
                var blob = new Blob([oEvent.target.response], { type: "image/jpg" });
                this.convertBlobUrlToDataUrl(URL.createObjectURL(blob), (blobAsDataUrl) => {
                    callback({ success: true, data: blobAsDataUrl });
                    this.thumbnailCounter = 0;
                });
            }
            else if (oEvent.target && oEvent.target.statusText == 'Unauthorized' && oEvent.target.status == 401) {
                callback({ success: false });
                this.thumbnailCounter = 0;
            }
            else if (oEvent.target.response.size <= 0 && this.thumbnailCounter < 4) {
                this.thumbnailCounter += 1;
                this.getThumbnailRec(fileId, fileType, dimension, callback);
            }
            else if (oEvent.target.response.size <= 0) {
                let defThumb = fileType == 'Video' ? '/Content/assets/images/play_video_thmpng.png' : '/Content/assets/images/upload_image_thm.png';
                callback({ success: true, data: defThumb }); // for Default thumbnail
                this.thumbnailCounter = 0;
            }
        }
        xhr.onerror = (error: any) => {
            let defThumb = fileType == 'Video' ? '/Content/assets/images/play_video_thmpng.png' : '/Content/assets/images/upload_image_thm.png';
            callback({ success: true, data: defThumb }); // for Default thumbnail
            this.thumbnailCounter = 0;
        }
        xhr.send();
    }

    refreshAccessToken(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.accessToken = '';
            this.updateBoxClientObject(() => { resolve(true) });
        });
    }

    // Method For Saving Image/Video In Ipad

    saveVideoFromIpad(responseMedia, imgIndex, fileObject, callback) {
        responseMedia['showAttachmentLoader'] = true;
        let reader = new FileReader();
        reader.onload = (e) => {
            let fileUrl = e.target['result'];
            this.saveVideoToBoxFromIpad(fileUrl, fileObject, responseMedia, imgIndex, (data) => {
                callback(data);
            });
        };
        reader.readAsDataURL(fileObject);
    }

    saveVideoToBoxFromIpad(fileUrl, fileObject, responseMedia, imgIndex, callback) {
        let param = {
            fileUrl: fileUrl,
            fileName: fileObject.name
        }
        let extension = fileObject.name.split('.').pop();
        this.uploadImageOrVideo(param, 'Video', 'SupportingImage', (result) => {
            if (result['success']) {
                let data = {
                    selectedFile: responseMedia,
                    selectedIndex: imgIndex,
                    fileInfo: result.data,
                    callback: (resMedia) => { }
                }
                callback(data);
            }
        });
    }

    checkUploadVideoSize(fileObj) {
        let fileSize = formatBytes(fileObj.size, 0);
        if (fileSize.size > 100 && (fileSize.unit == 'MB' || fileSize.unit == 'GB')) {
            return true;
        } else {
            return false;
        }
    }

    getLargeUploadModelConfig(resMedia, index, fileObj) {
        let modalConfig = {
            "btnMessage": 'Upload',
            "btnClose": 'Cancel',
            "modelSectionSwitch": 'upload_large_file_warn',
            "modelMessage": "You are trying to upload a large file and it might take a longer time. For the best experience we suggest to keep the file size under 100 MB.",
            "resMedia": resMedia,
            "index": index,
            "fileObj": fileObj
        };
        return modalConfig;
    }

    // End
}

