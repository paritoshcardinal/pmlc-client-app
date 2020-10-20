import {Pipe} from '@angular/core';
//ellipise.pipe


@Pipe({
    name: "ellipise"
})
export class EllipisePipe {
    transform(value: any, start: number, end?: number, title?: any) {
        if (typeof title != 'undefined')
            end = end - (title.length+3);
        if (value!=null && value.length > end)
            return value.substr(start, end) + "...";
        else
            return value;
    }
}