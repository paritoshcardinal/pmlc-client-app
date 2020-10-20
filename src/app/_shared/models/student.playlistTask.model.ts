import {UserInfoModel} from './user.info.model'

export class StudentPlaylistTaskModel extends UserInfoModel {

    showHideShowTitle: string = 'Open';
    showTopTaskSection: boolean = false;
    activeTab: string = 'prompt';
    openRubricPopUp: boolean = false;
    rubricHelpChk: boolean = false;
    showSubjectAnStandardData: boolean = false;
    showSubjectGrade: boolean = false;
    showCheckpointMsgSection: boolean = false;
    imgRubricHelpChk: boolean = false;
    checkpointMsg: string = "This Playlist Task is locked. You can view it once your teacher has assigned the playlist to you.";
    defaultScore: number = 100;

    constructor() {
        super();
    }
} 