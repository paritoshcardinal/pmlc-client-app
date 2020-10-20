import {Pipe} from '@angular/core';

@Pipe({
    name: "pmlngforpipe",
    pure: false
})
export class PmlNgForPipe {
    transform(value, search: string) {
        let keys = Object.keys(search)[0];
        let filterText = search[keys].trim();
        if (filterText.length < 1) {
            return value;
        } else {
            let filterKeys = keys.split(",");
            return value.filter(function (item) {
                let isMatch = false;
                //filterKeys.forEach(function (key, value) {
                let count = 0;
                for (count = 0; count < filterKeys.length; count++) {
                    isMatch = item[filterKeys[count]].toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
                    if (isMatch) {
                //        console.log(item[filterKeys[count]] + "===" + filterKeys[count] + "--" + isMatch);
                        break;
                    }
                };
                return isMatch;
            });
        }
       
    }
}