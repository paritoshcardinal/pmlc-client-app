import {UserInfoModel} from './user.info.model'

export class StandardPlayWindowModel extends UserInfoModel{
    checkpointData: any;
    contentGuid:any
    sliderToggleClassName: string = 'pl-slider';
    activityInstruction: string;
    modalConfig: any = {};
    assessmentInstruction:string;
    showLoadingOverlay: boolean = false;

    constructor() {
        super();
    }

} 