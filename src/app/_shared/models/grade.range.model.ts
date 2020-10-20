declare var jQuery: any;
export class GradeRangeModel {

    sliderId;
    sliderContainer;
    gradeRange;
    gradeRangeArray;
    // All Grade Link
    labelText;
    showAllGradeLink;
    onClickAllGradeEventCallback;
    fireSingleSelectEventCallback;
    gradeStateChangeEventCallback;
    mouseupEventCallback;
    mousemoveEventCallback;
    r1;
    r2;

    constructor(defId) {
        this.sliderId = defId || "Slider5";
        this.sliderContainer = this.sliderId.split("_")[0];
        this.gradeRange = "5-8";
        this.gradeRangeArray;
        // All Grade Link
        this.labelText = "Grade(s)";
        this.showAllGradeLink = true;
        this.onClickAllGradeEventCallback = null;

        this.fireSingleSelectEventCallback = null;
        this.gradeStateChangeEventCallback = null;
        this.mouseupEventCallback = null;
        this.mousemoveEventCallback = null;
    }

    /*Setter for onClickAllGradeEventCallback */
    setOnClickAllGradeEventCallback = function (n) {
    this.onClickAllGradeEventCallback = n;
    }

    /*Setter for fireEnterKeyEventCallback */
    setFireSingleSelectEventCallback = function (n) {
        this.fireSingleSelectEventCallback = n;
    }

    /*Setter for fireEnterKeyEventCallback */
    setGradeStateChangeEventCallback = function (n) {
        this.gradeStateChangeEventCallback = n;
    }

    /*Setter for fireEnterKeyEventCallback */
    setMouseupEventCallback = function (n) {
        this.mouseupEventCallback = n;
    }

    /*Setter for fireEnterKeyEventCallback */
    setMousemoveEventCallback = function (n) {
        this.mousemoveEventCallback = n;
    }
    

    generateRange = function () {
        var range1, range2;
        if (jQuery("#" + this.sliderId).val()) {
            var range = jQuery("#" + this.sliderId).val().split(";");
            range1 = Number(range[0]);
            range2 = Number(range[1]);
        }
        
        this.r1 = 0;
        this.r2 = 0;
        if (range1 >= 480 && range1 <= 510) {
            this.gradeRange = 'K-';
            this.r1 = 484;
        } else if (range1 > 510 && range1 <= 550) {
            this.gradeRange = '1-';
            this.r1 = 525;
        } else if (range1 > 550 && range1 <= 590) {
            this.gradeRange = '2-';
            this.r1 = 559;
        } else if (range1 > 590 && range1 <= 630) {
            this.gradeRange = '3-';
            this.r1 = 600;
        } else if (range1 > 630 && range1 <= 670) {
            this.gradeRange = '4-';
            this.r1 = 638;
        } else if (range1 > 670 && range1 <= 710) {
            this.gradeRange = '5-';
            this.r1 = 676;
        } else if (range1 > 710 && range1 <= 750) {
            this.gradeRange = '6-';
            this.r1 = 715;
        } else if (range1 > 750 && range1 <= 780) {
            this.gradeRange = '7-';
            this.r1 = 755;
        } else if (range1 > 780 && range1 <= 820) {
            this.gradeRange = '8-';
            this.r1 = 791;
        } else if (range1 > 820 && range1 <= 855) {
            this.gradeRange = '9-';
            this.r1 = 834;
        } else if (range1 > 855 && range1 <= 905 && this.sliderId != "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = '10-';
            this.r1 = 865;
        } else if (range1 > 855 && range1 <= 905 && this.sliderId == "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = '10-';
            this.r1 = 870;
        }  else if (range1 > 905 && range1 <= 940 && this.sliderId != "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = '11-';
            this.r1 = 909;
        } else if (range1 > 905 && range1 <= 940 && this.sliderId == "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = '11-';
            this.r1 = 920;
        } else if (range1 > 940 && this.sliderId != "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = '12-';
            this.r1 = 950;
        } else if (range1 > 940 && this.sliderId == "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = '12-';
            this.r1 = 960;
        }
        ///////
        if (range2 >= 480 && range2 <= 530) {
            this.gradeRange = this.gradeRange + 'K';
            this.r2 = 524;
        } else if (range2 > 530 && range2 <= 570) {
            this.gradeRange = this.gradeRange + '1';
            this.r2 = 559;
        } else if (range2 > 570 && range2 <= 610) {
            this.gradeRange = this.gradeRange + '2';
            this.r2 = 601;
        } else if (range2 > 610 && range2 <= 645) {
            this.gradeRange = this.gradeRange + '3';
            this.r2 = 639;
        } else if (range2 > 645 && range2 <= 685) {
            this.gradeRange = this.gradeRange + '4';
            this.r2 = 679;
        } else if (range2 > 685 && range2 <= 725) {
            this.gradeRange = this.gradeRange + '5';
            this.r2 = 718;
        } else if (range2 > 725 && range2 <= 765) {
            this.gradeRange = this.gradeRange + '6';
            this.r2 = 755;
        } else if (range2 > 765 && range2 <= 800) {
            this.gradeRange = this.gradeRange + '7';
            this.r2 = 793;
        } else if (range2 > 800 && range2 <= 850) {
            this.gradeRange = this.gradeRange + '8';
            this.r2 = 834;
        } else if (range2 > 850 && range2 <= 890 && this.sliderId != "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '9';
            this.r2 = 867;
        } else if (range2 > 850 && range2 <= 890 && this.sliderId == "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '9';
            this.r2 = 876;
        } else if (range2 > 890 && range2 <= 930 && this.sliderId != "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '10';
            this.r2 = 910;
        } else if (range2 > 890 && range2 <= 930 && this.sliderId == "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '10';
            this.r2 = 920;
        } else if (range2 > 930 && range2 <= 970 && this.sliderId != "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '11';
            this.r2 = 953;
        } else if (range2 > 930 && range2 <= 970 && this.sliderId == "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '11';
            this.r2 = 958;
        } else if (range2 >= 980 && this.sliderId != "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '12';
            this.r2 = 1000;
        } else if (range2 >= 980 && this.sliderId == "gradeRangeIdCheckpointPopUp_s1") {
            this.gradeRange = this.gradeRange + '12';
            this.r2 = 1000;
        }
        this.generateRangeArray(this.gradeRange);
        //}
    }
    /*unsued method
    singleGradeSelect = function (txt) {
        this.gradeRangeArray = [];
        if (txt == 'K') {
            this.gradeRange = 'K-K';
            this.gradeRangeArray = new Array('K');
            jQuery("#" + this.sliderId).slider("value", 484, 524);
            this.showAllGradeLink = true;
        } else if (txt == '1') {
            this.gradeRange = '1-1';
            this.gradeRangeArray = new Array('1');
            jQuery("#" + this.sliderId).slider("value", 525, 559);
            jQuery("#" + this.sliderId).slider("value", 525, 559);
        } else if (txt == '2') {
            this.gradeRange = '2-2';
            this.gradeRangeArray = new Array('2');
            jQuery("#" + this.sliderId).slider("value", 559, 601);
            jQuery("#" + this.sliderId).slider("value", 559, 601);
        } else if (txt == '3') {
            this.gradeRange = '3-3';
            this.gradeRangeArray = new Array('3');
            jQuery("#" + this.sliderId).slider("value", 600, 639);
            jQuery("#" + this.sliderId).slider("value", 600, 639);
        } else if (txt == '4') {
            this.gradeRange = '4-4';
            this.gradeRangeArray = new Array('4');
            jQuery("#" + this.sliderId).slider("value", 638, 679);
            jQuery("#" + this.sliderId).slider("value", 638, 679);
        } else if (txt == '5') {
            this.gradeRange = '5-5';
            this.gradeRangeArray = new Array('5');
            jQuery("#" + this.sliderId).slider("value", 676, 718);
            jQuery("#" + this.sliderId).slider("value", 676, 718);
        } else if (txt == '6') {
            this.gradeRange = '6-6';
            this.gradeRangeArray = new Array('6');
            jQuery("#" + this.sliderId).slider("value", 715, 755);
            jQuery("#" + this.sliderId).slider("value", 715, 755);
        } else if (txt == '7') {
            this.gradeRange = '7-7';
            this.gradeRangeArray = new Array('7');
            jQuery("#" + this.sliderId).slider("value", 755, 793);
            jQuery("#" + this.sliderId).slider("value", 755, 793);
        } else if (txt == '8') {
            this.gradeRange = '8-8';
            this.gradeRangeArray = new Array('8');
            jQuery("#" + this.sliderId).slider("value", 791, 834);
            jQuery("#" + this.sliderId).slider("value", 791, 834);
        } else if (txt == '9') {
            this.gradeRange = '9-9';
            this.gradeRangeArray = new Array('9');
            jQuery("#" + this.sliderId).slider("value", 834, 867);
            jQuery("#" + this.sliderId).slider("value", 834, 867);
        } else if (txt == '10') {
            this.gradeRange = '10-10';
            this.gradeRangeArray = new Array('10');
            jQuery("#" + this.sliderId).slider("value", 865, 910);
            jQuery("#" + this.sliderId).slider("value", 865, 910);
        } else if (txt == '11') {
            this.gradeRange = '11-11';
            this.gradeRangeArray = new Array('11');
            jQuery("#" + this.sliderId).slider("value", 909, 953);
            jQuery("#" + this.sliderId).slider("value", 909, 953);
        } else if (txt == '12') {
            this.gradeRange = '12-12';
            this.gradeRangeArray = new Array('12');
            jQuery("#" + this.sliderId).slider("value", 950, 1000);
            jQuery("#" + this.sliderId).slider("value", 950, 1000);
        }
        //adjustSlider(this);
        if (this.fireSingleSelectEventCallback != null && typeof this.fireSingleSelectEventCallback == 'function') {
            this.fireSingleSelectEventCallback();
        }
    }
    */
    generateRangeArray = function (gradeRange) {

        jQuery('ins', "#" + this.sliderContainer).each(function () {
            jQuery(this).removeClass("slider_color");
        });
        var min = this.gradeRange.split("-")[0];
        var max = this.gradeRange.split("-")[1];
        var that = this;
        if (min == 'K' && max == 'K') {
            this.gradeRangeArray = new Array('K');
            jQuery('ins', "#" + this.sliderContainer).each(function () {
                if (jQuery(this).text() == 'K') {
                    jQuery(this).addClass("slider_color");
                    that.adjustSlider(this);
                }
            });
        } else if (max == 'K') {
            this.gradeRangeArray = new Array('K');
            jQuery('ins', "#" + this.sliderContainer).each(function () {
                if (jQuery(this).text() == 'K') {
                    jQuery(this).addClass("slider_color");
                    that.adjustSlider(this);
                }
            });
        } else if (min == 'K') {
            this.gradeRangeArray = new Array('K');
            jQuery('ins', "#" + this.sliderContainer).each(function () {
                if (jQuery(this).text() == 'K') {
                    jQuery(this).addClass("slider_color");
                    that.adjustSlider(this);
                }
            });
            for (var i = 1; i <= Number(max); i++) {
                this.gradeRangeArray[i] = i.toString();

                jQuery('ins', "#" + this.sliderContainer).each(function () {
                    if (jQuery(this).text() == i.toString()) {
                        jQuery(this).addClass("slider_color");
                        that.adjustSlider(this);
                    }
                });
            }

        } else {
            this.gradeRangeArray = new Array();
            var tmp = 0;
            for (var i = Number(min); i <= Number(max); i++) {
                jQuery('ins', "#" + this.sliderContainer).each(function () {
                    if (jQuery(this).text() == i.toString())
                        jQuery(this).addClass("slider_color");
                });
                that.adjustSlider(this);
                that.gradeRangeArray[tmp++] = i.toString();
            }
        }
    }

    adjustSlider(slObject) {
    if (jQuery(slObject).text() != '10' && jQuery(slObject).text() != '11' && jQuery(slObject).text() != '12')
        jQuery(slObject).css("margin-left", "-16.8px");
    if (jQuery(slObject).text() == '12')
        jQuery(slObject).css("margin-left", "-16.5px");
    if (jQuery(slObject).text() == '11') {
        jQuery(slObject).css("margin-left", "-18.7px");
    }
    if (jQuery(slObject).text() == '10') {
        jQuery(slObject).css("margin-left", "-22px");
    }
    if (jQuery(slObject).text() == 'K') {
        jQuery(slObject).css("margin-left", "-18px");
    }
    if (jQuery(slObject).text() == '9') {
        jQuery(slObject).css("margin-left", "-18.8px");
    }
}

    
}

