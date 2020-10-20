import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'language-dropdown',   	
    template: `
    <div class="lng-dropdown-relative">
        <div class="dropdown">
            <a class="dropdown-toggle nturl notranslate" id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="javascript:void(0)">
                <span id="languageName"></span>
                <b class="caret"></b>
            </a>
            <span class="translate-google notranslate">Translated by Google<b class="caret lng-drpdn-caret"></b></span>
            <ul class="dropdown-menu no-css-lang-option notranslate" role="menu" aria-labelledby="dLabel">
                <li *ngFor="let lang of allLangArray">
                     <a *ngIf="lang.id != ''" href="javascript:void(0);" onclick="changeLanguageText(this.id);return false;" (click)="translateByGoogle(lang.key)" id="{{lang.id}}" class="nturl notranslate">{{lang.lang}} <span *ngIf="lang.id != 'eng'">({{lang.userLang}})</span></a>
                </li>
            </ul>
        </div>
    </div>
`,
    styles: [`
.lng-dropdown-relative li a {
    display: block;
    padding: 8px 20px;
    clear: both;
    font-family: MuseoSans-500;
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
}

.lng-dropdown-relative li a:hover {
    background-color: #eeeeee;
    background-image: none;
    color: #333;
    text-decoration: none !important;
}
.lng-dropdown-relative .dropdown .dropdown-toggle {
    color: #fff;
}

.standard-playlist-relative .playwindowPosition .dropdown .dropdown-menu {
    margin-top: 41px;
    border-radius: 0 0 6px 6px;
    border-top: 0px;
}
`],
    encapsulation: ViewEncapsulation.None
})

export class LanguageDropdown {

    allLangArray = [];

    constructor(private _dataService: DataService, private translate: TranslateService) {
    }

    ngOnInit() {
        document.getElementById("languageName").innerHTML = document.getElementById("langName").innerHTML;
        this.allLangArray = getAllSortedLanguage();
        //this.allLangArray.push({ 'label': 'Supported Languages', 'value': langJson }, { 'label': 'Other Languages', 'value': homeLanguages });
    }

    ngAfterViewInit() {
        if (userType != 'educator') {
            let pLanguage = "English";
            if (getCookie("googtrans") == "") {
                if (premiumLanguage != "") pLanguage = premiumLanguage;
            } else {
                pLanguage = getlanguage();
            }
            if (availablePrefferedLanguageJSON[pLanguage]) {
                this.translate.setDefaultLang(pLanguage);
                this.translate.use(pLanguage);
            }
        }
    }

    translateByGoogle(key) {
        key == 'en|en' ? doEnglishGTranslate() : doGTranslate(key);
        this._dataService.emitOnParentChildChanges({ action: 'TRANSLATE', fromComponent: 'LANGUAGE_DROPDOWN', toComponent: '' });
        //if (userType != 'educator' && availablePrefferedLanguageJSON[selectedGoogleLang]) {
        //    this.translate.setDefaultLang(selectedGoogleLang);
        //    this.translate.use(selectedGoogleLang);
        //}
    }
}