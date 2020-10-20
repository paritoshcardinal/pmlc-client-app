import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input} from '@angular/core';
import { SchoolStaffService} from '@app/_services';

@Component({
    selector: 'remove-staff',
    templateUrl: './removeStaff.html',
    styleUrls: ['./removeStaff.css'],
    encapsulation: ViewEncapsulation.None
})

export class RemoveStaffComponent {
    public popupModelData: any = { open: true, removeStaffMember: true };
    public assignableSelectedStaff: any = {};
    public assigneAndDeleteData: any = {};
    public assignableStaffListRolesSection: any = {};
    public staffList: any = [];
    public messageList: any = [];
    public saveButtonText: string = "Save";
    public newAdminUserId: any = '';
    public isNextButtonClicked: boolean = false;

    @Input() inputData: any;
    @Output() parentEmitterReceiver: EventEmitter<any> = new EventEmitter<any>();

    constructor(private schoolStaffService: SchoolStaffService) {

    }

    ngOnInit() {
        let memStatus = this.inputData.membershipStatus;
        this.messageList = this.inputData.messageList;
        
        if (memStatus.type != 1 && memStatus.type != 5) {
            this.popupModelData = { open: true, removeStaffMember: false };
        }

        if (memStatus.type == 4) {
            this.saveButtonText = "Next";
        }
    }

    ngAfterViewInit() {
        let userId = this.inputData.staff;
        let memStatus = this.inputData.membershipStatus;
        let thisRef = this;

        if (memStatus.type == 2) {
            this.assignOrRemoveStaffSteps(2, userId);
        }
        else if (memStatus.type == 3) {
            this.assignOrRemoveStaffSteps(3, userId);
        }
        else if (memStatus.type == 4) {
            this.assignOrRemoveStaffSteps("4a", userId);
        }
        
        jQuery('.no-css-rm-staff-mbody').click(function (event) {
            let clickedTarget = event.target;
            let first = (!jQuery('.no-css-rm-staff-mbody .no-css-dropdwon-btn').is(clickedTarget)) && jQuery(clickedTarget).closest("button.no-css-dropdwon-btn").length < 1;
            let second = (!jQuery('.no-css-rm-staff-mbody .no-css-dropdwon-list').is(clickedTarget)) && jQuery(clickedTarget).closest(".no-css-dropdwon-list").length < 1;

            if (first && second) {
                let keys = Object.keys(thisRef.assignableStaffListRolesSection);
                jQuery.each(keys, function (index, value) {
                    if (thisRef.assignableStaffListRolesSection[value]) {
                        delete thisRef.assignableStaffListRolesSection[value];
                    }
                });
            }
        });
    }

    removeUserFromSchoolEdition(userId, type) {
        let thisRef = this;
        this.schoolStaffService.removeStaffMemberIfCommuniteeNotExist(userId, function (returnData) {
            if (returnData.status) {
                thisRef.popupModelData = { showSuccessMessage: true, open: true };
            }
        });
    }

    assignOrRemoveStaffSteps(type, userId) {        
        let communityList = [];        
        let thisRef = this;
        this.resetToDefault();
        this.schoolStaffService.getAllCommunityStaffs(type, userId, function (returnData) {
            thisRef.assigneAndDeleteData = {};
            thisRef.assignableSelectedStaff = {};
            
            if (type == 2 || type == "4a") {                
                returnData = [{ Guid: "anyDynamicValue", Title: "New School Administator", PremiumEducators: returnData }];
                if (type == "4a") {
                    /* In case of 4a (1st popup), displaying starting two messages from the array messageList.*/
                    thisRef.messageList = thisRef.messageList.splice(0, 2);
                }
            }
            else {
                let memStatus = thisRef.inputData.membershipStatus;
                if (memStatus.type != 5) {
                    thisRef.messageList = thisRef.inputData.messageList.slice();
                }
            }
            jQuery.each(returnData, function (index, communityObj) {
                thisRef.assigneAndDeleteData[communityObj.Guid] = "";
                thisRef.assignableSelectedStaff[communityObj.Guid] = "Please select";
                let comunitee = {};
                let memberList = [];
                comunitee['Guid'] = communityObj.Guid;
                comunitee['Title'] = communityObj.Title;

                if (type == 3) {
                    let temp = {};
                    temp["name"] = "<b>Do not assign</b> - community will be deleted";
                    temp["value"] = "DoNotAssign";
                    memberList.push(temp);
                }

                jQuery.each(communityObj.PremiumEducators, function (index, staffObj) {
                    if (staffObj.UserId != userId) {
                        let temp = {};
                        temp["name"] = staffObj.FirstName + " " + staffObj.LastName;
                        temp["value"] = staffObj.UserId;
                        memberList.push(temp);
                    }

                });
                comunitee['memberList'] = memberList;
                communityList.push(comunitee);
            });
        });

        this.popupModelData = {
            open: true, disableSaveButton: 'disable-btn',
            showCommunityList: true, data: {
                type: type,
                'staff': thisRef.inputData.staff, 'userId': userId,
                communityList: communityList
            }
        };
    }

    resetToDefault() {
        this.popupModelData = { open: false, removeStaffMember: false };
    }

    closeModel() {
        this.parentEmitterReceiver.emit({ canceled: true });
        this.isNextButtonClicked = false;
    }

    // This method is called when "Yes, Remove" button is clicked, It's in the case of 1, 5 (Without community and With community)
    removeSchoolStaff() {
        let userId = this.inputData.staff;
        let memStatus = this.inputData.membershipStatus;
        this.removeUserFromSchoolEdition(userId, memStatus.type);
    }

    toggleAssignableStaffListRoles(guid) {
        if (typeof this.assignableStaffListRolesSection[guid] == 'undefined') {
            this.assignableStaffListRolesSection = {};
            this.assignableStaffListRolesSection[guid] = true;
        } else {
            this.assignableStaffListRolesSection = {};
        }
    }

    deletedSuccessfully() {
        let thisRef = this;
        thisRef.parentEmitterReceiver.emit({ deleted: true, data: thisRef.inputData });
    }

}