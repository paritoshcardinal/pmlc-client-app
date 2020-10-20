import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { IMultiSelectSettings } from "shared2.0.1/component/multiselect.component";

export interface ModelConfig {
    isHeaderClose: boolean,
    modelSectionSwitch: string,
    modelHeader: string,
    modelTitle: string,
    btnMessage: string,
    btnClose: string,
    modelMessage: string,
    modelClass: string,
    modelData: any,
    modelErrorMessage: string
}

@Component({
    selector: 'modal-popup',
    templateUrl: '../../../../Template2.0/shared2.0.1/modalpopup/modalpopup.html',
    styleUrls: ['../../../../css/apps/shared2.0.1/modalpopup/modalpopup.css'],
    encapsulation: ViewEncapsulation.None
})

export class ModalPopupComponent {
    @Input() modelConfig: ModelConfig;
    @Output() emitToParent = new EventEmitter<any>();
    showLoadingOverlay: boolean;
    inputFieldData: string;
    dropDownData: string;
    showErrorMsg: boolean = false;
    gradeList: Array<any> = getGradeList();

    modelDropdownSettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: true,
        showCheckAll: false,
        showUncheckAll: false,
        dynamicTitleMaxItems: 6,
        height: '218px',
        maxWidth: '210px',
        multiSelect: false
    };

    ngAfterViewInit() {
        if (this.modelConfig.modelSectionSwitch == 'expanded_image') {
            this.hideLoaderOnImageLoadAndSetDivHeight();
        } 
    }

    close() {
        let switchStmt = this.modelConfig.modelSectionSwitch;
        if (switchStmt == 'add_students' || switchStmt == 'show_class_code' || switchStmt == 'add_student_method') {
            this.navigateRoster();
            return;
        }
        this.emitToParent.emit({ action: "close_modal" });
    }

    deleteClass() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({
            action: "delete_class", callback: () => {
                this.showLoadingOverlay = false;
            }
        });
    }

    archiveRestoreClass() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({ action: "archive_restore_class" });
    }
    resetPassword() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({ action: "reset_staff_password" });
    }
    copyPlaylists() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({
            action: "copy_playlist", callback: () => {
                this.showLoadingOverlay = false;
            }
        });
    }

    setDropDownData(selectedOptions) {
        this.dropDownData = selectedOptions;
    }

    copyCompanion() {
        let thisref = this;
        this.showLoadingOverlay = true;
        this.emitToParent.emit({
            action: "copy_companion",
            data: { courseTitle: this.inputFieldData, courseGrade: this.dropDownData },
            callback: (flag) => {
                thisref.showErrorMsg = flag;
                flag ? this.showLoadingOverlay = false : '';
            }
        });
    }

    unAssignCourseCompanion() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({ action: "un-assign-course-companion" });
    }

    closeForm() {
        this.emitToParent.emit({ action: "close_Form" });
    }

    openPlaywindow() {
        this.emitToParent.emit({ action: "open_playwindow_of_courseCompanion" });
    }

    assignToAllClass() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({
            action: "assign_to_all_class", callback: () => {
                this.showLoadingOverlay = false;
            }
        });
    }

    copyToPersonal() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({
            action: 'COPY_TO_PERSONAL', callback: (flag) => {
                if (!flag) {
                    this.showLoadingOverlay = flag;
                } else {
                    this.showLoadingOverlay = false;
                    this.showErrorMsg = true;
                    this.modelConfig.modelErrorMessage = flag;
                }
            }
        });
    }

    copyAdminPl() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({ action: 'COPY_ADMIN_PLAYLIST' });
    }

    redirectToPersonalPl() {
        this.showLoadingOverlay = true;
        this.emitToParent.emit({ action: 'REDIRECT_TO_PERSONAL' });
    }

    uploadFile() {
        this.emitToParent.emit({ action: "UPLOAD_FILE" });
    }

    addMethod(type) {
        this.emitToParent.emit({ action: type, data: this.modelConfig.modelData });
    }

    navigateRoster() {
        this.emitToParent.emit({ action: 'navigate_roster', data: this.modelConfig.modelData });
    }

    backStep() {
        this.modelConfig.modelHeader = 'Add Students';
        this.modelConfig.btnMessage = '';
        this.modelConfig.btnClose = '';
        this.modelConfig.modelSectionSwitch = 'add_students';
        this.modelConfig.modelMessage = 'How would you like to add students in this class?';
        this.modelConfig.modelClass = 'new-stu-add';
    }

    hideLoaderOnImageLoadAndSetDivHeight() {
        let myImg: any = document.getElementById("main-img");
        this.setZoomImageDivHeight();
        myImg.onload = () => {
            document.getElementById("loader").style.display = 'none';
            if (myImg.width > myImg.height) {
                myImg.classList.add('horizontal-image');
            } else {
                myImg.classList.add('vertical-image');
            }
            document.getElementById("image-container").style.opacity = '1';
        };
    }

    setZoomImageDivHeight() {
        document.getElementById("image-container").style.height = `${document.documentElement.clientHeight - 128}px`; // Here 128 is calculated height of modal header and modeal content box padding and modal margin from top in px
    }

}