import { Directive,OnChanges, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[pmlLoadingOverlay]'
})
export class PmlLoadingOverlayDirective {
    @Input() private pmlLoadingOverlay: any;
    constructor(public elementRef: ElementRef) {
    }
    ngOnInit() {
        
    } 
    ngOnChanges(changes) {

        let nativeEle = this.elementRef.nativeElement;
        if (null == nativeEle.parentElement.querySelector("img")) {
            var img = document.createElement('img');
            img.src = "/Content/assets/images/ajax-loader.gif";
            img.setAttribute("class", "no-css");
            img.style.position = "absolute";
            img.style.width ="42px";
            img.style.left = "50%";
            img.style.top = "0px";
            img.style["margin-left"] = "-21px";
            nativeEle.appendChild(img);
        }
        let imgObj = nativeEle.parentElement.querySelector("img.no-css");
        let displayStatus = "none";
        nativeEle.style.removeProperty('position');
        nativeEle.style.removeProperty('opacity');
        nativeEle.style.removeProperty('cursor');
        nativeEle.style.removeProperty('pointer-events');
        if (changes.pmlLoadingOverlay.currentValue) {
            displayStatus = "block"
            nativeEle.style.position = "relative";
            nativeEle.style.opacity = "0.56";
            nativeEle.style['pointer-events'] ="none"
            nativeEle.style.cursor ="default"
            
        } 
        if (imgObj) {
            imgObj.style.display = displayStatus
        }
    }
}
