import {Pipe} from '@angular/core';

@Pipe({
    name: "convertMinuteToHour"
})
export class ConvertMinuteToHourPipe {
    transform(usageTime: any) {
        let s = '';
        if (usageTime != null && usageTime != '') {
            let t;
            let hourText = " HOUR ";
            let minText = " MINUTE ";
            if (usageTime >= 60) {
                let hours = Math.floor(usageTime / 60);
                let minutes = usageTime % 60;
                if (minutes > 0) {
                    if (hours > 1) {
                        hourText = ' HOURS ';
                    }
                    if (minutes > 1) {
                        minText = ' MINUTES ';
                    }
                    t = hours + hourText + minutes + minText;
                } else {
                    if (hours > 1) {
                        t = hours + ' HOURS ';
                    } else {
                        t = hours + ' HOUR ';
                    }
                }
            } else {
                if (usageTime > 1) {
                    t = usageTime + ' MINUTES ';
                } else {
                    t = usageTime + ' MINUTE ';
                }
            }
            s = t;
        }
        return s;
    }
}