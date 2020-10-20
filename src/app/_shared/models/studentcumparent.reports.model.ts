export class CommonUIModel {
    noDataStatus: boolean;
    noDataStatusMessage: string;
    openReport: boolean;
    showLoader: boolean;
    showFinalReport: boolean;
    showSupportingImageFullView: boolean;
    showRating: boolean;
    constructor() {
        this.noDataStatus = false;
        this.noDataStatusMessage = "";
        this.openReport = true;
        this.showLoader = false;
        this.showFinalReport = true;
        this.showSupportingImageFullView = false;
    }    
}

export class GenericReportModel {
    selectedPlaylist: string;
    selectedClass: string;
    playList: Array<any>;
    playListForDisplay: Array<any>; //Array<FamilyPlaylistReportDataModel>;
    isIncludeDeletedChecked: boolean;
    reportTitle: string;
    reportDate: any;

    constructor() {
        this.selectedPlaylist = '';
        this.selectedClass = '';
        this.playList = [];
        this.isIncludeDeletedChecked = false;
        this.reportTitle = '';
        this.playListForDisplay = new Array();
    }
}

export class StudentCumParentReport {

    reportTypeOptions = new Array<any>();
    //PML-7462
    //reportTypeOptionsWithMission = new Array<any>();
    reportTypeOptionsWithoutMission = new Array<any>();
    childList = new Array<any>();
    HasChild: boolean;
    HasConnectionPending: boolean;

    hasFamilyPlaylist: boolean;

    selectedReportType: string;
    hasMission: boolean;
    activeStudent: any;
    selectedChild: string;

    constructor() {
         //PML-7462
        //this.reportTypeOptionsWithMission = [
        //    { name: 'Assessment Report', value: 'stuTaskReport' },
        //    { name: 'Activity Usage Report', value: 'stuUsagereport' },
        //    { name: 'Mission Report', value: 'stuMissionreport' }
        //];
        this.reportTypeOptionsWithoutMission = [
            { name: 'Assessment Report', value: 'stuTaskReport' },
            { name: 'Activity Usage Report', value: 'stuUsagereport' }
        ];
        this.selectedReportType = 'stuTaskReport';
        this.selectedChild = '';
        this.hasMission = false;
        this.HasChild = false;
        this.HasConnectionPending = false;
    }


}

export class StudentCumParentReportUIModel {
    runReportBtnClass: string;
    isReportRunFirstTime: boolean;
    isUsagesReportRunning: boolean;
    isAssessmentReportRunning: boolean;
    isMissionReportRunning: boolean;
    isFamilyPlaylistReportRunning: boolean;
    showAddChild: boolean;
    isServerCallCompleted: boolean;

    constructor() {
        this.runReportBtnClass = "run-report-btn-disabled"; //run-new-report-btn-disabled, run-new-report-btn, run-report-btn
        this.isReportRunFirstTime = true;
        this.isUsagesReportRunning = false;
        this.isAssessmentReportRunning = false;
        this.isMissionReportRunning = false;
        this.isFamilyPlaylistReportRunning = false;
        this.showAddChild = false;
        this.isServerCallCompleted = false;
    }
}

export class ActivityUsagesModel {
    fromDate: any;
    toDate: any;
    dateFormat: string;
    reportTimePeriodOptions = new Array<any>();
    selectedTimePeriod: number;
    studentUsagesReportData: any;
    TotalPeriodUsageTime: number;
    TotalUsageTime: number;
    StudentActivityUsage: Array<any>;

    constructor() {
        this.fromDate = "";
        this.toDate = "";
        this.dateFormat = "dddd MM/DD/YYYY";

        this.reportTimePeriodOptions = [
            { name: 'All Time', value: 0 },
            { name: 'Today', value: 1 },
            { name: 'This Week', value: 2 },
            { name: 'This Month', value: 3 }
        ];
        this.selectedTimePeriod = 0;
        this.TotalPeriodUsageTime = 0;
        this.TotalUsageTime = 0;
        this.StudentActivityUsage = [];
    }

}

export class ActivityUsagesUIModel {    
    reportBlockTitle: string;
    dateRangeError: boolean;
    showPrintReport: boolean;
    showLoader: boolean;

    constructor() {        
        this.reportBlockTitle = "Activity Usage Report";
        this.dateRangeError = false;
        this.showPrintReport = false;
        this.showLoader = false;
    }

}

export class AssessmentReportModel {
    dataToRender: Array<any>;
    selectedTask: any;
    taskList: Array<any>;
    taskListForDisplay: Array<any>;
    isIncludeDeletedTaskChecked: boolean;
    reportTitle: string;
    reportDate: any;
    deletedQuizData: any;
    playWindowConfig: any = {};

    constructor() {
        this.dataToRender = [];        
        this.taskList = [];
        this.taskListForDisplay = [];
        this.isIncludeDeletedTaskChecked = false;
        this.reportTitle = 'My Assessment Report';        
    }

}

export class AssessmentReportUIModel extends CommonUIModel {
    showPlaylistPlayWindow: boolean;
    showPrintReport: boolean;
    showDeletedReport: boolean;
    deletePopupTopPosition: string;
    constructor() {
        super();
        this.noDataStatusMessage = "There are no assessment reports because a Checkpoint or a Playlist Task has not yet been assigned.";
        this.showPlaylistPlayWindow = false;
        this.showPrintReport = false;
        this.showDeletedReport = false;
    }

}

export class FamilyPlaylistReportDataModel {
    FamilyPlaylistGuid: string;
    Title: string;
    ClassName: string;
    ClassCode: string;
    Teacher: any; 
    Status: string;
    AssignedOn: any;
    DueDate: any;
    CompletedOn: any;   
}

export class FamilyPlaylistDetailModel {
    AssignedOn: string;
    ClassName: string;
    CompletedOn: string;
    FamilyPlaylistTitle: string;
    StudentFirstName: string;
    StudentLastName: string;
    StudentUserName: string;
    TeacherName: string;
    ItemGroupReport: FamilyPlaylistDetailItemModel;
    constructor() {
        this.ItemGroupReport = new FamilyPlaylistDetailItemModel();
    }
}

export class FamilyPlaylistDetailItemModel {
    LearnPractice: Array<FamilyPlaylistLearnPracticeModel>;
    CheckPoint: Array<FamilyPlaylistCheckPointModel>;
    Exploration: any; 
    Feedback: any; 
    LearnData: Array<FamilyPlaylistLearnPracticeModel>;
    PracticeData: Array<FamilyPlaylistLearnPracticeModel>;
    IsLearnCompleted: boolean;
    IsPracticeCompleted: boolean;
    IsCheckpointCompleted: boolean;

    constructor() {
        this.LearnPractice = new Array();
        this.CheckPoint = new Array();
        this.Exploration = {}; 
        this.Feedback = {}; 
        this.LearnData = new Array();
        this.PracticeData = new Array();
        this.IsLearnCompleted = true;
        this.IsPracticeCompleted = true;
        this.IsCheckpointCompleted = true;
    }
}

// Family Playlist LearnPractice Model
export class FamilyPlaylistLearnPracticeModel {
    ItemGroup: string;
    ActivityTitle: string;
    Completed: boolean;
    Position: number;
    constructor() {
    }
}

// Family Playlist Checkpoint Model
export class FamilyPlaylistCheckPointModel {
        QuestionGuid: string;
        QuestionPrompt: string;
        IsUpdated: boolean;
        Completed: boolean;
        CorrectResponse: string;
        UserResponse: string;
        KmaPrompt: string;
        KmaResponse: string;
        AnswerRationaleChoice: Array<AnswerChioce>;
        Position: number;
        constructor() {
            this.AnswerRationaleChoice = new Array();
        }
}

export class QuizModel {
    MissionTitle: string;
    FirstName: string;
    UserName: string;
    MissionRating: number;
    AssignedOn: Date;
    CompletedOn: Date;
    ScoreDisplayString: string;
    QuizGuid: string;
    QuizType: string;
    QuestionReport: Array<Question>;
    

    constructor() {
        this.QuestionReport = new Array();
    }
}

export class Question {
    CorrectResponse: string;
    IsKmaItem: boolean;
    IsUpdated: boolean;    
    KmaPrompt: string;    
    KmaResponse: string;    
    QuestionGuid: string;    
    QuestionPrompt: string;    
    UserResponse: string; 
    AnswerChioces: Array<AnswerChioce>;

    constructor() {
        this.AnswerChioces = new Array();
    }  
}

export class AnswerChioce{
    AnswerChoice: string;   
    Percentage: string;
    RationaleChoice: string;
}