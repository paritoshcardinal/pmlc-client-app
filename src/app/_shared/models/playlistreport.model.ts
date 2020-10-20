export class PlaylistReportModel {
    isReviewerPopupOpen: boolean = false;
    openDetailReport: boolean = false;
    constructor() {

    }
}


export class PLDetailedReportModel {
    showPlaylistInstruction: boolean = false;
    showSlider: boolean = false;
    constructor() {

    }
}

export class EducatorAssesmentReportView {
    tabsData: any = [];
    selectedId: number = 0;
    selectedAssessmentId: number = 0;
    assessmentDetail: any = {};
    showClassRpt: boolean = false;
    tabType: string = '';
    activeTabButton: string = '';
    isReportLoaded: boolean = false;
    Standards: number = 0;
    displayColumnSlider: number = 0;
    //slider for tabs
    dispalyIndex: number = 0
    TaskGuid: string = '';
    TaskInteractionType: string = '';
    TaskType: string = '';
    minPercent: number = 60;
    maxPercent: number = 80;
}

export class EducatorAssesmentReport {
    AverageTotalPoints: number = 0;
    AveragePointPercent: number = 0;
    studentDetailData: any;
    TaskData: any = [];
    TopTask: any = [];
    PlaylistGuid: string = '';
    classCode: string = '';
    className: string = '';
    PlaylistTitle: string = '';
    displayTaskCol: number = 1;
    taskDataLength: number = 0;
    ToptaskDataLength: number = 0;
    StatusView: boolean = true;
    AssessmentHeaders: any = [];
    UserQuestionDetails: any;

    constructor() {

    }
}

export class EducatorAssessementTabDetail {
    isCheckBoxSelected: boolean = false;
    selectedResponseMedia: any = [];
    selectedUserName: string = '';
    showMediaIndex: number = 0;
    showErrorMsg: boolean = false;
    textErrorMsg: string = '';
    isReturned: boolean = false;
    assessmentSubmittedDate: any;
    constructor() { }

    showErrorMessage(textErrorMsg) {
        this.showErrorMsg = true;
        this.textErrorMsg = textErrorMsg;
        return false;
    }
}

export class EducatorAssesmentReportDetailModel { //new model for assessment report detail for removing unused variables
    CorrectChoice: string = '';
    EnableScoring: string = '';
    InteractionType: number;
    MaxScore: string = '';
    Prompt: string = '';
    QuestionGuid: string = '';
    TaskGuid: string = '';
    TaskTitle: string = '';
    selectedStundentIdToReturn: any;
    singleFeedBackSave: boolean;
    detail: any;
    selectedIndex: number;
    isClicked: boolean;
    RubricText: string;
    isIpad: any;
    questionData: any;
    metaData: any;
    firstName: string = '';
    questionTitle: string = '';
    StudentAssignments: any = [];
    NumberOfStudents: number;
    classCodeSendFeedback: string = '';
    IsRubricVisible: boolean;
    Standards: any = [];
    QuizTypeString: string = '';
    constructor() { }

    setAnswerStatus(interactionType, setAnswerStatus) {
        this.StudentAssignments.forEach((assignment) => {
            assignment.AssignedStudents.forEach((detail, index) => {
                if (setAnswerStatus) {
                    detail['answerStatus'] = '';
                    if (detail.percentScore == 0) {
                        detail['answerStatus'] = 'Incorrect';
                    } else if (detail.percentScore == 100) {
                        detail['answerStatus'] = 'Correct';
                    } else {
                        detail['answerStatus'] = 'Partially Correct';
                    }
                } else if (!setAnswerStatus && interactionType == 1) {
                    detail['answerStatus'] = detail['Response'] ? detail['Response'] : '';
                }
            });
        });
    }
}

export class EducatorAssesmentReportDetail {
    AnswerRationaleChoices: string = '';
    AssignedStudents: any = [];
    AverageScore: string = '';
    AverageUsageTime: string = '';
    CorrectChoice: string = '';
    CorrectFeedback: string = '';
    EnableScoring: string = '';
    InCorrectFeedback: string = '';
    InteractionType: number;
    MaxScore: string = '';
    Prompt: string = '';
    QuestionGuid: string = '';
    QuizTypeString: string = '';
    Standards: any = [];
    TaskGuid: string = '';
    TaskTitle: string = '';
    selectedStundentIdToReturn: any;
    singleFeedBackSave: boolean;
    detail: any;
    selectedIndex: number;
    isClicked: boolean;
    IsRubricVisible: boolean;
    RubricText: string;
    isIpad: any;
    questionData: any;
    metaData: any;
    firstName: string = '';
    questionTitle: string = '';
    StudentAssignments: any = [];
    NumberOfStudents: number;
    classCodeSendFeedback: string = '';
    constructor() { }

    //setAnswerStatus(interactionType,setAnswerStatus) {
    //    this.StudentAssignments.forEach((assignment) => {
    //        assignment.AssignedStudents.forEach((detail, index) => {
    //            if (setAnswerStatus) {
    //                detail['answerStatus'] = '';
    //                if (detail.percentScore == 0) {
    //                    detail['answerStatus'] = 'Incorrect';
    //                } else if (detail.percentScore == 100) {
    //                    detail['answerStatus'] = 'Correct';
    //                } else {
    //                    detail['answerStatus'] = 'Partially Correct';
    //                }
    //            } else if (!setAnswerStatus && interactionType==1){
    //                detail['answerStatus'] = detail['Response'] ? detail['Response'] : '';
    //            }
    //        });
    //    });
    //}

}

export class ReportAssignmentDataModel {
    ClassCode: string = '';
    ClassName: string = '';
    AssignedOn: string = '';
    AssignmentName: string = '';
    AssignmentTagId: string = '';
    DueDate: string = '';
    Students: any = [];
    studentsChecked: number;
}


export class ReportStudentDataModel {

    ExplorationResponse: string = '';
    FeedbackResponses: string = '';
    FirstName: string = '';
    HasContactPreference: boolean = false;
    Id: string = '';
    IsLearnCompleted: boolean = false;
    IsParcticeCompleted: boolean = false;
    LastName: string = '';
    TeacherResponse: string = '';
    UserName: string = '';
    submitType: string = 'text';
    isSelected: boolean = false;
    //this.parentContactUpdated = false;
    charactersLeft: number = 120;
    checkpointData: any = [];
    FeedbackSendOn: string = '';
    //this.TeacherResponseEntered = '';
    IsFeedbackSubmitted: boolean = false;
    UserContentActivityId: string = '';
    TeacherCommentStatus: string = '';
    showResponseTextBox: boolean = true;
    sentDateChkboxClick: boolean = true;
    ExplorationResponseMedia: any;
}

export class EducatorAssessementTabAssignedStudent {
    DateSubmitted: string = '';
    FeedBack: string = '';
    FirstName: string = '';
    LastName: string = '';
    Response: string = '';
    ResponseMedia: string = '';
    Score: string = '';
    ScoreDisplayString: string = '';
    StatusDisplayString: string = '';
    StudentId: string = '';
    UsageTime: string = '';
    UserName: string = '';
    isStudentSelected: string = '';
    isStudentDisabled: string = '';
    statusValue: string = '';
    hasImage: boolean = false;
    isDisplayFeedbackField: boolean = false;
    percentScore: number;
    AssessmentStatus: string = '';
    AssessmentDateSubmitted: string = '';
}