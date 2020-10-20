export class ReportsModel {
    isReportLoaded: boolean = false;
    FPReportExcelFilePath: string = "";
    LastUpdatedFPReportExcelFile: string = "";
    runButtonCSSArray: any;
    runButtonClass: string = '';
    selectedPlaylist: any;
    classList: any = [];
    standardPlaylist: any = [];
    familyPlaylist: any = [];
    usageReportSelect: any;
    isNoAssignedPlaylist: boolean = false;
    showLoader: boolean = false;
    showStudentReport: boolean = false;
    teacherName: string = '';
    isArchived: boolean = false;
    classCount: any;
    classOptions: any = [];
    inputParam: any;
    isPremiumUser: boolean = isPremiumUser;
    singleDropdownSettings: any;
    classDropdownSettings: any;
    
    constructor() {        
        this.usageReportSelect = [{ value: "Activity Usage Report", name: "Activity Usage Report" }];
        this.runButtonCSSArray = { btnenable: 'run-new-report-btn', btndisable: 'run-new-report-btn-disabled', btnRefresh: 'run-new-report-btn-refresh' };
        this.selectedPlaylist = { playlistId: '0', playlistName: '', reportType: '', playlistView: '' };
        this.classCount = { active: 0, archived: 0 };
        this.runButtonClass = this.runButtonCSSArray.btndisable;
        this.singleDropdownSettings = {
            pullRight: false,
            enableSearch: false,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-default',
            selectionLimit: 0,
            closeOnSelect: false,
            showCheckAll: false,
            showUncheckAll: false,
            dynamicTitleMaxItems: 4,
            maxHeight: '600px',
            maxWidth: '300px',
            multiSelect: false,
            ellipsisCount: 100
        }
        
        this.classDropdownSettings = {
            pullRight: false,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-default',
            selectionLimit: 0,
            closeOnSelect: false,
            showCheckAll: true,
            showUncheckAll: false,
            dynamicTitleMaxItems: 4,
            maxHeight: '350px',
            maxWidth: '300px',
        };        
    }

    clearSelectedPlaylists() {
        this.selectedPlaylist = { playlistId: '0', playlistName: '', reportType: '', playlistView: '' };
        this.runButtonClass = this.runButtonCSSArray.btndisable;
    }

    clearSelectedClass() {
        this.classList = [];
        this.showStudentReport = false;
        this.runButtonClass = this.runButtonCSSArray.btndisable;
    }

    clearIndivisualClass(index) {
        this.classList.splice(index, 1);
        if (this.classList.length == 0) {
            this.runButtonClass = this.runButtonCSSArray.btndisable;
        }
    }

    runUsageReport() {

    }

    bindFileDownloadValues(fileData) {
        this.FPReportExcelFilePath = fileData.ExcelFilePath;
        this.LastUpdatedFPReportExcelFile = fileData.LastUpdatedOn;
        this.teacherName = fileData.TeacherName;
    }

    createSelectedPlaylist(id, reportType, playlistTitle, playlistName, assignedBy) {
        return { playlistId: id, playlistName: playlistTitle, reportType: reportType, playlistView: playlistName, assignedBy: assignedBy };
    }

    setRunReportButtonCSS() {
        if ((this.selectedPlaylist['playlistId'] != 0 || this.selectedPlaylist['reportType'] == 'usage') && this.classList.length > 0) {
            this.runButtonClass = this.runButtonCSSArray.btnenable;
            this.showStudentReport = false;
        } else {
            this.runButtonClass = this.runButtonCSSArray.btndisable;
        }
    }
}

export class AssessmentReportsVM  {
    assessments: any = [];
    selectedAssessment: string = '';
    isPlaylistTaskShow: boolean = false;
    singleSelectedDropdownSettings: any;
    showAssessmentView: boolean = false;
    inputParam: any = [];
    DefaultText: any;
    
    constructor() {
        this.singleSelectedDropdownSettings={
            pullRight: false,
            enableSearch: false,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-default',
            selectionLimit: 0,
            closeOnSelect: true,
            showCheckAll: false,
            showUncheckAll: false,
            dynamicTitleMaxItems: 3,
            maxHeight: '310px',
            maxWidth: 'inherit',
            multiSelect: false,
            ellipsisCount: 100
        };
        this.DefaultText = {
            defaultTitle: '',
        };
    }
}

export class MyFamilyPlReportStudentDataModel {
    ExplorationResponse: string = '';
    FeedbackResponses: string = '';
    FirstName: string = '';
    HasContactPreference: boolean = false;
    Id: string = '';
    IsLearnCompleted: boolean = false;
    IsParcticeCompleted: boolean = false;
    LastName: string = '';
    UserName: string = '';
    submitType: string = 'text';
    isSelected: boolean = false;
	charactersLeft: number = 120;
    learnData: any = [];
    practiceData: any = [];
    checkpointData: any = [];
    IsFeedbackSubmitted: boolean = false;
    UserContentActivityId: string = '';
    ExplorationResponseMedia: any = [];
    isShowMore: boolean = false;
    feedbackSubmittedOn: string = '';
    checkImageInResponse: boolean = false;
    detectedLanguage: string;
    tempTranslatedFeedbackText: string;
    translatedReponse: string;
    isExplorationSelected: boolean = false;
    isFeedbackSelected: boolean = false;
    isStudentSelected: boolean = false;
    showOriginalMessage = false;
    showHideText = 'Show';
    explorationSubmittedOn: string = '';
    teacherFeedbackInfo: any = [];
    feedbackNotSentData: any = {};
    fFDetectedLanguage: string = '';
    nextReminderdate: string = '';
    showRemindNowBtn: boolean = true;
    remindNowTime: string = '';

    constructor(valueSt, familyReportView) {
        if (valueSt.TeacherFeedbackInfo.length > 0) {
            valueSt.TeacherFeedbackInfo.forEach((feedback) => {
                let feedbackObj = {};
                this.setDetectedLang(feedback.DetectedLanguage, feedbackObj);
                this.setFeedbackProperties(feedback, feedbackObj);
                this.setTeacherCommentStatus(feedback, feedbackObj, familyReportView);
                if (feedbackObj['TeacherCommentStatus'] == 'Not Sent' || !feedbackObj['TeacherFeedback']) {
                    this.feedbackNotSentData = feedbackObj;
                } else {
                    this.teacherFeedbackInfo.push(feedbackObj);
                }
            });
        } else {
            this.feedbackNotSentData = this.getEmptyFeedbackModel(valueSt);
        }
        if (Object.keys(this.feedbackNotSentData).length == 0) { // for checking if object is an empty object
            this.feedbackNotSentData = this.getEmptyFeedbackModel(valueSt);
        }
        this.translatedReponse = valueSt.TranslatedReponse;
        this.ExplorationResponse = valueSt.ExplorationResponse;
        this.ExplorationResponseMedia = valueSt.ExplorationResponseMedia;
        this.FeedbackResponses = valueSt.FeedbackResponses;
        this.FirstName = valueSt.FirstName;
        this.HasContactPreference = valueSt.HasContactPreference;
        this.Id = valueSt.Id;
        this.IsLearnCompleted = valueSt.IsLearnCompleted;
        this.IsParcticeCompleted = valueSt.IsParcticeCompleted;
        this.LastName = valueSt.LastName;
        this.UserName = valueSt.UserName;
        this.feedbackSubmittedOn = valueSt.FeedbackSubmittedOn;
        this.explorationSubmittedOn = valueSt.ExplorationSubmittedOn;
        this.submitType = valueSt.ResponseType;
        this.checkpointData = valueSt.CheckResponses;
        this.learnData = valueSt.Learn;
        this.practiceData = valueSt.Practice;
        this.IsFeedbackSubmitted = valueSt.IsFeedbackSubmitted;
        this.UserContentActivityId = valueSt.UserContentActivityId;
        this.nextReminderdate = valueSt.ReminderDate;
        if (!this.fFDetectedLanguage) {
            this.fFDetectedLanguage = "English";
        }
        if (valueSt.FFDetectedLanguage) {
            let langFilter = reportLangJson.filter(data => data.id == valueSt.FFDetectedLanguage);
            if (langFilter && langFilter.length > 0)
                this.fFDetectedLanguage = langFilter[0].userLang;
        }
        if (valueSt.IsFeedbackSubmitted || !valueSt.ShowRemind) {
            this.showRemindNowBtn = false;
        }
    }

    getEmptyFeedbackModel(studentObj) {
        let feedback = {};
        this.setDetectedLang(studentObj.DetectedLanguage, feedback);
        feedback['charactersLeft'] = 120;
        feedback['FeedbackId'] = 0;
        feedback['TranslatedFeedback'] = '';
        feedback['TeacherFeedback'] = '';
        feedback['TeacherCommentStatus'] = '';
        feedback['showResponseTextBox'] = true;
        feedback['sentDateChkboxClick'] = true;
        feedback['isSelected'] = false;
        return feedback;
    }

    setDetectedLang(detectedLanguage, feedbackObj) {
        if (!this.detectedLanguage) {
            this.detectedLanguage = "English";
        }
        if (detectedLanguage) {
            let langFilter = reportLangJson.filter(data => data.id == detectedLanguage);
            if (langFilter && langFilter.length > 0)
                this.detectedLanguage = langFilter[0].userLang;
        }
        if (this.detectedLanguage != 'English')
            feedbackObj['showHideTranslatedText'] = "Show translated message";
    }

    setFeedbackProperties(feedback, feedbackObj) {
        feedbackObj['TranslatedFeedback'] = feedback.TranslatedFeedback;
        feedbackObj['TeacherFeedback'] = feedback.TeacherFeedback;
        feedbackObj['FeedbackId'] = feedback.FeedbackId;
        feedbackObj['FeedbackSendOn'] = feedback.FeedbackSendOn;
        feedbackObj['charactersLeft'] = 120;
        feedbackObj['charactersLeft'] = feedback.TeacherFeedback ? 120 - parseInt(feedback.TeacherFeedback.length) : 120;
    }

    setTeacherCommentStatus(feedback, feedbackObj, familyReportView) {
        if (!feedback.TeacherFeedback) {
            feedbackObj['TeacherCommentStatus'] = '';
            feedbackObj['showResponseTextBox'] = true;
            feedbackObj['sentDateChkboxClick'] = true;
            feedbackObj['isSelected'] = false;
        } else if (feedback.TeacherFeedback != '' && (!feedback.FeedbackSendOn)) {
            feedbackObj['TeacherCommentStatus'] = 'Not Sent';
            feedbackObj['showResponseTextBox'] = false;
            feedbackObj['sentDateChkboxClick'] = true;
            feedbackObj['isSelected'] = true;
            familyReportView.studentsChecked++;
        } else if (feedback.TeacherFeedback != '' && feedback.FeedbackSendOn) {
            feedbackObj['TeacherCommentStatus'] = 'Scheduled to be sent';
            feedbackObj['showResponseTextBox'] = false;
            feedbackObj['sentDateChkboxClick'] = false;
            let checkDate = validatePreviousDate(feedback.FeedbackSendOn);
            if (checkDate == false) {
                feedbackObj['TeacherCommentStatus'] = 'Sent';
            }
        }
    }
}

export class FamilyReportView {
    studentsChecked: number = 0;
    studentSelectionType: any = 0;
    showloader: boolean = false;
    familyPopupType: string = '';
    isFamilyPopup: boolean = false;
    selectedStudent: any;
    isSingleStudent: boolean = false;
    isWholeReport: boolean = true;
    selectAllStatus: boolean = false;
    headingInfo: string = '';
    toolTip: boolean = false;
    title: string = '';
    singleStudentData: any;
    setTooltipStyle: number = 0;
    disableSend: boolean = true;
    tableReqWidth: any;
    tableWidthClass: string = '';
    showGoogleTranslateTooltip: boolean;
    googleTranslateStyle: any;
    showcheckpointReport: boolean;
    chkHeaderText: string;
    showMoreTopPos: string;
    showSendPopup: boolean = false;
    showLoadingOverlay: boolean = false;
    sortByDate: boolean = false;
    tableHeaderPos: any = 0;
    isShareHighlightSelected: boolean = false;
    openFRSharePopup: boolean = false;
    hideFRSharePopup: boolean = false;
    isPrintSelected: boolean = false;
    showStudentReport: boolean = false;
    printFullReport: boolean = false;
    printStudentReport: boolean = false;

    studentTypeList = [
        { name: 'All Students', value: '0', id: '0' },
        { name: 'Not Started', value: '4', id: '1' },
        { name: 'In Progress', value: '5', id: "2" },
        { name: 'Submitted with Family Feedback', value: '1', id: "3" }
    ];

    sortTypeList = [
        { name: 'Student Name', value: false, id: '0' },
        { name: 'Date Submitted', value: true, id: '1' },
    ];

    highlightPropertyMap = {
        'Exploration': ['isExplorationSelected', 'isSelectAllExploration', 'familyExplorationResponses'],
        'Feedback': ['isFeedbackSelected', 'isSelectAllFeedback', 'familyFeedbackResponses'],
        'Student': ['isStudentSelected', 'isSelectAllStudent', 'studentLists']
    }

    familyPieChart: any = {
        gui: {
            "context-menu": {
                "button": {
                    "visible": 0
                }
            },
            "behaviors": [ //default contextMenu behaviors
                {
                    id: "Reload", //built-in id
                    text: "Reload", //default text
                    enabled: "none" //sets visibility to show 
                },
                {
                    id: "SaveAsImage",
                    text: "View as PNG",
                    enabled: "none"
                },
                {
                    id: "DownloadPDF", //built-in id
                    text: "Export PDF",//modified text 
                    enabled: "none" //sets visibility to show
                },
                {
                    id: "DownloadSVG",
                    enabled: "none"
                },
                {
                    id: "Print",
                    enabled: "none"
                },
                {
                    id: "ViewSource", //built-in id 
                    enabled: "none" //sets visibility to hide
                },
                {
                    id: "About ZingChart", //removed with licensing
                    enabled: "none" //sets visibility to hide
                }
            ]
        },
        globals: {
            fontFamily: "MuseoSans-700"
        },
        "scale": {
            "size-factor": 0.65,
        },
        backgroundColor: "transparent",
        placement: "in",
        plot: {
            refAngle: 270,
            detach: false,
            "slice": 55,
            "shadow": 0,
            "tooltip": {
                visible: false
            },

            valueBox: {
                fontColor: "white",
                fontSize: 0,
                connector: {
                    lineColor: "white",
                    lineWidth: 1
                }
            }
        },
        labels: [
            { "x": "45%", "y": "47%", "width": "10%", "text": '', "font-size": 20 },
            { "x": "45%", "y": "55%", "width": "10%", "text": '', "font-size": 14 }
        ],
        series: [],
        type: 'pie'
    };

    teacherDefaultMessages = [
        { id: 0, text: "Glad you enjoyed working together. Keep up the good work!" },
        { id: 1, text: "Outstanding effort! Thank you for completing our Family Playlist." },
        { id: 2, text: "Thank you for your feedback." },
        { id: 3, text: "Thank you for working with [student]. I would love to hear…" },
        { id: 4, text: "PowerMyLearning can help troubleshoot any issues you are having. Please call 844-955-4357." }
    ]

    constructor() {
        this.tableReqWidth = jQuery(window).width() - 70;
        if (jQuery(window).width() >= jQuery(".family-report-main-table").width()) {
            this.tableWidthClass = 'fluid-width';
        }
    }

    getParamObj(selectedPlaylist, assignedStudentIdsWithClassCode, isExportTab) {
        let model = {
            'ReportType': this.studentSelectionType,
            'PlaylistGuid': selectedPlaylist.value,
            'Assignments': assignedStudentIdsWithClassCode,
            'IsSortByFeedbackDate': this.sortByDate
        };
        if (isExportTab)
            model['PlaylistTitle'] = "Family Playlist: " + selectedPlaylist.name;

        return model;
    }

    setToolTip(headingInfo, title, style) {
        this.toolTip = true;
        this.headingInfo = headingInfo
        this.title = title;
        this.setTooltipStyle = style;
    }

    toggleWholeAndSingleReport(isWhole, isSingle) {
        this.isWholeReport = isWhole;
        this.isSingleStudent = isSingle;
    }

    toggleOpenAndHideShare(isOpenFR, isHideFR) {
        this.openFRSharePopup = isOpenFR;
        this.hideFRSharePopup = isHideFR;
    }
}

export class MyFamilyPlStudentDetailedReportModel {
    learnParcticeData: any = [];
    isLearnCompleted: boolean = true;
    learnData: any = [];
    isPracticeCompleted: boolean = true;
    practiceData: any = [];
    checkData: any = [];
    isCheckPointCompleted: boolean = false;
    exploData: any = [];
    feedBackData: any = [];
    isCheckCompleted: any = [];
    className: string = '';
    teacherName: string = '';
    dateSubmitted: any = [];
    studentFirstName: string = '';
    studentLastName: string = '';
    studentUserName: string = '';
    assignedOn: any;
    constructor() {

    }

    setValues(value) {
        this.className = value.ClassName;
        this.teacherName = value.TeacherName;
        this.studentFirstName = value.StudentFirstName
        this.studentLastName = value.StudentLastName
        this.studentUserName = value.StudentUserName
        this.assignedOn = value.AssignedOn;
        for (let i in value.ItemGroupReport) {
            if (i == 'LearnPractice') {
                this.setLearnPractice(value.ItemGroupReport.LearnPractice);
            } else if (i == 'Feedback') {
                if (value.ItemGroupReport.Feedback.DateSubmittedOn != null) {
                    value.ItemGroupReport.Feedback.DateSubmittedOn = moment.utc(value.ItemGroupReport.Feedback.DateSubmittedOn).toDate();
                }
                this.feedBackData.push(value.ItemGroupReport.Feedback);
            } else if (i == 'CheckPoint') {
                this.setCheckPoint(value.StudentId, value.ClassCode, value.ItemGroupReport.CheckPoint);
            } else if (i == 'Exploration') {
                this.exploData.push(value.ItemGroupReport.Exploration);
            }
        }
    }

    setLearnPractice(learnPractice) {
        this.learnParcticeData.push(learnPractice)
        if (this.learnParcticeData.length > 0) {
            this.learnParcticeData[0].forEach((v) => {
                if (v.ItemGroup == 'Learn') {
                    if (!v.Completed) {
                        this.isLearnCompleted = false;
                    }
                    this.learnData.push(v);
                } else {
                    if (!v.Completed) {
                        this.isPracticeCompleted = false
                    }
                    this.practiceData.push(v);
                }
            })
        }
    }

    setCheckPoint(StudentId, ClassCode, checkPoint) {
        checkPoint.forEach((element, index) => {
            let guid = element.MetaData.ContentGuid + '_' + StudentId + '_' + ClassCode;
            let pieModel = JSON.parse(element.Question);
            pieModel['id'] = element.MetaData.ContentGuid + '_' + StudentId + '_' + ClassCode;
            if (element.Container.UserResponse) {
                let ansArr = element.Container.UserResponse.split(',');
                pieModel['session'] = { id: element.MetaData.ContentGuid, value: ansArr };
            }
            this.checkData.push({ guid: guid, pieModel: pieModel, Completed: element.Container.Completed });
            if (!element.Container.Completed) {
                this.isCheckCompleted = false;
            }
        });
    }
}

export class AssesmentReportDetail {
    saveDataPopup: boolean = false;
    attachmentPopup: boolean = false;
    showMediaIndexChkpnt: number = 0;
    showRubric: boolean = false;
    selectedStudentId: string = '';
    sendFeedback: boolean = false;
    savedFeedback: boolean = false;
    savedScore: boolean = false;
    toggleAnswerChoice: boolean = false;
    showQuestion: boolean = false;
    tinymceEditorConfig: any;

    guid: any;
    pieModel: any = [];
    pieResponseModel: any;
    popupQuestionInteractionType: any;
    selectStudentAnswer: any = [];
    makeDisable: boolean = false;
    painterroData: any;
    userName: string;

    mediaScreenShotChkpoint: boolean = false; // used in community task type detail report
    chkpntImgesToDisplay: any; // used in community task type detail report
    constructor() {
        this.tinymceEditorConfig = {
            toolbar1: "bold italic underline | removeformat | bullist numlist | equationeditor | outdent indent",
            plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
            content_css: ['/Content/tinymce_custom_content.css', '/Content/custom-fonts.css', '/Content/mathquill.css', '/Content/equation_editor.css'],
            paste_as_text: false,
            autoresize_min_height: 100,
            height: 100,
            custom_image_button_visible: true,
            placeholder_class: { 'color': '#999', 'margin': '0px', 'font-style': 'italic' },
            content_class: { 'color': '#000' },
            hide_toolbar: false,
            allow_image_paste: true,
            element_name: 'eduFeedBack'
        };
        if (typeof userName != 'undefined')
            this.userName = userName;
    }
    setPainterroDataAttachment(educatorAssessementTabDetail, showSaveButton) {
        this.painterroData = {
            responseMedia: educatorAssessementTabDetail.selectedResponseMedia,
            imgIndex: educatorAssessementTabDetail.showMediaIndex,
            header: educatorAssessementTabDetail.selectedUserName,
            isReadOnly: true,
            isHttp: false,
            hasSaveButton: true,
            showFooter: false,
            showNavigation: true,
            showPrintButton: true
        };
        this.painterroData['hasSaveButton'] = showSaveButton;
        this.attachmentPopup = true;
    }

    bindMultipleChoiceModelPopup(detail, index, questionData, contentGuid) {
        this.pieResponseModel = JSON.parse(questionData);
        this.pieResponseModel['id'] = 'pie_mc_render_' + this.guid;
        if (detail.SavedResponse) {
            let res = detail.SavedResponse.split(',');
            this.pieResponseModel['session'] = { id: contentGuid, value: res };
        }
    }

    bindPieModelPopup(detail, index, questionData) {
        this.pieResponseModel = JSON.parse(questionData);
        this.selectStudentAnswer = detail;
        this.selectStudentAnswer['index'] = index;
        this.pieResponseModel['id'] = 'categ' + this.guid;
        this.pieResponseModel['session'] = { 'id': this.pieResponseModel['id'], 'answers': JSON.parse(detail.SavedResponse) };
    }
}

export class AssesmentReportView {
    tabsData: any = [];
    selectedId: number = 0;
    selectedAssessmentId: number = 0;
    showClassRpt: boolean = false;
    tabType: string = '';
    activeTabButton: string = '';
    displayColumnSlider: number = 0;
    dispalyIndex: number = 0
    TaskInteractionType: string = '';
    TaskType: string = '';
    minPercent: number = 60;
    maxPercent: number = 80;
    assessmentDetail: any = {};
    isReportLoaded: boolean = false;
    graphid: string = "graph-view";
    statusChartData: any =
        {
            gui: {
                "context-menu": {
                    "button": {
                        "visible": 0
                    }
                },
                "behaviors": [ //default contextMenu behaviors
                    {
                        id: "Reload", //built-in id
                        text: "Reload", //default text
                        enabled: "none" //sets visibility to show 
                    },
                    {
                        id: "SaveAsImage",
                        text: "View as PNG",
                        enabled: "none"
                    },
                    {
                        id: "DownloadPDF", //built-in id
                        text: "Export PDF",//modified text 
                        enabled: "none" //sets visibility to show
                    },
                    {
                        id: "DownloadSVG",
                        enabled: "none"
                    },
                    {
                        id: "Print",
                        enabled: "none"
                    },
                    {
                        id: "ViewSource", //built-in id 
                        enabled: "none" //sets visibility to hide
                    },
                    {
                        id: "About ZingChart" //removed with licensing
                    }
                ]
            },
            globals: {
                fontFamily: "MuseoSans-700"
            },
            "scale": {
                "size-factor": 0.65,
            },
            backgroundColor: "transparent",
            placement: "in",
            plot: {
                refAngle: 270,
                detach: false,
                "slice": 55,
                "shadow": 0,
                "tooltip": {
                    visible: false
                },

                valueBox: {
                    fontColor: "black",
                    fontSize: 16,
                    visible: false,
                    connector: {
                        lineColor: "black",
                        lineWidth: 1
                    }
                }
            },
            labels: [
                { "x": "45%", "y": "47%", "width": "10%", "text": "", "font-size": 24 },
                { "x": "45%", "y": "55%", "width": "10%", "text": "", "font-size": 14 }
            ],
            series: [],
            type: 'pie'

        };
    summaryData: any = [];
    summaryDataScore: any = [];
    priceSlider = {
        min: 60,
        max: 80,
        ceil: 100,
        floor: 0
    };
    priceRange = [this.minPercent, this.maxPercent];
    summaryDataScorePLContent: any = [];
    tabChartData: any = {
        "gui": {
            "context-menu": {
                "button": {
                    "visible": 0
                }
            },
            "behaviors": [ //default contextMenu behaviors
                {
                    id: "Reload", //built-in id
                    text: "Reload", //default text
                    enabled: "none" //sets visibility to show 
                },
                {
                    id: "SaveAsImage",
                    text: "View as PNG",
                    enabled: "none"
                },
                {
                    id: "DownloadPDF", //built-in id
                    text: "Export PDF",//modified text 
                    enabled: "none" //sets visibility to show
                },
                {
                    id: "DownloadSVG",
                    enabled: "none"
                },
                {
                    id: "Print",
                    enabled: "none"
                },
                {
                    id: "ViewSource", //built-in id 
                    enabled: "none" //sets visibility to hide
                },
                {
                    id: "About ZingChart" //removed with licensing
                }
            ]
        },
        globals: {
            fontFamily: "MuseoSans-700"
        },
        "scale": {
            "size-factor": 0.65,
        },
        backgroundColor: "transparent",
        plot: {
            refAngle: 264,
            detach: false,
            "slice": 55,
            "shadow": 0,
            "tooltip": {
                visible: false
            },

            valueBox: {
                fontColor: "black",
                visible: false,
                fontSize: 16,
                connector: {
                    lineColor: "black",
                    lineWidth: 1
                },

                rules: [{ rule: "%v > 3 ", placement: "in", offsetR: 1 },
                { rule: "%v ==100", placement: "in", "ref-angle": 240, offsetR: 0 },
                { rule: "%v == 0", placement: "", offsetR: 1, visible: false },
                { rule: "%v < 3", placement: "out" }]

            }
        },
        labels: [
            { "x": "45%", "y": "47%", "width": "10%", "text": '', "font-size": 24 },
            { "x": "45%", "y": "55%", "width": "10%", "text": '', "font-size": 14 }
        ],
        series: [],
        type: 'pie'
    };
    constructor() {

    }
    dataForTabChart(inputConfig, taskGuid, questionGuid) {
        let modal = {
            ChartType: 'OverviewScore',
            EducatorCharts: [{
                MinPercentage: 0,
                MaxPercentage: this.priceSlider.min == 0 ? 0 : this.priceSlider.min - 1,
                RangeColor: '#FF9097'
            }, {
                    MinPercentage: this.priceSlider.min,
                    MaxPercentage: this.priceSlider.max - 1,
                RangeColor: '#ffde84'
            }, {
                    MinPercentage: this.priceSlider.max,
                MaxPercentage: 100,
                RangeColor: '#c4f0ac'
            }],
            classesInfo: inputConfig['classesInfo'],
            PlaylistGuid: inputConfig['playlistGuid'],
            ContentGuid: taskGuid,
            QuestionGuid: questionGuid
        }
        return modal;
    }

    dataForScoreChart(inputConfig) {
        let modal = {
            ChartType: 'OverviewScore',
            classesInfo: inputConfig['classesInfo'],
            PlaylistGuid: inputConfig['playlistGuid'],
            ContentGuid: inputConfig['AssessmentGuid'],
            educatorCharts: []
        }
        if (this.priceSlider.min == 0) {
            modal.educatorCharts.push({ RangeColor: '#FF9097 ' });
        } else {
            modal.educatorCharts.push({ MinPercentage: 0, MaxPercentage: this.priceSlider.min - 1, RangeColor: '#FF9097 ' });
        }
        if (this.priceSlider.min == this.priceSlider.max) {
            modal.educatorCharts.push({ RangeColor: '#ffde84 ' });
        } else {
            modal.educatorCharts.push({ MinPercentage: this.priceSlider.min, MaxPercentage: this.priceSlider.max - 1, RangeColor: '#ffde84' });
        }
        if (this.priceSlider.max == 100) {
            modal.educatorCharts.push({ RangeColor: '#c4f0ac ' });
        } else {
            modal.educatorCharts.push({ MinPercentage: this.priceSlider.max, MaxPercentage: 100, RangeColor: '#c4f0ac' });
        }
        return modal;
    }

    setScoreAndStatusChart(isScoreChart, val, data, assesmentReport) {
        if (isScoreChart) {
            if (val == 0) {
                this.priceRange = [60, 80];
                this.priceSlider.min = 60;
                this.priceSlider.max = 80;
            }
            if (this.summaryDataScore.length !== 0) {
                this.summaryDataScore = [];
            }
            let chartData = {};
            chartData = Object.assign(chartData, this.statusChartData);
            this.statusChartData = chartData;
        } else {
            if (this.summaryData.length !== 0) {
                this.summaryData = [];
            }
        }
        if (this.statusChartData.series.length !== 0) {
            this.statusChartData.series = [];
        }
        let obj = data.EducatorCharts;
        obj.forEach((value, key) => {
            let _obj = obj[key];
            let resultPercentage = _obj.ResultPercentage, rangeColor = _obj.RangeColor, displayRange = _obj.DisplayRange;
            let backgroundColor = isScoreChart ? ((rangeColor == null) ? '#BCBCBC' : rangeColor.trim()) : rangeColor;
            this.statusChartData.series.push({
                values: [parseInt(resultPercentage)],
                backgroundColor: backgroundColor,
                text: isScoreChart ? "" : "CFY"
            });
            if (isScoreChart) {
                this.summaryDataScore.push({
                    percentageValue: parseInt(resultPercentage),
                    text: displayRange
                });
            } else {
                this.summaryData.push({
                    percentageValue: parseInt(resultPercentage),
                    text: displayRange
                })
            }
        });
        let labelText0 = 0;
        let labelText1 = "";
        if (isScoreChart) {
            labelText0 = assesmentReport.NumberOfStudents;
            labelText1 = assesmentReport.NumberOfStudents > 1 ? 'Students' : 'Student';
            assesmentReport.scoreEnabledForOverView = true;
        }
        else {
            let count = assesmentReport.NumberOfStudents * assesmentReport.assesmentReportForClasses[0].NumberOfQuestions;
            labelText0 = count;
            labelText1 = count > 1 ? 'Responses' : 'Response'
        }
        this.statusChartData.labels[0].text = labelText0;
        this.statusChartData.labels[1].text = labelText1;
        assesmentReport.loadZingChart = true;
    }

    setTabChart(data, assesmentReport, educatorAssesmentReportDetail, type) {
        let hasMax = "";
        assesmentReport.hasfeelers = false;
        let obj = data.EducatorCharts;
        if (this.summaryDataScorePLContent.length !== 0) {
            this.summaryDataScorePLContent = [];
        }
        if (this.tabChartData.series.length !== 0) {
            this.tabChartData.series = [];
        }
        let chartData = {};
        chartData = Object.assign(chartData, this.tabChartData);
        this.tabChartData = chartData;
        let numberOfStudents = this.showClassRpt ? educatorAssesmentReportDetail.NumberOfStudents : assesmentReport.NumberOfStudents;
        this.tabChartData.labels[0].text = numberOfStudents;
        this.tabChartData.labels[1].text = numberOfStudents > 1 ? 'Students' : 'Student';
        this.tabChartData.plot.valueBox.visible = false;
        if (type == "Open Response") {
            this.openResponseTabChart(data, assesmentReport, educatorAssesmentReportDetail);
        } else {
            this.multipleChoiceTabChart(data, assesmentReport, educatorAssesmentReportDetail, type);
        }
    }

    openResponseTabChart(data, assesmentReport, educatorAssesmentReportDetail) {
        let hasMax = "";
        let obj = data.EducatorCharts;
        data.EducatorCharts.forEach((value, key) => {
            this.tabChartData.series.push({
                values: [parseInt(obj[key].ResultPercentage)],
                backgroundColor: (obj[key].RangeColor == null) ? '#BCBCBC' : obj[key].RangeColor.trim(),
                text: ""
            });
            if (parseInt(obj[key].ResultPercentage) == 100) {
                assesmentReport.hasfeelers = false;
                this.tabChartData.plot.refAngle = 270;
            }
            this.summaryDataScorePLContent.push({
                percentageValue: parseInt(obj[key].ResultPercentage),
                text: obj[key].DisplayRange
            })
        });
        this.setTabChartGraphValues("graph-view", "-190px", "3px", assesmentReport);
    }
  
    multipleChoiceTabChart(data, assesmentReport, educatorAssesmentReportDetail, type) {
        let hasMax = "";
        let obj = data.EducatorCharts;
        if (data.ChartType == 3) {
            assesmentReport.isCheckboxType = false;
            if (data.EducatorCharts.length > 5)
                assesmentReport.twoColLegendReq = true;
            else
                assesmentReport.twoColLegendReq = false;
            data.EducatorCharts.forEach((value, key) => {
                if (parseInt(obj[key].ResultPercentage) == 100) {
                    this.tabChartData.plot.refAngle = 270;
                    assesmentReport.hasfeelers = false
                }
                if (parseInt(obj[key].ResultPercentage) <= 3 && parseInt(obj[key].ResultPercentage) != 0) {
                    assesmentReport.hasfeelers = true;
                }
                this.tabChartData.series.push({
                    values: [parseInt(obj[key].ResultPercentage)],
                    backgroundColor: (obj[key].RangeColor == null) ? '#BCBCBC' : obj[key].RangeColor.trim(),
                    valueBox: {
                        text: (obj[key].ResultSymbol == "NS") ? " " : obj[key].ResultSymbol
                    }
                });
                this.summaryDataScorePLContent.push({
                    percentageValue: obj[key].ResultSymbol + "   " + parseInt(obj[key].ResultPercentage),
                    text: obj[key].DisplayRange,
                    IsCorrectResponse: obj[key].IsCorrectResponse,
                });
            });
        }
        if (data.ChartType == 4) {
            assesmentReport.isCheckboxType = true;
            assesmentReport.twoColLegendReq = false;
            data.EducatorCharts.forEach((value, key) => {
                this.tabChartData.series.push({
                    values: [parseInt(obj[key].ResultPercentage)],
                    backgroundColor: (obj[key].RangeColor == null) ? '#BCBCBC' : obj[key].RangeColor.trim(),
                    text: ""
                });
                if (parseInt(obj[key].ResultPercentage) == 100) {
                    assesmentReport.hasfeelers = false;
                    this.tabChartData.plot.refAngle = 270;
                }
                this.summaryDataScorePLContent.push({
                    percentageValue: parseInt(obj[key].ResultPercentage),
                    text: obj[key].DisplayRange
                })
            });
        }
        if (type == 'Multiple Choice' && assesmentReport.hasfeelers) {
            this.setTabChartGraphValues("graph-view-feelers", "-220px", "-20px", assesmentReport);
        }
        else {
            this.setTabChartGraphValues("graph-view", "-190px", "3px", assesmentReport);
        }
    }

    setTabChartGraphValues(graphid,mcchartValue,answerSummaryValue, assesmentReport) {
        this.graphid = graphid;
        jQuery('.mcchart').css("margin-left", mcchartValue);
        jQuery('.answer-summary').css("margin-left", answerSummaryValue);
        assesmentReport.hasChartDataComplete = true;
        assesmentReport.scoreEnabledForOverView = true;
    }

    bindTabDataQuestionDetails(result, reportDetail, assesmentReportView) {
        let standard = result.Standards;
        if (result.Question) {
            reportDetail['InteractionType'] = result.Question.MetaData.InteractionType;
            reportDetail['IsRubricVisible'] = result.Question.MetaData.IsRubricVisible;
            reportDetail['QuestionGuid'] = result.Question.MetaData.ContentGuid;
            reportDetail['Standards'] = result.Question.MetaData.Standards;
            reportDetail['CorrectChoice'] = result.Question.MetaData.CorrectChoice;
            reportDetail['Prompt'] = reportDetail['questionData'] = result.Question.Question;
            reportDetail['metaData'] = result.Question.MetaData;
            reportDetail['questionTitle'] = result.Question.MetaData.Title;
            standard = result.Question.MetaData.Standards;
        }
        reportDetail['StudentAssignments'] = [];
        result['StudentAssignments'].forEach((assignment) => {
            assignment['isCheckBoxSelected'] = false;
            assignment['sort'] = { column: 'FirstName', descending: false, sortClass: 'sorting_asc' };
            assignment['AssignedStudents'].forEach((value, index) => {
                if (value.StatusDisplayString == 'Complete') {
                    value.isStudentSelected = true;
                } else {
                    value.isStudentSelected = false;
                }
                value.isDisplayFeedbackField = false;
                this.bindImageAndScoreData(value);
            });
            assesmentReportView.isReportLoaded = true;
            reportDetail.StudentAssignments.push(assignment);
        });
        this.assessmentDetail = {
            TaskTitle: result.TaskTitle,
            AverageScore: result.AverageScore,
            AverageUsageTime: result.AverageUsageTime,
            Standards: standard,
            EnableScoring: result.EnableScoring
        }
    }

    bindImageAndScoreData(data) {
        if (data.Response != null) {
            var position = data.Response.indexOf('<img');
            if (position != -1) {
                data['hasImage'] = true;
                this.extractMediaFromResponse(data);
            } else {
                data['hasImage'] = false;
            }
        }
        if (data.ScoreDisplayString != null) {
            var scr = data.ScoreDisplayString.split('/');
            data['percentScore'] = (scr[0] * 100) / scr[1];
        }
    }

    extractMediaFromResponse(data) {
        let thisRef = this;
        if (data.ResponseMedia == null || data.ResponseMedia.length == 0) {
            data.ResponseMedia = [];
        }
        extractMediaFromResponse(data.ResponseMedia, data.Response);
    }

    navigateTableArrow(plId, headers, reportByClass, index1, index2, index3, index4, changeColumnIndex) {
        let parentEle = jQuery("#scrollableTable__" + plId);
        parentEle.find(".toMove_" + plId + "_" + headers[index1].QuestionGuid).hide();
        parentEle.find(".toMove_" + plId + "_" + headers[index2].QuestionGuid).show();
        parentEle.find(".task-previous").hide();
        parentEle.find(".task-next").hide();
        parentEle.find(".move_prev_" + plId + "_" + headers[index3].QuestionGuid).show();
        parentEle.find(".move_next_" + plId + "_" + headers[index4].QuestionGuid).show();
        reportByClass.currectColIndex = reportByClass.currectColIndex + changeColumnIndex;
    }
}

export class AssesmentReport {
    NumberOfStudents: number = 0;
    displayTaskCol: number = 1;
    StatusView: boolean = true;
    scoreEnabledForOverView: boolean = false;

    assesmentReportForClasses: any;
    showLoadingOverlay: boolean = false;
    hasfeelers: boolean = false;
    hasChartDataComplete: boolean = false;
    loadZingChart: boolean = false;
    isNonCSS: any;
    inputParam: any = [];
    isTopTask: boolean;
    twoColLegendReq: boolean = false;
    isCheckboxType: boolean = false;
    constructor() {

    }
}

export class Paginator {

    page: number = 0;
    rowsPerPage: number = 50;
    itemCount: number = 0;

    paginationArray: any = [];

    setPage(page) {
        if (page > this.pageCount()) {
            return;
        }
        this.page = page;
    }

    nextPage() {
        if (this.isLastPage()) {
            return;
        }
        this.page++;
    }

    perviousPage() {
        if (this.isFirstPage()) {
            return;
        }
        this.page--;
    }

    firstPage() {
        this.page = 0;
    }

    lastPage() {
        this.page = this.pageCount() - 1;
    }

    isFirstPage() {
        return this.page == 0;
    }

    isLastPage() {
        return this.page == this.pageCount() - 1;
    }

    pageCount() {
        return Math.ceil(this.itemCount / this.rowsPerPage);
    }

    paginate(input, rowsPerPage) {
        if (!input) {
            return input;
        }
        if (rowsPerPage) {
            this.rowsPerPage = rowsPerPage;
        }
        this.itemCount = input.length;

        this.paginationArray = input.slice((this.page * this.rowsPerPage), ((this.page + 1) * this.rowsPerPage + 1) - 1);

    }

    forLoop(input, start, end) {
        input = new Array(end - start);
        for (var i = 0; start < end; start++ , i++) {
            input[i] = start;
        }
        return input;
    }

}

export class EducatorActivityUsagesReportViewModel {
    displayName: any;
    isReportRunning: boolean = false;
    selectedClassCode: string = '';
    selectedClass: any = {};

    fromDateOptions: any = []; // Contains 'Date Created', 'Today', 'Yesterday', 'Custom'
    toDateOptions: any = [];   // Contains 'Today', 'Yesterday', 'Custom'

    fromDatePickerOption: any = [];
    toDatePickerOption: any = [];

    selectedFromDateOption: number = 0; // Contains 0, 1, 2, 3
    selectedToDateOption: number = 0;  // Contains 0, 1, 2

    fromDate: string = '';
    toDate: string = '';

    ClassActivitySummary: any = [];
    StudentUsageSummary: any = [];

    TopFiveClassActivitySummaryRecords: any = [];

    selectedStudent: any = {};
    selectedStudentUsageSummary: any = [];
    showDateError: boolean = false;

    isSeeMore: boolean = false;
    isMoreStudent: boolean = false;

    studentClassSummarySort = [];

    sort = [];
    modalSort = { column: 'ActivityTitle', descending: false, sortClass: 'sorting_asc' };

    pageLoaderStudentSummary: boolean = false;
    pageLoaderWholeClassSummaryDefault: boolean = false;
    pageLoaderWholeClassSummary: boolean = false;

    modalConfig: any = {};

    isOpenCreateClassPopup: boolean;

    constructor() {
    }

    hoursAndMinsFormat(val) {
        var min = parseInt(val);
        var tip = "This student's usage exceeds 999 h 59 minutes."
        var txt = "...";

        var h = Math.floor(min / 60);
        var m = min % 60;
        txt = h + " h " + m + " min";
        if (h == 0) {
            txt = m + " min";
        }
        if (m == 0) {
            txt = h + " h";
        }

        if (min == -1)
            txt = "0 min";

        if (min == 0) {
            txt = "< 1 min";
        }
        return txt;
    }
}

export class FamilyReportsPopUpVM {// extends UserInfoModel {
    modalConfig: any = {};
    selectTime: string;
    selectZone: string;
    sendDatePickerOptions: any;
    sendDate: any;
    showSendDateError: boolean;
    explorationResponseModel: any = { selectedUserName: '', responseMedia: [], ExplorationResponse: '', showMediaIndex: 0 };
    correctTimeAndZoneArray: any;
    isSendNow: string = 'false';
    sendTime: string = "09";
    sendTimeZone: string = "ET";
    sendDateToSave: any;
    showLoader: boolean = false;
    timeList = sendTimeListArray();
    zoneList = zoneListArray();
    constructor() {
       // super();
    }

    setSendTime(selectedOptions) {
        this.showSendDateError = false;
        this.selectTime = selectedOptions;
        //if (selectedOptions == '01') {
        //    this.isSendNow = 'true';
        //} else {
        //    this.isSendNow = 'false';
        //    this.selectTime = selectedOptions;
        //}
    }

    setSendDateAndTimeZone(dt) {
        let todaysDate = moment().format("dddd MM/DD/YYYY");
        this.sendDate = todaysDate;                
        if (dt != null && dt != '') {
            let sDate = dt.split('T');
            this.sendDate = moment(sDate[0]).format("MM-DD-YYYY");
            let zonetime = sDate[1].split('-');
            this.selectTime = zonetime[0].split(':')[0]
            this.selectZone = returnTimeZone("-" + zonetime[1]);
        }
    }

    validateDate(date) {
        if (validateDate(date.value))
            this.showSendDateError = false;
        else
            this.showSendDateError = true;
    }

    setDefaultTimeAndZone() {
        this.correctTimeAndZoneArray = getCorrectTimeAndZoneValue();
        this.selectTime = this.correctTimeAndZoneArray.SendTime;
        this.selectZone = this.correctTimeAndZoneArray.SendTimeZone; 
    }
}

export class FamilyReportShareModel {
    emailPlaceholder: string = '';
    searchEmail: string = '';
    emailList: any = [];
    isSendCopy: boolean = false;
    emailSubject: string = '';
    isLinkInclude: boolean = true;
    charCountSubject: number = 65;
    emailMessage: string = '';
    schoolDirectoryList: any = [];
    lastEmail: string = '';
    showEmailError: boolean = false;
    showSubjectError: boolean = false;
    viewMode: string = '';
    showEmailList: boolean = false;
    emailValidCount: number = 0;

    constructor() {
        this.emailPlaceholder = 'You can enter multiple email addresses by separating them with a comma.';
    }
}

//Model FamilyReportsVM used in SharedFPPrintAppComponent
export class FamilyReportsVM {// extends UserInfoModel
    selectedPlaylist: any;
    selectedPlaylistContentGuid: string;
    playlists: any = [];
    assignedStudents: any = [];
    checkedStudentIdsWithClassCode: any;
    studentSelectionType: any = 0;
    showStudentSelection: boolean = false;
    showloader: boolean = false;
    runReportShow: boolean = false;
    reportClassCount: string = '';
    viewReportData: any = { chartData: null, headerData: null, tableData: null };
    showLoaderSmall: boolean = false;
    showViewReport: boolean;

    constructor() {
        //super();
    }
}