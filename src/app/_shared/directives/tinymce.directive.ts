import {Directive, Input, Output, ElementRef, Inject, NgZone, Attribute, EventEmitter} from '@angular/core';
import { NgModel } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import '../models/javascript.variable';
declare var jQuery: any;
declare var tinymce: any;
declare function ratioImageWidthHeight(element, height, width);
declare function manageTinymceCopyImages(temp, id, rnd);

export interface TinymceConfig {
    selector?: any,
    menubar?: boolean,
    content_css?: Array<string>,
    toolbar1?: string,
    plugins?: string,
    autoresize_bottom_margin?: number,
    paste_data_images?: boolean,
    statusbar?: boolean,
    link_title?: boolean,
    target_list?: boolean,
    default_link_target?: string,
    paste_preprocess?: any,
    setup?: any,
    mode?: string,
    elements?: any,
    paste_as_text?: boolean,
    autoresize_min_height?: number,
    autoresize_max_height?: number,
    height?: number,
    custom_image_button_visible?: boolean,
    content_editable?: boolean,
    placeholder_class?: any,
    placeholder?: string,
    content_class?: any,
    hide_toolbar?: boolean,
    shift_toolbar?: boolean,
    show_border?: boolean,
    border_class?: string,
    element_name?: string,
    allow_image_paste?: boolean,
    remove_toolbar?: boolean
    skin_url?: string,
    external_plugins?: any,
    table_default_attributes?: any,
    font_formats?: any,
    image_paste?: boolean,
    autosave?: boolean
}

@Directive({
    selector: '[tinymce]'
})
export class TinyMCEDirective {

    @Input('tinymce') settings: TinymceConfig;
    @Output() onLargeImageSelect: EventEmitter<any> = new EventEmitter<any>();
   
    private tinyInstance: any;
    private id: string = Math.random().toString(36).substr(2, 5);
    private pluginPath = "/Scripts/libs/tinymce_4.5.6/plugins/";
    private skinPath = "/Scripts/libs/tinymce_4.5.6/skins/";
    private defaultSettings: TinymceConfig = {
        menubar: false,
        content_css: ['/Content/tinymce_custom_content.css' + bundleversion, '/Content/custom-fonts.css' + bundleversion, '/Content/mathquill.css' + bundleversion, '/Content/equation_editor.css' + bundleversion],
        autoresize_bottom_margin: 0,
        paste_data_images: true,
        statusbar: false,
        link_title: false,
        target_list: false,
        image_paste: true,
        mode: 'exact',
        default_link_target: '_blank',
        skin_url: this.skinPath + 'lightgray',
        table_default_attributes: {
            border: '1'
        },

        external_plugins: {
            "autolink": this.pluginPath + "autolink/plugin.min.js",
            "link": this.pluginPath + "link/plugin.min.js",
            "lists": this.pluginPath + "lists/plugin.min.js",
            "charmap": this.pluginPath + "charmap/plugin.min.js",
            "anchor": this.pluginPath + "anchor/plugin.min.js",
            "textcolor": this.pluginPath + "textcolor/plugin.min.js",
            "image": this.pluginPath + "image/plugin.min.js",
            "paste": this.pluginPath + "paste/plugin.min.js",
            "autoresize": this.pluginPath + "autoresize/plugin.min.js",
            "equationeditor": this.pluginPath + "equationeditor/plugin.min.js",
            "table": this.pluginPath + "table/plugin.min.js"
        }
    };

    constructor(public el: ElementRef, public control: NgModel, private zone: NgZone, @Inject(DOCUMENT) private document: any) {

    }

    ngOnInit() {
        if (!this.el.nativeElement.getAttribute('id'))
            this.el.nativeElement.setAttribute('id', this.id);
        else
            this.id = this.el.nativeElement.getAttribute('id');

        this.defaultSettings.selector = '[tiny-id=' + this.id + ']';
        this.defaultSettings.elements = this.id;
        this.pasteProcess();
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.el.nativeElement.setAttribute('tiny-id', this.id);
        let thisRef = this;
        this.settings.setup = function (ed) {
            thisRef.tinyInstance = ed;
            thisRef.createCustomFontButton(ed);
            thisRef.createCustomImageButton(ed);
            thisRef.editorInItForEducator(ed);
            thisRef.BindBlurEvent(ed);
            thisRef.BindFocusEvent(ed);
            thisRef.BindKeyupEvent(ed);
            thisRef.BindKeydownEvent(ed);
            thisRef.BindSetContentEvent(ed);
            thisRef.BindExecCommandEvent(ed);
            thisRef.BindObjectResizedEvent(ed);
        }

    }

    ngAfterViewInit() {
        let thisRef = this;
        this.zone.runOutsideAngular(() => {
            setTimeout(function () {
                tinymce.suffix = '.min';
                tinymce.init(thisRef.settings);
            }, 500);
        });
    }

    pasteProcess() {
        let thisRef = this;
        this.defaultSettings.paste_preprocess = function (plugin, args) {
            if (!thisRef.settings.image_paste && args.content.indexOf("<img src=") > -1) {
                args.content = args.content.replace(/<img[^>]*>/g, "");
            }
            if (!thisRef.settings.image_paste) {
                let imgTags = args.content.match(/<img [^>]*src="[^"]*"[^>]*>/gm) || [];
                imgTags.forEach((data) => {
                    args.content = args.content.replace(data, "");
                });
            }
            let rnd = "IMG-" + new Date().getTime();
            let a = (args.content.indexOf('src="data:image/png;base64,') > 1 || args.content.indexOf('src="data:image/jpeg;base64,') > 1 || args.content.indexOf('src="data:image/jpg;base64,') > 1)
            if (typeof args.content != 'undefined' && a) {
                if (!thisRef.settings.allow_image_paste) {
                    args.content = null;
                } else {
                    if (thisRef.settings.element_name == 'answer' && jQuery("#" + args.target.iframeElement.id).contents().find('img').length >= 1) {
                        args.content = null;
                        return;
                    }

                    if (thisRef.settings.element_name == 'answer' && jQuery("#" + args.target.iframeElement.id).contents().find('img').length == 0) {
                        let cntid = args.target.iframeElement.id.split("_")[1];
                        jQuery("#customimagebutton_answerRationaleChoice_" + cntid, "#answerChoiceContainer_" + cntid).addClass("tinymce_disabled_button");
                    }

                    let temp = args.content;
                   if (thisRef.settings.element_name == 'ActivityInstruction') {
                        rnd = "ActivityInstruction--" + rnd;
                    }
                    args.content = "<img id='" + rnd + "' src='/Content/assets/images/gif-load2.gif'></img>";

                    setTimeout(function () {
                        if (impUserId !== "0")
                            return;

                        manageTinymceCopyImages(temp, args.target.iframeElement.id, rnd);
                    });
                }
            } else if (typeof args.content != 'undefined') {
                let rnd = "IMG-" + new Date().getTime();
                let regex = /<img.*?src=['"](.*?)['"]/;
                let co = regex.exec(args.content);
                
                let fSizeCheck = 1048576 * 2;//1048576 = 1 MB
                 thisRef.onLargeImageSelect.emit({ elementName: thisRef.settings.element_name, value: false });
                if (co != null) {
                    args.content = "<img id='" + rnd + "' src='/Content/assets/images/gif-load2.gif'></img>";
                    if (co[1].toString().indexOf('blob:http') > -1) {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", co[1].toString());
                        xhr.responseType = "blob";
                        xhr.onload = function (result) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                let temp1 = "<img src='" + reader.result + "'></img>";
                                setTimeout(function () {
                                    if (impUserId !== "0")
                                        return;
                                    manageTinymceCopyImages(temp1, args.target.iframeElement.id, rnd);
                                });
                            };
                            reader.readAsDataURL(result.target['response']);
                        };
                        xhr.send();
                    } else {
                        if (impUserId !== "0")
                            return;
                        jQuery.get('api/anonymous/GetMediaFromUrl', { url: co[1].toString() }, function (data) {
                            setTimeout(function () {
                                let loaderImg = jQuery("#" + args.target.iframeElement.id).contents().find("img#" + rnd);
                                loaderImg.attr("src", data);
                                loaderImg.attr("data-mce-src", data);
                                loaderImg.height("auto").width("100%");
                            }, 100);
                        }).fail(function () {
                            thisRef.onLargeImageSelect.emit({ elementName: thisRef.settings.element_name, value: true });
                            jQuery("#" + args.target.iframeElement.id).contents().find("img#" + rnd).remove();
                        });
                    }
                }
            }
        }
    }

    updateModel() {
        this.control.update.emit(jQuery(this.el.nativeElement).val());
    };

    editorInItForEducator(ed) {
        let thisRef = this;
        ed.on('init', function (args) {
            jQuery('#' + ed.id + '_ifr').width('99%');
            thisRef.setContentEditable(ed);
            thisRef.setPlaceHolder(ed);
        });
    }

    setPlaceHolder(ed) {
        var cont = ed.getContent({ format: 'text' });
        if (this.settings.placeholder && (jQuery.trim(cont).length === 0 || cont === this.settings.placeholder)) {
            var $content = jQuery(ed.getContent());
            var imglist = $content.find('img');
            if (imglist.length > 0) {
                // nothing to do
            } else {
                ed.setContent(this.settings.placeholder);
                jQuery(ed.getBody()).find('p').css(this.settings.placeholder_class);
            }
        } else {
            jQuery(ed.getBody()).find('p').css(this.settings.content_class);
        }

        if (this.settings.hide_toolbar) {
            jQuery('#' + ed.id + '_ifr').parent().parent().find(".mce-toolbar-grp").hide();
        }

        if (this.settings.element_name == 'eduFeedBack') {
            this.settings.hide_toolbar = true;
            ed.focus();
        }

        if (this.settings.element_name == 'rubricAnswerKey' || this.settings.element_name == 'playlistNote' || this.settings.element_name == 'assessment_instruction') {
            jQuery(ed.getBody()).addClass('rubricbody');
            jQuery('#' + ed.id + '_ifr').contents().scrollTop(0);
        }

        if (this.settings.shift_toolbar) {
            jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-flow-layout').css({ 'text-align': 'right' });
            jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-stack-layout-item').css({ 'background': '#fff' });
            jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-edit-area').css("border-width", "1px");
            jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-flow-layout').addClass("answerChoiceRationalOptionalFixed");
            jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-toolbar-grp').css("padding-bottom", "0px");
            jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-flow-layout').addClass("answerChoiceRationalFixed");
        }

        if (this.settings.remove_toolbar) {
            jQuery('#' + ed.id + '_ifr').parent().parent().find(".mce-toolbar-grp").hide();
        }
        if (this.settings.element_name == "rationale" || this.settings.element_name == "answer") {
            setTimeout(function () {
                if (jQuery('#' + ed.id + '_ifr').css('height') === '51px') {
                    jQuery('#' + ed.id + '_ifr').contents().find("head").append(jQuery("<style type='text/css'>  .mce-content-body{margin-top:4px;margin-bottom: 5px;}  </style>"));
                    jQuery('#' + ed.id + '_ifr').css('height', '44px');//added Margin bottom 5px to get 44px height iframe issue
                }
            }, 500);
        }
    }

    setContentEditable(ed) {
        let thisRef = this;
        if (typeof thisRef.settings.content_editable != 'undefined' && thisRef.settings.content_editable == false) {
            var cEditorId = ed.id;
            ed.getBody().setAttribute('contenteditable', false);
            var cEditorFrame = jQuery('#' + cEditorId + '_ifr');
            cEditorFrame.parent().addClass('disabled');
        }
    }

    createCustomFontButton(ed) {
        let fontSizeValue = [{ text: '14pt', value: '14px' },
        { text: '16pt', value: '16px' },
        { text: '18pt', value: '18px' }];
        if (this.settings.element_name == 'playlistNote' || this.settings.element_name == 'assessment_instruction') {
            fontSizeValue = [{ text: '14pt', value: '14px' },
            { text: '16pt', value: '16px' },
            { text: '18pt', value: '18px' },
            { text: '20pt', value: '20px' },
            { text: '22pt', value: '22px' },
            { text: '24pt', value: '24px' },
            { text: '26pt', value: '26px' },
            { text: '28pt', value: '28px' },
            { text: '36pt', value: '36px' },
            { text: '42pt', value: '42px' },
            { text: '72pt', value: '72px' }];
        } else if (this.settings.element_name == 'familyExplorationDescription' || this.settings.element_name == 'familyExplorationPrompt'
            || this.settings.element_name == 'ActivityInstruction' || this.settings.element_name == 'CheckInstruction' || this.settings.element_name == 'familyPlNote') {
            fontSizeValue = [{ text: '14pt', value: '14px' },
            { text: '16pt', value: '16px' },
            { text: '18pt', value: '18px' },
            { text: '20pt', value: '20px' },
            { text: '22pt', value: '22px' },
            { text: '24pt', value: '24px' }];
        }
        ed.addButton('customfontsize', {
            type: 'listbox',
            text: 'My listbox',
            icon: false,
            onselect: function (e) {
                ed.execCommand('FontSize', false, this.value());
            },
            values: fontSizeValue,
            onPostRender: function () {
                this.value('16px');
            }
        });
    }

    createCustomImageButton(ed) {
        let thisRef = this;
        ed.addButton('customimage', {
            id: 'customimagebutton_' + ed.id,
            type: 'button',
            title: 'Insert Image',
            hidden: false,
            icon: "image",
            onclick: function () {
                if (impUserId !== "0")
                    return;
                jQuery('#mceImageUploadInput').trigger('click');

                jQuery('#mceImageUploadInput').off('change').on('change', function () {
                    let token = jQuery('#antiForgeryToken').val();
                    let hiddenImg = jQuery("#mceImageUploadForm #mceImageUploadInput");
                    let fSizeCheck = 1048576 * 2;//1048576 = 1 MB
                    let stopServerCall = true;
                    thisRef.onLargeImageSelect.emit({ elementName: thisRef.settings.element_name, value: false });
                    if (typeof hiddenImg != 'undefined' && typeof hiddenImg[0] != 'undefined' && typeof hiddenImg[0].files[0] != 'undefined'
                        && jQuery(hiddenImg)[0].files[0].size > fSizeCheck) {
                        stopServerCall = false;
                        thisRef.onLargeImageSelect.emit({ elementName: thisRef.settings.element_name, value: true });
                    }
                    
                    if (stopServerCall) {
                            jQuery('#mceImageUploadForm').ajaxSubmit({
                                url: '/educator/SaveCheckPointPromptImage',
                                dataType: 'JSON',
                                type: 'POST',
                                headers: { "RequestVerificationToken": token },
                                success: function (d) {
                                    thisRef.onLargeImageSelect.emit({ elementName: thisRef.settings.element_name, value: false });
                                    
                                    let tempwidth = d.width;
                                    let tempheight = d.Height;
                                    if (thisRef.settings.element_name == "ActivityInstruction") {
                                        tempwidth = "100%";
                                        tempheight = "auto";
                                    } else if (thisRef.settings.element_name == "CheckInstruction") {
                                        tempwidth = "100%";
                                        tempheight = "auto";
                                    }                               
                                    let a = "<img src='" + d.ImagePath + "'  height='" + tempheight + "'  width='" + tempwidth + "'></img>";
                                    ed.focus();
                                    ed.selection.setContent(a);
                                    if (thisRef.settings.element_name == "ActivityInstruction") {

                                        setTimeout(() => { ed.selection.setContent(""); }, 1000);
                                 }
                                    jQuery('#mceImageUploadInput').val('');
                                    jQuery("#mceImgaeUploadDiv").css({ display: "none" });
                                    //$("#customimagebutton_" + thisRef.id, "#answerChoiceContainer_" + cntid).addClass("tinymce_disabled_button");
                                    if (thisRef.settings.element_name == 'answer')
                                        jQuery("#customimagebutton_" + ed.id).addClass("tinymce_disabled_button");
                                },
                                error: function (d) {
                                     jQuery("#mceImgaeUploadDiv").css({ display: "none" });
                                }
                            });
                    } else {
                        jQuery("#mceImgaeUploadDiv").css({ display: "none" });
                    }
                    jQuery("#mceImageUploadInput").val(null);
                });
            }
        });
    }

    BindKeyupEvent(ed) {
        let thisRef = this;
        ed.on('KeyUp', function (e) {
            //if (jQuery.trim(ed.getContent({ format: 'text' })) != '') {
            ed.save();
            thisRef.updateModel();
            //}
        });
    }

    BindKeydownEvent(ed) {
        let thisRef = this;
        ed.on('KeyDown', function (e) {
            if ((e.keyCode == 8 || e.keyCode == 46) && ed.selection) { // delete & backspace keys
                var selectedNode = ed.selection.getNode(); // get the selected node (element) in the editor
                if (selectedNode && selectedNode.nodeName == 'IMG') {
                    ed.save();
                    thisRef.updateModel();
                    /* 
                     if (userType == 'educator' && (attrs.id == 'answerRationaleChoice_0' || attrs.id == 'answerRationaleChoice_1' || attrs.id == 'answerRationaleChoice_2' || attrs.id == 'answerRationaleChoice_3')) {
                         // enable the image icon
                         $("#customimagebutton_" + attrs.id, "#answerChoiceContainer_" + cntid).removeClass("tinymce_disabled_button");
                     }*/
                    if (thisRef.settings.element_name == 'answer')
                        jQuery("#customimagebutton_" + ed.id).removeClass("tinymce_disabled_button");
                }
            }
            jQuery(ed.getBody()).find('p').css(thisRef.settings.content_class);
        });
    }

    BindBlurEvent(ed) {
        let thisRef = this;
        ed.on('blur', function (e) {
            if (ed.windowManager.windows[0] && ed.windowManager.windows[0]._title == "Equation Editor")
                return;

            var cont = ed.getContent({ format: 'text' });
            if (thisRef.settings.placeholder && jQuery.trim(cont).length === 0) {
                var $content = jQuery(ed.getContent());
                var imglist = $content.find('img');
                if (imglist.length > 0) {
                    return;
                }
                ed.setContent(thisRef.settings.placeholder);
                jQuery(ed.getBody()).find('p').css(thisRef.settings.placeholder_class);
            }
            let setTime = 0;
            if (this.settings.element_name == 'playlistNote' || thisRef.settings.element_name == 'eduFeedBack') {
                setTime = 1000;
            }
            if (thisRef.settings.hide_toolbar) {
                setTimeout(function () { 
                    jQuery('#' + ed.id + '_ifr').parent().parent().find(".mce-toolbar-grp").hide();
                }, setTime)
            }

            if (thisRef.settings.show_border) {
                jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-edit-area').removeClass(thisRef.settings.border_class);
            }
            if (thisRef.settings.element_name == 'eduFeedBack' || this.settings.autosave) {
                thisRef.onLargeImageSelect.emit({ action: 'save' });
            }

            if (thisRef.isiPad()) {
                jQuery('#' + ed.id + '_ifr').focus();
                thisRef.document.activeElement.blur();
            }

            ed.save();
            thisRef.updateModel();
        });
      
    }

    isiPad() {
        return ((navigator.userAgent.match(/iPad/i) != null) || (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1))
    }

    BindFocusEvent(ed) {
        let thisRef = this;
        ed.on('focus', function (e) {
            var cont = ed.getContent({ format: 'text' });
            if (thisRef.settings.placeholder && jQuery.trim(cont) == thisRef.settings.placeholder) {
                ed.setContent('');
            }
            // Assessment Instruction contains br tag in place holder.
            if (thisRef.settings.element_name == 'assessment_instruction') {
                let a = thisRef.settings.placeholder.split('<br/>');
                if (cont.indexOf(a[0]) > -1 && cont.indexOf(a[1]) > -1 ) {
                    ed.setContent('');
                }
            }

            jQuery(ed.getBody()).find('p').css(thisRef.settings.content_class);

            let setTime = 0;
            if (this.settings.element_name == 'playlistNote' || thisRef.settings.element_name == 'eduFeedBack') {
                setTime = 1000;
            }
            if (thisRef.settings.hide_toolbar) {
                setTimeout(function () {
                    jQuery('#' + ed.id + '_ifr').parent().parent().find(".mce-toolbar-grp").show();
                }, setTime)
            }

            if (thisRef.settings.show_border) {
                jQuery('#' + ed.id + '_ifr').parent().parent().find('.mce-edit-area').addClass(thisRef.settings.border_class);
            }
        });
    }

    BindSetContentEvent(ed) {
        let thisRef = this;
        ed.on('SetContent', function (e) {
            //if used to handle copy paste issue 
            if (e.content.indexOf("src='/Content/assets/images/gif-load2.gif") > 1) {
                var crt = 1;
                setTimeout(function () {
                    var myRecur = function () {
                        if (jQuery("#tinymce_Image_resolution").length == 0) {
                            ed.save();
                            thisRef.updateModel();
                        } else {
                            setTimeout(function () { if (crt <= 5) myRecur() }, 1000);
                        }
                    };
                    myRecur();
                }, 1000);
            } else {
                if (!e.initial && thisRef.control.viewModel !== e.content) {
                    ed.save();
                    thisRef.updateModel();
                }
            }
        });
    }

    BindExecCommandEvent(ed) {
        let thisRef = this;
        ed.on('ExecCommand', function (e) {
            ed.save();
            thisRef.updateModel();
        });
    }

    BindObjectResizedEvent(ed) {
        let thisRef = this;
        ed.on('ObjectResized', function (e) {
            if (jQuery(e.target).prop("tagName") == 'img' || jQuery(e.target).prop("tagName") == 'IMG') {
                var imageWidthHeight = ratioImageWidthHeight(jQuery(e.target), 600, 600);
                if (imageWidthHeight[1] < 10) {
                    jQuery(e.target).height(10);
                } else {
                    jQuery(e.target).height(imageWidthHeight[1]);
                }
                if (imageWidthHeight[0] < 10) {
                    jQuery(e.target).width(10);
                } else {
                    jQuery(e.target).width(imageWidthHeight[0]);
                }
            }
            ed.save();
            thisRef.updateModel();
        });
    }

    setRationalChoiceColor(cssObj) {
        if (this.tinyInstance) {
            this.settings.content_class = cssObj;
            jQuery(this.tinyInstance.getBody()).find('*').css(this.settings.content_class);
        }
    }

    setData(data) {
        if (this.tinyInstance)
            this.tinyInstance.setContent(data);
    }

    setPlaceholderData(data) {
        if (this.tinyInstance) {
            let element = this.tinyInstance;
            element.setContent(data);
            jQuery(element.getBody()).find('p').css(this.settings.placeholder_class);
        }
    }

    enableDisableEditor(flag) {
        let ed = this.tinyInstance, cEditorId = ed.id, cEditorFrame = jQuery('#' + cEditorId + '_ifr');;
        if (flag) {
            ed.getBody().setAttribute('contenteditable', true);
            cEditorFrame.parent().removeClass('disabled');
        } else {
            ed.getBody().setAttribute('contenteditable', false);
            cEditorFrame.parent().addClass('disabled');
        }
    }

    setGrayOutBackGround() {
        let cEditorFrame = jQuery('#' + this.tinyInstance.id + '_ifr');
        cEditorFrame.parent().css('opacity', '0.5');
    }
}
