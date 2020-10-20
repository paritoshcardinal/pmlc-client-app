import {Pipe} from '@angular/core';
//ellipise.pipe


@Pipe({
    name: "newlineellipise"
})
export class NewLineEllipisePipe {
    transform(value: any) {
       if (value != null)
        value = value.replace(/\n/gi, '');
           return value;
    }
}