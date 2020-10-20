import {Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
@Component({
    selector: 'view-rubric',
    templateUrl: '../../../../Template2.0/shared2.0.1/ViewRubric.html',
    styleUrls: ['../../../../css/apps/shared2.0.1/attachplaylist/communityViewRubric.css'],
    encapsulation: ViewEncapsulation.None
})

export class ViewRubricComponent implements OnInit {

    @Input() rubrictext: any;   
    @Input() target: string;   
    @Output() close = new EventEmitter();

    constructor(private ref: ChangeDetectorRef) {

    }

    ngOnInit() {        
        jQuery("#CheckpointAddRubricPopup").draggable();
        this.ref.detectChanges();
    }

    printRubric() {
        let thsRef = this;
        applyCssForPrintRubricText(thsRef.target + '_div');
        //thsRef._checkpointService.print(thsRef.target);
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            iePrintIssue(thsRef.target, 'container-fluid', true);
        } else {
            jQuery('#' + thsRef.target).print();
        }
    }

    onClickClose() {
        this.close.emit('');
    }
}