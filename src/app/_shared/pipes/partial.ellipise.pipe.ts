import { Pipe } from '@angular/core';

@Pipe({
    name: "partialellipise"
})
export class PartialEllipisePipe {
    transform(value: any, ignoreCount: number, firstStringLength: number, secondStringLength?: number) {
        if (value != null && value.length <= ignoreCount)
            return value;

        if (value != null && value.length > ignoreCount) {
            return value.substr(0, firstStringLength) + " ..." + value.substr(value.length - secondStringLength, value.length);
        }        
    }
}