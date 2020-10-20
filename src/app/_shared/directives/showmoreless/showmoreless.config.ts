
import { Injectable } from '@angular/core';

@Injectable()
export class ShowMoreLessConfig {
    public constructor() { }
   
    public communityPostSetting: any = {
        lines: 7,
        ellipsis:'',
        showMore: '&hellip; <a id="show-more" class="more-link" href="javascript:void(0)">Show More</a>'  
    }
    public communityCommentSetting: any = {
        lines: 3,
        ellipsis: '',
        showMore: '<a id="show-more" class="more-link" href="javascript:void(0)">Show More</a>'
    }
    
    private defaultSettings: any = {
        lines: 2,
        showMore: '&hellip; <a id="show-more" href="javascript:void(0)">Show More</a>'
       
    }
    public notificationCommentSetting: any = {
        lines: 4,
        ellipisis: '&hellip;',
        hideShowMore:true     
    }

    public todoContentSettings: any = {
        lines: 3,     
        isToDO: true,
        ellipsis: '',
        showMore: '',
       
    }
}