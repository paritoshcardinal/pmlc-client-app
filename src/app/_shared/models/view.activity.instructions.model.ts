import { Subscription } from "rxjs-operators";

export class ViewActivityInstructionsModel {    
    showMoreInfo: boolean = false;
    toolTip: boolean = false;
    isHalfView: boolean = true;
    isClassActive: boolean = false;
    isFullViewOpen: boolean = false;
    isClickOnActivity: boolean = true;
    subscription: Subscription;
}

export class InstructionsPopupModel {
    isIpadDevice: boolean = false;
    isFullView: boolean = false;
    isHalfView: boolean = true;
    isForMoz: boolean = false;
} 