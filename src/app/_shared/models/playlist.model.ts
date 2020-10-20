﻿import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { DynamicComponentLoader } from "shared2.0.1/dynamic-component-loader/dynamic-component-loader.service";
import { PieQuestionBankComponent } from "myplaylists2.0.1/questionbank/pie-questionbank.component";
import { LibraryPopupComponent } from 'myplaylists2.0.1/playlists/library.popup.component';
declare function doGTranslate(code);// this method moved to javascript.variable.ts and delete after completing PML-8463
declare var isNonCSSSchool: any;

export class Playlist {
    ContentGuid: string;
    Title: string;
    Name: string;
    MinGrade: number;
    MaxGrade: number;
    ActivitiesCount: number;
    AssessmentCount: number;
    AssignedCount: number;
    AssignmentId: string;
    ClassCode: number;
    ClassName: string;
    ChildUserName: string;
    ChildId: number;
    CategoryMappings: Array<any>;
    DateAssigned: Date;
    IsActive: boolean;
    IsCfyContent: boolean;
    IsNew: boolean;
    MasterTaskGuid: string;
    MasterTaskTitle: string;
    Items: Array<Item>;
    SubjectMetaData: Array<any>;
    Standards: Array<any>;
    Status: string;
    StudentInstruction: string;
    Description: string;
    StudentId: number;
    CourseCompanionLink: any;
    IsOwner: any;
    constructor() {
        this.ContentGuid = null;
        this.SubjectMetaData = null;
    }
}

export class Item {
    ContentGuid: string;
    Title: string;
    Url: string;
    ImagePath: string;
    ItemImagePath: string;
    LanguageSupport: string;
    ContentType: string;
    ContentSubType: string;
    TechnicalArea: string;
    Grade: string;
    ActivityType: string;
    SubjectMetaData: Array<any>;
    Standards: Array<any>;
    WorksOnIpad: boolean;
    ActivityState: string;
    TaskStatus: string;
    InteractionType: number;
    IsUrlExist: boolean;
    IsCfyContent: boolean;
    ContentSource: any;
    FrameType: string;

    constructor() {
        this.ContentGuid = null;
        this.SubjectMetaData = null;
        this.ContentSource = null;
    }
}

export class PlaylistPlayWindowModel {
    selectedItem: any = {};
    selectedIndex: number;
    selectedItemData: any;
    eventData: any;
    viewMode: string;
    views: Array<string> = ['view', 'create', 'edit', 'library', 'defaultView', 'communityPreview', 'respond', 'addActivity'];
    hideLoginPopupOption: boolean;
    noStudentInstructionMsg: string;
    selectedTemplateIndex: number = 0;
    selectedTemplate: any = {};
    actionButton: any;
    modalConfig: any = {};

    constructor() {
        this.hideLoginPopupOption = true;
        this.viewMode = this.views[0];
        this.noStudentInstructionMsg = 'There are currently no instructions for this playlist.';
    }

    setSelectedItem(item, index) {
        this.selectedItem = item;
        this.selectedIndex = index;
    }
}

export class PlaylistPlayWindowUIModel {
    showPlaylistInstruction: boolean;
    itemTitlePublisherVisible: boolean;
    sliderToggleClassName: string;
    addBorderCornerStyleWithTask: any;
    showMoreInfo: boolean;
    showSlider: boolean;
    visibleNextButton: boolean;
    isActivityOrCheckpointCreated: boolean = false;
    isPlaylistTaskCreated: boolean = false;
    modalConfig: any = {};
    isNewTask: boolean = false;
    defultLearnGroupHeaderMessage: string = 'Choose one or more videos or tutorials that will help your students review the target skill. Try using the "Video and Tutorials" filter in our Library, or create and embed your personal video that reflects how you taught the concept in class.';
    defultPracticeGroupHeaderMessage: string = 'Select one or more practice activities to let student apply the skill. Try using the "Practice Games & Interactives" filter in our Library, or, create and embed your own resource.';
    defultCheckGroupHeaderMessage: string = 'Add one or more multiple-choice questions to help students assess their own understanding before moving on to the Family Exploration. Use a question from our Library or create your own.';
    headerMessageForLearn: string = '<strong>Students</strong>, review the activity below to help you learn about this topic.';
    headerMessageForPractice: string = '<strong>Students</strong>, play through the activity below to help you practice this skill.'
    showNoItemScreen: boolean;
    isReviewerReportView: boolean;
    isAnyTaskSubmitted: boolean;
    showCloseWarningPopup: boolean;
    showDlaNotifyPopup: boolean;
    showDlaWarningPopup: boolean;
    showRateWarningPopup: boolean;
    visiblePreviousButton: boolean;
    isAddEditInstruction: boolean = false;
    showQuestionSaveLoader: boolean = false;
    isStudentInstructionEdited: boolean = false;
    playviewOptions = [];

    constructor() {
        this.showPlaylistInstruction = false;
        this.itemTitlePublisherVisible = false;
        this.sliderToggleClassName = "";
        this.addBorderCornerStyleWithTask = {};
        this.showMoreInfo = false;
        this.showSlider = false;
        this.isReviewerReportView = false;
        this.isAnyTaskSubmitted = false;
    }

    setAdminPlayviewOptions(playlist) {
        if (isAdminUser) {
            if (playlist.Status == 'UnPublished') {
                this.playviewOptions = [
                    { label: 'Publish', actionMethod: 'publishPlaylistConfirmationModel', cssClass: 'publish' },
                    { label: 'Copy', actionMethod: 'showCopyPlaylistConfirmationModel', cssClass: 'copy' },
                    { label: 'Reorder', actionMethod: 'enableDisableReorder', cssClass: 'reorder' },
                    { label: 'Delete', actionMethod: 'showDeletePlaylistConfirmationModel', cssClass: 'delete' },
                    { label: 'Mobile Preview', actionMethod: 'previewLink', cssClass: 'preview' }
                ];
            } else if (playlist.Status == 'PendingPublishing' || playlist.Status == 'Active') {
                this.playviewOptions = [
                    { label: 'Unpublish', actionMethod: 'unpublishPlaylistConfirmationModel', cssClass: 'unpublish' },
                    { label: 'Copy', actionMethod: 'showCopyPlaylistConfirmationModel', cssClass: 'copy' },
                    { label: 'Reorder', actionMethod: 'enableDisableReorder', cssClass: 'reorder' },
                    { label: 'Mobile Preview', actionMethod: 'previewLink', cssClass: 'preview' }
                ];
            }
        } else if (playlist.Type == 'Playlist') {
            this.playviewOptions = [
                { label: 'Assign', actionMethod: 'assignPlaylist', cssClass: 'assign-playlist-icon' },
                { label: 'Copy', actionMethod: 'showCopyPlaylistConfirmationModel', cssClass: 'copy' },
                { label: 'Reorder', actionMethod: 'enableDisableReorder', cssClass: 'reorder' },
                { label: 'More Info', actionMethod: 'showPlaylistMoreInfo', cssClass: 'edit' },
                { label: 'Share', actionMethod: 'sharePlaylist', cssClass: 'share' },
                { label: 'Delete', actionMethod: 'showDeletePlaylistConfirmationModel', cssClass: 'delete' },
            ];
        } else if (playlist.Type == 'FamilyPlaylist') {
            this.playviewOptions = [
                { label: 'Assign', actionMethod: 'assignPlaylist', cssClass: 'assign-playlist-icon' },
                { label: 'Copy', actionMethod: 'showCopyPlaylistConfirmationModel', cssClass: 'copy' },
                { label: 'Mobile Preview', actionMethod: 'previewLink', cssClass: 'preview' },
                { label: 'More Info', actionMethod: 'showPlaylistMoreInfo', cssClass: 'edit' },
                { label: 'Share', actionMethod: 'sharePlaylist', cssClass: 'share' },
                { label: 'Delete', actionMethod: 'showDeletePlaylistConfirmationModel', cssClass: 'delete' }
            ];
        }
    }
}

export class CommonPlayWindow {
    playlist: any;
    moreInfoPlaylist: any;
    toolTipList: any;
    userType: string;
    isAdminUser: boolean;
    windowModel: PlaylistPlayWindowModel;
    ui: PlaylistPlayWindowUIModel;
    @ViewChild('questionOutlet', { read: ViewContainerRef }) questionOutlet: ViewContainerRef;
    @ViewChild('libraryOutlet', { read: ViewContainerRef }) libraryOutlet: ViewContainerRef
    public questionpopupFactory: any = null;
    public librarypopupFactory: any = null;
    allLangArray = [];
    selectedGoogleLang: any;
    selecteditem: CurrentItemType = null;
    clickedTileIndex: any = [];
    isAssignPlaylist: boolean;
    showPlMoreInfo: boolean;
    isNonCSS: boolean;

    constructor() {
        this.windowModel = new PlaylistPlayWindowModel();
        this.ui = new PlaylistPlayWindowUIModel();
        this.userType = userType;
        this.isAdminUser = isAdminUser;
        this.allLangArray.push({ 'label': 'Supported Languages', 'value': langJson }, { 'label': 'Other Languages', 'value': homeLanguages });
        this.isNonCSS = isNonCSSSchool;
        this.toolTipList = [];
    }

    countIPadCompatibleActivity() {
        let ipadcount = 0;
        let mobilecount = 0;
        let playlistObj = this.playlist;
        if (typeof playlistObj != 'undefined' && playlistObj.Items) {
            jQuery.each(playlistObj.Items, function (value, key) {
                if (key.WorksOnIpad) {
                    ipadcount = ipadcount + 1;
                }
                if (key.WorksOnMobile) {
                    mobilecount = mobilecount + 1;
                }
            });
        }
        this.playlist.mobileCompatibleCount = mobilecount;
        this.playlist.ipadCompatibleCount = ipadcount;
    }

    updateStandardTileStatus(playlist) {
        let completeCount = 0;
        let totalItem = playlist.Items.length + playlist.TaskCount;
        playlist.Items.forEach((data) => {
            if (data.TaskStatus == 'Viewed' || data.TaskStatus == 'Reviewed' || data.TaskStatus == 'Submitted') {
                completeCount += 1;
            }
        });
        (playlist.TaskStatus == 'Submitted' || playlist.TaskStatus == 'Reviewed') ? completeCount += 1 : '';
        if (completeCount != totalItem && playlist.PlaylistStatus == 'LATE') {
            return 'LATE';
        }
        else if (completeCount == totalItem) {
            return 'COMPLETE';
        }
        else {
            return completeCount + ' of ' + totalItem + ' DONE';
        }
    }

    showPlaylistMoreInfo() {
        this.showPlMoreInfo = true;
        this.isAssignPlaylist = false;
    }

    togglePlaylistInstruction() {
        this.ui.showPlaylistInstruction = this.ui.showPlaylistInstruction ? false : true;
        this.showPlMoreInfo = false;
    }

    scrollTopFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    toggleItemMoreInfo() {
        this.ui.showMoreInfo = this.ui.showMoreInfo ? false : true;
        this.ui.isAddEditInstruction = false;
    }

    getPublisherInfo(item) {
        var s = '(';
        if (item.ContentSource && item.ContentSource.Publisher != null && item.ContentSource.Publisher != '') {
            s = s + item.ContentSource.Publisher;
            if (item.Url != null && item.Url != '') {
                s = s + ', ' + item.Url;
            }
            s = s + ', copyrights maintained by their respective owners)';

        } else {
            if (item.Url != null && item.Url != '') {
                s = s + '' + item.Url;
            }
            s = s + ', copyrights maintained by their respective owners)';
        }
        return s;
    }

    logError(err: any) {
    }

    editPlaylistPopup(playlist) {
        let uiConfig = this.ui.modalConfig;
        uiConfig.showPopUp = !uiConfig.showPopUp;
        uiConfig.playlistIdSelected = playlist;
        if (uiConfig.showPopUp) {
            uiConfig.popUpHeading = "Edit Playlist";
            uiConfig.popUpBody = 'You can only edit a playlist from your "My Playlists" page. Would you like to go there now to edit this playlist?';
            uiConfig.actionBtnToShow = "EditPl";
        }
    }

    goToEditPl() {
        let uiConfig = this.ui.modalConfig;
        uiConfig.showPopUp = false;
        window.location.href = '/educator/myplaylists?playlistguid=' + uiConfig.playlistIdSelected;
    }

    getPublisherInfoStandard(item) {
        let s = '(';
        if (item.ContentSource && item.ContentSource.Publisher != null && item.ContentSource.Publisher != '') {
            s = s + item.ContentSource.Publisher + ', copyrights maintained by their respective owners)';
        } else {
            s = s + 'copyrights maintained by their respective owners)';
        }
        return s;
    }

    loadLibraryDLAQuiz(type, dynamicComponentLoader: DynamicComponentLoader) {
        if (this.libraryOutlet.length == 0) {
            dynamicComponentLoader
                .getComponentFactory<LibraryPopupComponent>('library')
                .subscribe(componentFactory => {
                    this.librarypopupFactory = this.libraryOutlet.createComponent(componentFactory);
                    if (type == 'ItemFromLibrary' || type == 'question_from_library') {
                        this.librarypopupFactory.instance.contentType = (type == 'ItemFromLibrary') ? 'Dla' : 'Quiz';
                        this.librarypopupFactory.instance.displayFrom = "familyPLPlayWindowEducator";
                        this.librarypopupFactory.instance.itemGroup = this.windowModel.selectedItem ? this.windowModel.selectedItem.ItemGroup : '';
                    } else {
                        this.librarypopupFactory.instance.contentType = (type == 'library_activity') ? 'Dla' : 'Quiz';
                        this.librarypopupFactory.instance.isSwitchActivityAction = true;
                    }
                    this.librarypopupFactory.instance.emitToParent.subscribe(event => dynamicComponentLoader.childUpdater.next(event));
                }, error => {
                    console.warn(error);
                });
        } else if (this.libraryOutlet.length > 0) {
            if (type == 'ItemFromLibrary' || type == 'question_from_library') {
                this.librarypopupFactory.instance.contentType = (type == 'ItemFromLibrary') ? 'Dla' : 'Quiz';
                this.librarypopupFactory.instance.displayFrom = "familyPLPlayWindowEducator";
            } else {
                this.librarypopupFactory.instance.contentType = (type == 'library_activity') ? 'Dla' : 'Quiz';
            }
        }
    }

    loadAdminQuestion(dynamicComponentLoader: DynamicComponentLoader, action, itemGroupType) {
        if (this.questionOutlet.length == 0) {
            dynamicComponentLoader
                .getComponentFactory<PieQuestionBankComponent>('question')
                .subscribe(componentFactory => {
                    this.questionpopupFactory = this.questionOutlet.createComponent(componentFactory);
                    this.questionpopupFactory.instance.viewFromPlaylist = true;
                    if (action == "question_from_library") {
                        this.questionpopupFactory.instance.itemGroup = itemGroupType;
                    }
                    this.questionpopupFactory.instance.emitToParent.subscribe(event => dynamicComponentLoader.childUpdater.next(event));
                }, error => {
                    console.warn(error);
                });

        }
    }

    sharePlaylist(plData) {
        let ui = this.ui;
        let modalHead = "Share With Educators:";
        if (plData.Type == 'FamilyPlaylist')
            modalHead = "Share With School Edition Educators:";

        var hosturl = window.location.protocol + '//' + window.location.host + '/educator/pv/';
        let playlistTyps = {
            'Playlist': hosturl + 'myspl' + '/' + plData.ContentGuid,
            'FamilyPlaylist': hosturl + 'myfpl' + '/' + plData.ContentGuid
        };
        hosturl = playlistTyps[plData.Type];

        ui.modalConfig = {
            "isModelOpen": true,
            "modalHeader": modalHead,
            "modalTitle": '',
            "modalSectionSwitch": 'sharePL',
            "showCloseBtn": true,
            "modalClass": 'small-fixed-modal',
            'sharedUrl': hosturl, //window.location.protocol + "//" + window.location.host + '/playlist/' + plData.Name,
            'showCopiedMsg': false
        };
    }

    showCopyPlaylistConfirmationModel(plData) {
        let ui = this.ui;
        ui.modalConfig = {
            "isModelOpen": true,
            "modalHeader": '',
            "modalTitle": '',
            'modalMessage': 'This will copy an editable version of this playlist to your My Playlists page called:',
            "modalSectionSwitch": 'beforeCopy',
            "showCloseBtn": true,
            "modalClass": 'copy-playlist-popUI',
            'plName': 'Copy of ' + plData.Title,
            'copyErrorMesg': null,
            'btnclose': 'Cancel',
            'btnName': 'Copy',
        };
    }

    copyTextToClipboard() {
        let link_url: HTMLInputElement = <HTMLInputElement>document.querySelector(".link-url");
        if (link_url) {
            selectTextboxValue(link_url);
            this.ui.modalConfig['showCopiedMsg'] = true;
            setTimeout(() => {
                this.ui.modalConfig['showCopiedMsg'] = false;
            }, 3000);
        }
    }

    translateByGoogle(key) {
        key == 'en|en' ? doEnglishGTranslate() : doGTranslate(key);
    }

    getChangedGoogleLang() {
        let thisRef = this;
        getChangeGoogleLang(function () { thisRef.selectedGoogleLang = availablePrefferedLanguageJSON[selectedGoogleLang]; });
    }

    /* this method returned the find the item type and id from url return selected item type object*/
    getSelectedItemType(url): any {
        let thisref = this;
        if (thisref.selecteditem === null)
            thisref.selecteditem = new CurrentItemType();
        for (let i = 0; i < thisref.selecteditem.typeList.length; ++i) { // loop through all types of item playlist have
            let a = "/" + thisref.selecteditem.typeList[i].name + "/"; // "/dla/" or "/asm/" etc.
            if (url.indexOf(a) > 0) { // if url have that item type 
                let itemId = url.split(a)[1].split("/")[0]; // split it and get id of that
                thisref.selecteditem.itemInfo.typeName = thisref.selecteditem.typeList[i].name;
                thisref.selecteditem.itemInfo.ItemId = itemId;
                let indx = thisref.playlist.Items.findIndex((val) => { return val.ContentGuid === itemId; }); // get selected item index
                thisref.selecteditem.itemInfo.ItemIndex = (indx < 0 ? 0 : indx) // if id is worng in url and not found then default 0 will go
                thisref.selecteditem.itemInfo.item = thisref.playlist.Items[thisref.selecteditem.itemInfo.ItemIndex]; // get selected item 
                break;
            } else { // if url doesnt have item type the default 
                thisref.selecteditem.itemInfo.ItemIndex = 0;
                thisref.selecteditem.itemInfo.ItemId = "";
                thisref.selecteditem.itemInfo.item = thisref.playlist.Items[0];
            }
        };
        return thisref.selecteditem.itemInfo;
    }

    navigateUrl(router, contentType, contentGuid, data) {
        let currentUrl = router.url;
        let sArr = currentUrl.split("/");
        if (userType == 'student')
            router.navigate([sArr[1], sArr[2], sArr[3], sArr[4], sArr[5], contentType, contentGuid], { state: { parentData: data } });
        else if (userType == 'parent')
            router.navigate([sArr[1], sArr[2], sArr[3], sArr[4], sArr[5], sArr[6], sArr[7], contentType, contentGuid], { state: { parentData: data } });
    }

    onClickItem(router, item, index) {
        if (this.windowModel.selectedItem && (userType == 'student' || this.playlist.AssignmentType === 'FamilyPlaylist'))
            this.addCheckMarkOnDlaAndNote();
        this.windowModel.setSelectedItem(item, index);
        let param = { playlist: this.playlist, item: item, isAlreadyDlaClicked: true, selectedIndex: index };
        if (item.IsInstructionAvailable) {
            param['isAlreadyDlaClicked'] = this.updateItemClickedEvent();
        }
        let itemType = this.playlist.AssignmentType == 'Playlist' ? typeCastingUrl[item.ContentType] : typeCastingUrl[item.ContentType + '_' + item.ItemGroup];
        this.navigateUrl(router, itemType, item.ContentGuid, param);
    }

    addCheckMarkOnDlaAndNote() {
        if (this.windowModel.selectedItem.ContentType == 'Dla' && this.windowModel.selectedItem.TempTaskStatus == 'Viewed') {
            this.windowModel.selectedItem.TaskStatus = this.windowModel.selectedItem.TempTaskStatus;
            delete this.windowModel.selectedItem.TempTaskStatus;
        }
        else if (this.windowModel.selectedItem.ContentType == 'Note' && this.windowModel.selectedItem.TempTaskStatus == 'Viewed') {
            this.windowModel.selectedItem.TaskStatus = this.windowModel.selectedItem.TempTaskStatus;
            delete this.windowModel.selectedItem.TempTaskStatus;
        }
    }

    updateItemClickedEvent() {
        let isAlreadyDlaClicked = (this.clickedTileIndex.findIndex(data => data == this.windowModel.selectedIndex) > -1);
        if (!isAlreadyDlaClicked)
            this.clickedTileIndex.push(this.windowModel.selectedIndex);
        return isAlreadyDlaClicked;
    }
}

export class NoteSModel {

    public PlaylistGuid: string;
    public ContentGuid: string;
    public Title: string;
    public Description: string;
    public ItemGroup: string;

    constructor() {
        this.Title = '';
    }
}

export class NoteSModelUI {
    public charCountNotes: number;
    public errorMsg: string;
    public showError: boolean;
    public isCreateEditActionCancel: boolean;
    public isNotesSavedForAdmin: boolean;
    public isFromEdit: boolean;

    constructor() {
        this.charCountNotes = 70;
        this.errorMsg = 'Please enter a title.';
        this.showError = false;
        this.isCreateEditActionCancel = true;
        this.isNotesSavedForAdmin = false;
        this.isFromEdit = false;

    }

    characterCountForNotes(value: string, maxLength: number) {
        if (value.length <= maxLength) {
            this.charCountNotes = maxLength - value.length;
            return this.charCountNotes;
        }
    }
}

export class FamilyFeedbackItemModel {
    FeedbackItemGuid: string;
    FeedbackPrompt: string;
    FeedbackResponse: string;
    ResponseType: string;
    constructor() {
    }
}

export class FamilyFeedbackUIModel {
    questionConfig: any = [];
    modalConfig: any = {};
    showQuestErr_1: boolean;
    showQuestErr_2: boolean;
    showQuestErr_3: boolean;
    showQuestErr_4: boolean;
    SUBMITT_RESPONSE_WARNING: string = 'Are you sure you want to submit your answer? You will not be able to edit your response after submitting.';
    RESPONSE_SUCCESS: string = 'Your response was submitted successfully!';

    FamilyFeedbackQuestionConfig: any = {
        "FamilyFeedbackTamplet1": {
            QuestionItems: [
                { FeedbackItemGuid: 'flfbq1', FeedbackPrompt: "My child seemed to understand the content of this assignment.", ResponseType: "radio", FeedbackResponse: null },
                { FeedbackItemGuid: 'flfbq2', FeedbackPrompt: "My child and I enjoyed the activity.", ResponseType: "radio", FeedbackResponse: null },
                { FeedbackItemGuid: 'flfbq3', FeedbackPrompt: "This activity helped me understand what my child is learning in school.", ResponseType: "radio", FeedbackResponse: null },
                { FeedbackItemGuid: 'flfbq4', FeedbackPrompt: "Is there anything else you would like to tell ({{teachername}}) about this activity? ", ResponseType: "textarea", FeedbackResponse: null },
                { FeedbackItemGuid: 'flfbq5', FeedbackPrompt: "Please enter your full name:", ResponseType: "text", FeedbackResponse: null }
            ]
        }
    }
    constructor() {
    }

}

export class AssessmentQuestionModel {
    ContentActvityId: any;
    FeedBack: any;
    DisplayScore: any;
    EnableScoring: any;
    Question: any;
    Response: any;
    ResponseMedia: any;
    ResponseLastUpdatedOn: any;
    DateSubmittedOn: any;
    Status: any;
    constructor() {
        this.Question = new QuestionModel();
    }
}

export class QuestionModel {
    InteractionType: any;
    RubricText: any;
    Prompt: any;
    AnswerRationaleChoices: any;
    CorrectChoice: any;
    IsRationaleEnabled: any;
    IsRationaleVisible: any;
    CorrectFeedback: any;
    InCorrectFeedback: any;
    FeedBack: any;
    ContentGuid: any;
}

export enum DeviceType {
    Mobile,
    Desktop,
    Tablet
}
import { ImpersonationModalService } from "shared2.0.1/services/impersonation.modal.service";
export class PlayWindow {
    playlist: any;
    idSubscription: any;
    userType: string;
    isAdminUser: boolean;
    windowModel: PlaylistPlayWindowModel;
    ui: PlaylistPlayWindowUIModel;
    selectedGoogleLang: any;
    clickedTileIndex: any = [];
    selecteditem: CurrentItemType = null;
    viewType: any;
    isSchoolAdmin: boolean;
    isSchoolLibraryContributor: boolean;
    isPremiumUser: boolean;
    isNonCSS: boolean;
    showMoreInfo: boolean;
    impersonateModalService: ImpersonationModalService;
    toolTipList: any;

    constructor(impersonateModalService: ImpersonationModalService) {
        this.windowModel = new PlaylistPlayWindowModel();
        this.ui = new PlaylistPlayWindowUIModel();
        this.userType = userType;
        this.isAdminUser = isAdminUser;
        this.viewType = viewType;
        this.isSchoolAdmin = isSchoolAdmin;
        this.isSchoolLibraryContributor = isSchoolLibraryContributor;
        this.isPremiumUser = isPremiumUser;
        this.isNonCSS = isNonCSSSchool;
        this.impersonateModalService = impersonateModalService;
        this.toolTipList = [];
    }
    
    countIPadCompatibleActivity() {
        let ipadcount = 0;
        let mobilecount = 0;
        let playlistObj = this.playlist;
        if (typeof playlistObj != 'undefined' && playlistObj.Items) {
            jQuery.each(playlistObj.Items, function (value, key) {
                if (key.WorksOnIpad) {
                    ipadcount = ipadcount + 1;
                }
                if (key.WorksOnMobile) {
                    mobilecount = mobilecount + 1;
                }
            });
        }
        this.playlist.mobileCompatibleCount = mobilecount;
        this.playlist.ipadCompatibleCount = ipadcount;
    }

    showPlMoreInfo() {
        this.showMoreInfo = true
        this.ui.showPlaylistInstruction = false;
    }

    openSharePopUp() {
        this.showMoreInfo = false;
        let ui = this.ui;
        let modalMessage = 'Spread the knowledge! This Certified Playlist can be accessed by anyone with a free PowerMyLearning Connect account. Remember, the best way to share a playlist with students is to save a copy and assign it through PowerMyLearning Connect. '

        var hosturl = window.location.protocol + '//' + window.location.host + '/educator/pv/';
        let playlistTyps = {
            'Playlist': hosturl + 'spl' + '/' + this.playlist.ContentGuid,
            'FamilyPlaylist': hosturl + 'fpl' + '/' + this.playlist.ContentGuid
        };
        hosturl = playlistTyps[this.playlist.Type];

        ui.modalConfig = {
            'modalSectionSwitch': 'share',
            'isModelOpen': true,
            'modelHeader': 'Share a Certified Playlist',
            'modalMessage': modalMessage,
            'sharedUrlLink': hosturl, //window.location.protocol + "//" + window.location.host + '/playlist/' + playlist.Name,
            'showCloseLink': true,
            'showCopiedMsg': false
        }
        if (this.playlist.Type === 'FamilyPlaylist') {
            var temp = (this.playlist.IsCfyContent && (isPremiumUser || isAdminUser)) ? "Certified" : "user-created";
            ui.modalConfig['modalMessage'] = "URLs for " + temp + " Family Playlists can only be shared with other School Edition educators. To give students and families access to this content, you can assign this playlist to any student that is enrolled in your class.";
            ui.modalConfig['modelHeader'] = "Share With School Edition Educators";
            if (this.userType != 'educator') {
                ui.modalConfig['modalMessage'] = "Spread the knowledge! This Family Playlist can be accessed by anyone with a free PowerMyLearning Connect account. ";
            }
        }
    }

    copyTextToClipboard() {
        let inputbj = document.getElementById("copyPlLink");
        selectTextboxValue(inputbj);
        this.ui.modalConfig['showCopiedMsg'] = true;
        setTimeout(() => {
            this.ui.modalConfig['showCopiedMsg'] = false;
        }, 3000);
    }

    copyPlaylistPopup() {
        if (this.IsImpersonating())
            return false;
        let ui = this.ui;
        ui.modalConfig = {
            'isModelOpen': true,
            'modalSectionSwitch': 'beforeCopy',
            'modalMessage': 'This will copy an editable version of this playlist to your My Playlists page called:',
            'btnName': 'Copy',
            'btnclose': 'Cancel',
            'showCloseLink': true,
            'plName': this.playlist.IsOwner ? 'Copy of ' + this.playlist.Title : this.playlist.Title,
            'copyErrorMesg': null,
            'plData': this.playlist
        };
    }

    editPlaylist(contentGuid) {
        if (this.IsImpersonating())
            return false;
        window.location.href = "/educator/myplaylists?playlistguid=" + contentGuid;
    }

    closeModelPop() {
        this.ui.modalConfig = {}
    }

    deleteSchoolPlPopup() {
        if (this.IsImpersonating())
            return false;
        let ui = this.ui;
        ui.modalConfig = {};
        ui.modalConfig = {
            'modalSectionSwitch': 'deleteSPl',
            'isModelOpen': true,
            'modelHeader': 'Delete Playlist',
            'modalMessage': 'Are you sure you want to delete this playlist from the school library? Other members of your school will no longer be able to view and copy it.',
            'title': '',
            'btnclose': 'Cancel',
            'btnName': 'Delete',
            'isSchoolPlaylist': false,
            'playlistData': this.playlist,
            'showCloseLink': true
        }
    }

    goToPlaylists() {
        window.location.href = '/educator/myplaylists';
    }

    onClickItem(router, item, index) {
        this.windowModel.setSelectedItem(item, index);
        let param = { playlist: this.playlist, item: item, isAlreadyDlaClicked: true, selectedIndex: index };
        if (item.IsInstructionAvailable) {
            param['isAlreadyDlaClicked'] = this.updateItemClickedEvent();
        }
        let itemType = this.playlist.Type == 'Playlist' ? typeCastingUrl[item.ContentType] : typeCastingUrl[item.ContentType + '_' + item.ItemGroup];
        this.navigateUrl(router, itemType, item.ContentGuid, param);
    }

    navigateUrl(router, contentType, contentGuid, data) {
        let currentUrl = router.url;
        let sArr = currentUrl.split("/");
        let num = sArr.indexOf("ccomp");
        if (num != -1 && !isAdminUser) {
            router.navigate([sArr[1], sArr[2], sArr[3], sArr[4], sArr[5], sArr[6], contentType, contentGuid], { state: { parentData: data } });
        } else if (num != -1 && isAdminUser) {
            router.navigate([sArr[1], sArr[2], sArr[3], sArr[4], sArr[5], contentType, contentGuid], { state: { parentData: data } });
        }
        else {
            router.navigate([sArr[1], sArr[2], sArr[3], contentType, contentGuid], { state: { parentData: data } });
        }
    }

    updateItemClickedEvent() {
        let isAlreadyDlaClicked = (this.clickedTileIndex.findIndex(data => data == this.windowModel.selectedIndex) > -1);
        if (!isAlreadyDlaClicked)
            this.clickedTileIndex.push(this.windowModel.selectedIndex);
        return isAlreadyDlaClicked;
    }

    /* this method returned the find the item type and id from url return selected item type object*/
    getSelectedItemType(url): any {
        let thisref = this;
        if (thisref.selecteditem === null)
            thisref.selecteditem = new CurrentItemType();
        for (let i = 0; i < thisref.selecteditem.typeList.length; ++i) { // loop through all types of item playlist have
            let a = "/" + thisref.selecteditem.typeList[i].name + "/"; // "/dla/" or "/asm/" etc.
            if (url.indexOf(a) > 0) { // if url have that item type 
                let itemId = url.split(a)[1].split("/")[0]; // split it and get id of that
                thisref.selecteditem.itemInfo.typeName = thisref.selecteditem.typeList[i].name;
                thisref.selecteditem.itemInfo.ItemId = itemId;
                let indx = thisref.playlist.Items.findIndex((val) => { return val.ContentGuid === itemId; }); // get selected item index
                thisref.selecteditem.itemInfo.ItemIndex = (indx < 0 ? 0 : indx) // if id is worng in url and not found then default 0 will go
                thisref.selecteditem.itemInfo.item = thisref.playlist.Items[thisref.selecteditem.itemInfo.ItemIndex]; // get selected item 
                break;
            } else { // if url doesnt have item type the default 
                thisref.selecteditem.itemInfo.ItemIndex = 0;
                thisref.selecteditem.itemInfo.ItemId = "";
                thisref.selecteditem.itemInfo.item = thisref.playlist.Items[0];
            }
        };
        return thisref.selecteditem.itemInfo;
    }

    updateStandardTileStatus(playlist) {
        let completeCount = 0;
        let totalItem = playlist.Items.length + playlist.TaskCount;
        playlist.Items.forEach((data) => {
            if (data.TaskStatus == 'Viewed' || data.TaskStatus == 'Reviewed' || data.TaskStatus == 'Submitted') {
                completeCount += 1;
            }
        });
        (playlist.TaskStatus == 'Submitted' || playlist.TaskStatus == 'Reviewed') ? completeCount += 1 : '';
        if (completeCount != totalItem && playlist.PlaylistStatus == 'LATE') {
            return 'LATE';
        }
        else if (completeCount == totalItem) {
            return 'COMPLETE';
        }
        else {
            return completeCount + ' of ' + totalItem + ' DONE';
        }
    }

    togglePlaylistInstruction() {
        this.ui.showPlaylistInstruction = !this.ui.showPlaylistInstruction;
        this.showMoreInfo = false;
    }

    scrollTopFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    editPlaylistPopup(playlist) {
        if (this.IsImpersonating())
            return false;
        let uiConfig = this.ui.modalConfig;
        uiConfig.showPopUp = !uiConfig.showPopUp;
        uiConfig.playlistIdSelected = playlist;
        if (uiConfig.showPopUp) {
            uiConfig.popUpHeading = "Edit Playlist";
            uiConfig.popUpBody = 'You can only edit a playlist from your "My Playlists" page. Would you like to go there now to edit this playlist?';
            uiConfig.actionBtnToShow = "EditPl";
        }
    }

    goToEditPl() {
        let uiConfig = this.ui.modalConfig;
        uiConfig.showPopUp = false;
        window.location.href = '/educator/myplaylists?playlistguid=' + uiConfig.playlistIdSelected;
    }

    copyToPersonalWarn() {
        let vm = this.ui;
        if (!this.IsImpersonating()) {
            if (viewType === "ccomp" && !isAdminUser) {
                vm.modalConfig = {
                    'showPopUp': true,
                    'modelSectionSwitch': 'copy_playlist',
                    'modelMessage': 'This will copy editable versions of the selected playlists to your My Playlists page.',
                    'btnMessage': 'Copy',
                    'btnClose': 'Cancel',
                    'modelData': '',
                    'modelClass': ''
                };
            } else {
                vm.modalConfig = {
                    'showPopUp': true,
                    'modelSectionSwitch': 'copy_to_personal_warn',
                    'modelMessage': 'This will copy an editable version of this playlist to your My Playlists page called:',
                    'btnMessage': 'Copy',
                    'btnClose': 'Cancel',
                    'modelData': this.playlist.Title,
                    'modelClass': 'lib-add-playlist-warn'
                };
            }
        }
    }

    openAdminCopyPopup(callback) {
        let vm = this.ui;
        callback(false);
        let plTitle = vm.modalConfig['modelData']
        vm.modalConfig = {
            'showPopUp': true,
            'modelSectionSwitch': 'admin_copy_pl_warn',
            'modelMessage': 'Are you sure you want to create a duplicate copy of an existing Certified Playlist?',
            'btnClose': 'Cancel',
            'btnMessage': 'Copy',
            'modelClass': 'lib-add-playlist-warn',
            'modelData': plTitle,
        }
    }

    copyEducatorPlaylist(plService, callback) {
        let vm = this.ui;
        let param = { "Guid": this.playlist.ContentGuid, "Title": vm.modalConfig['modelData'] };
        plService.copyPlaylistValidateTitle(param, (data) => {
            if (data.status == "success") {
                callback(false);
                vm.modalConfig = {
                    'showPopUp': true,
                    'modelSectionSwitch': 'copy_to_personal_success_warn',
                    'modelMessage': 'A copy of this playlist has been saved.',
                    'modelData': data.result.Title,
                    'btnClose': 'Close',
                    'btnMessage': 'Edit & Assign',
                    'modelClass': 'lib-add-playlist-warn',
                    'contentGuid': data.result.ContentGuid
                }
            } else {
                callback(data.result[0].Message);
            }
        });
    }

    copyCourseCompPlaylist(libservice, callback, param) {
        let vm = this.ui;
        libservice.copyCourseCompanionPlaylist(param, (data) => {
            if (data['status']) {
                console.log('copyCourseCompanionPlaylist Success');
                vm.modalConfig = {
                    'isHeaderClose': false,
                    'showPopUp': true,
                    'modelSectionSwitch': 'copy_playlist_success',
                    'modelMessage': 'A copy of each playlist has been saved.',
                    'modelData': data.result,
                    'btnClose': 'Close',
                    'btnMessage': 'Go to My Playlists',
                    'modelClass': '',
                    'modelHeader': '',
                }
                callback();
            }
        });
    }
    translateByGoogle(key) {
        key == 'en|en' ? doEnglishGTranslate() : doGTranslate(key);
    }

    getChangedGoogleLang() {
        let thisRef = this;
        getChangeGoogleLang(function () { thisRef.selectedGoogleLang = availablePrefferedLanguageJSON[selectedGoogleLang]; });
    }

    closePlayWindow() {
        let rUrl = window.location.href;
        let ccIndex = rUrl.indexOf("ccomp");
        let urlArray = rUrl.split("/");
        if (ccIndex != -1 && !isAdminUser) {
            window.location.href = '/' + userType + '/coursecompanion/' + urlArray[6] + '/view';
        } else if (ccIndex != -1 && isAdminUser) {
            window.location.href = '/' + userType + '/coursecompanion/' + urlArray[6] + '/edit';
        } else {
            window.location.href = '/' + userType + '/playlist';
        }
    }

    IsImpersonating() {
        let vm = this.ui;
        var impersonating = false;
        this.impersonateModalService.validateImpersonation(isImpersonating => {
            if (isImpersonating == true) {
                impersonating = true;
                vm.modalConfig = {
                    'showPopUp': true,
                    'modelSectionSwitch': 'impersonating',
                    'modalData': { 'message': 'You cannot make changes to this account while impersonating' },
                    'btnMessage': 'Okay',
                    'showCloseLink': true
                };
            }
        });
        return impersonating;
    }

    showCopyPlaylistToSchoolPopup() {
        if (this.IsImpersonating())
            return false;
        let vm = this.ui;
        vm.modalConfig = {
            'isModelOpen': true,
            'modalSectionSwitch': 'editSchoolCopyPlaylist',
            'modalMessage': 'Add a copy of this playlist to your school library.',
            'btnName': 'Copy',
            'btnclose': 'Cancel',
            'showCloseLink': true,
            'plName': this.playlist.Title,
            'copyErrorMesg': null,
            'plData': this.playlist
        };
    }
}

/* class is used for all playlist item types if in future any new type, plz add here in typeList property */
class CurrentItemType {
    typeList: any;
    itemInfo: any;
    constructor() {
        this.typeList = [{ name: "dla" }, { name: "asm" }, { name: "nt" }, { name: "fexp" }, { name: "fbk" }];
        this.itemInfo = { item: null, typeName: null, ItemId: null, ItemIndex: null };
    }

}