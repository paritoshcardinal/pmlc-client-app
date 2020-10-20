import {TinymceConfig} from './tinymce.directive';
import { Injectable } from '@angular/core';

@Injectable()
export class TinyMCEConfig {


    path: string = '/Scripts/dist/skins/lightgray';
    pluginPath: string = '/Scripts/dist/plugins';
    basePath: string = '/Scripts/dist/';
    public constructor() { }

    public taskPromptSettings: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | removeformat | bullist numlist customimage | equationeditor | outdent indent | fontselect",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        placeholder_class: { 'color': '#999', 'margin': '0px', 'font-style': 'italic' },
        placeholder: 'Enter the question you want your students to answer or a problem you want them to solve (e.g Using evidence from the activities in this playlist, defend your position on....).',
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        allow_image_paste: true,
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public checkpointFormPromptSettings: TinymceConfig = {
        toolbar1: "bold italic underline | forecolor | customfontsize | removeformat | bullist numlist customimage | equationeditor | outdent indent | fontselect",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        placeholder_class: { 'color': '#999', 'margin': '0px', 'font-style': 'italic' },
        placeholder: 'Enter a question you want your students to answer or a problem you want them to solve (e.g., Write an expression that represents...).',
        content_class: { 'color': '#000' },
        hide_toolbar: true,
        allow_image_paste: true,
        element_name: 'checkpointFormPrompt',
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public rubricTextSettings: TinymceConfig = {
        toolbar1: "table bold italic underline | customfontsize | removeformat | bullist numlist customimage | equationeditor | outdent indent | fontselect",
        plugins: "table autolink link lists charmap anchor textcolor colorpicker image paste equationeditor",
        paste_as_text: false,
        height: 300,
        custom_image_button_visible: true,
        content_class: { 'color': '#000' },
        element_name: 'rubricAnswerKey',
        allow_image_paste: true,
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public incorrectFeedBackSettings: TinymceConfig = {
        toolbar1: "equationeditor",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: true,
        autoresize_min_height: 35,
        height: 100,
        custom_image_button_visible: false,
        //placeholder_class: { 'color': '#EA4040', 'margin': '8px', 'font-family': 'MuseoSans-700', 'font-size': '14px' },
        //placeholder: 'e.g. Oops, this was a wrong answer!',
        content_class: { 'color': '#EA4040', 'margin': '8px', 'font-family': 'MuseoSans-700', 'font-size': '14px' },
        hide_toolbar: true,
        shift_toolbar: true,
        allow_image_paste: false
    };

    public correctFeedBackSettings: TinymceConfig = {
        toolbar1: "equationeditor",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: true,
        autoresize_min_height: 35,
        height: 100,
        custom_image_button_visible: false,
        //placeholder_class: { 'color': '#008000', 'margin': '8px', 'font-family': 'MuseoSans-700', 'font-size': '14px' },
        //placeholder: 'e.g. Great Job!',
        content_class: { 'color': '#008000', 'margin': '8px', 'font-family': 'MuseoSans-700', 'font-size': '14px' },
        hide_toolbar: true,
        shift_toolbar: true,
        allow_image_paste: false
    };

    public partiallyCorrectFeedBackSettings: TinymceConfig = {
        toolbar1: "equationeditor",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: true,
        autoresize_min_height: 35,
        height: 100,
        custom_image_button_visible: false,
        //placeholder_class: { 'color': '#df9032', 'margin': '8px', 'font-family': 'MuseoSans-700', 'font-size': '14px' },
        //placeholder: 'Nearly',
        content_class: { 'color': '#df9032', 'margin': '8px', 'font-family': 'MuseoSans-700', 'font-size': '14px' },
        hide_toolbar: true,
        shift_toolbar: true,
        allow_image_paste: false
    };

    public answerChoiceSettings: TinymceConfig = {
        toolbar1: "customimage | equationeditor",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: false,
        autoresize_min_height: 35,
        height: 100,
        custom_image_button_visible: false,
        content_class: { 'color': '#000' },
        hide_toolbar: true,
        shift_toolbar: true,
        show_border: true,
        border_class: 'tinymce_focus_green_border',
        element_name: 'answer',
        allow_image_paste: true
    };

    public rationaleChoiceSettings: TinymceConfig = {
        toolbar1: "equationeditor",
        plugins: "autoresize equationeditor",
        paste_as_text: true,
        autoresize_min_height: 35,
        height: 100,
        custom_image_button_visible: false,
        content_class: { 'color': '#ff0000' },
        hide_toolbar: true,
        shift_toolbar: true,
        element_name: 'rationale',
        allow_image_paste: false
    };

    public studentInstructionSettings: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | removeformat | bullist numlist | customimage equationeditor | outdent indent | fontselect",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: false,
        content_editable: false,
        placeholder_class: { 'color': '#999', 'margin': '0px' },
        placeholder: 'What are students supposed to be doing? What should students be getting out of it?',
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        allow_image_paste: true,
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public descriptionSettings: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | removeformat | bullist numlist | customimage equationeditor | outdent indent | fontselect",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: false,
        content_editable: false,
        placeholder_class: { 'color': '#999', 'margin': '0px' },
        placeholder: 'Add helpful keywords or author notes. The first 100 characters will appear in your playlist panel.',
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        allow_image_paste: true,
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public adminNotesSettings: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | removeformat | bullist numlist | equationeditor | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: false,
        content_editable: false,
        placeholder_class: { 'color': '#999', 'margin': '0px' },
        placeholder: 'Add helpful keywords or admin notes. The first 100 characters will appear in your playlist panel.',
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        allow_image_paste: false
    };

    public noteDescriptionSettings: TinymceConfig = {
        toolbar1: "bold italic underline  | customfontsize | fontselect  |  forecolor |link | table | removeformat | bullist numlist customimage | equationeditor | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor table",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        content_class: { 'color': '#000' },
        hide_toolbar: true,
        allow_image_paste: true,
        element_name: 'playlistNote',
        placeholder:'',
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public familyExplorationPromptSettings: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | fontselect | forecolor | removeformat | table | customimage equationeditor link | bullist numlist | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor table",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        placeholder_class: { 'color': '#999', 'margin': '0px', 'font-style': 'italic' },
        placeholder: 'Prompt students to report on the results of the activity with an open ended question.',
        content_class: { 'color': '#000' },
        hide_toolbar: true,
        allow_image_paste: true,
        element_name: 'familyExplorationPrompt',
        autosave: true,
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public familyExplorationDescriptionSetting: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | fontselect | forecolor | removeformat | table | customimage equationeditor link | bullist numlist | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor table",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        placeholder_class: { 'color': '#999', 'margin': '0px', 'font-style': 'italic' },
        placeholder: 'Use this section to provide instructions to students around the home activity. Include any materials they may need to use, steps they should take, and how their family partners should be involved.',
        content_class: { 'color': '#000' },
        hide_toolbar: true,
        allow_image_paste: true,
        element_name: 'familyExplorationDescription',
        autosave: true,
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };
    
    public taskResponseSettings: TinymceConfig = {
        toolbar1: "bold italic underline | link | removeformat | bullist numlist | equationeditor | outdent indent | fontselect",
        plugins: "autolink link lists charmap anchor textcolor image paste equationeditor",
        content_css: ['/Content/tinymce_custom_content.css', '/Content/custom-fonts.css', '/Content/mathquill.css', '/Content/equation_editor.css'],
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: false,
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        image_paste: false,
        allow_image_paste: true,
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public checkpointResponseSettings: TinymceConfig = {
        toolbar1: "bold italic underline | link | removeformat | bullist numlist | equationeditor | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
        content_css: ['/Content/tinymce_custom_content.css', '/Content/custom-fonts.css', '/Content/mathquill.css', '/Content/equation_editor.css'],
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: false,
        content_class: { 'color': '#000' },
        hide_toolbar: true,
        image_paste: false,
        allow_image_paste: false
    };

    public activityInstructionSettings: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | fontselect | forecolor | removeformat | table | customimage equationeditor link | bullist numlist | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor table",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        allow_image_paste: true,
        element_name: 'ActivityInstruction',
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public assessmentInstructionSettings: TinymceConfig = {
        toolbar1: "bold italic underline  | customfontsize | fontselect | forecolor | link | table | removeformat | bullist numlist customimage | equationeditor | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor table",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        allow_image_paste: true,
        placeholder_class: { 'color': '#999', 'margin': '0px', 'font-style': 'italic' },
        placeholder: 'Enter text that a student will see as a pop-up modal when beginning the assessment. If you do not enter text, the modal will not pop up, and students will begin on the first item.<br/>Examples: let students know the purpose of the assessment, remind students of tools or concepts they should use, or provide encouraging messaging.',
        element_name: 'assessment_instruction',
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

    public familyPlNoteSetting: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | fontselect | forecolor | removeformat | table | customimage equationeditor link | bullist numlist | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor table",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        placeholder: '',
        content_class: { 'color': '#000' },
        hide_toolbar: true,
        allow_image_paste: true,
        element_name: 'familyPlNote',
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };
   public checkInstructionSettings: TinymceConfig = {
        toolbar1: "bold italic underline | customfontsize | fontselect | forecolor | removeformat | table | customimage equationeditor link | bullist numlist | outdent indent",
        plugins: "autolink link lists charmap anchor textcolor colorpicker image paste autoresize equationeditor table",
        paste_as_text: false,
        autoresize_min_height: 100,
        height: 100,
        custom_image_button_visible: true,
        content_class: { 'color': '#000' },
        hide_toolbar: false,
        allow_image_paste: true,
        placeholder_class: { 'color': '#999', 'margin': '0px', 'font-style': 'italic' },
        //placeholder: 'Students, check your understanding by completing this multiple-choice problem.',
        element_name: 'CheckInstruction',
        font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
    };

   public studentInstructionFromPlayViewSettings: TinymceConfig = {
       toolbar1: "bold italic underline | customfontsize | removeformat | bullist numlist | customimage equationeditor | outdent indent | fontselect",
       plugins: "autolink link lists charmap anchor textcolor image paste autoresize equationeditor",
       paste_as_text: false,
       autoresize_min_height: 155,
       height: 155,
       custom_image_button_visible: false,
       content_editable: true,
       placeholder_class: { 'color': '#999', 'margin': '0px' },
       placeholder: 'What are students supposed to be doing? What should students be getting out of it?',
       content_class: { 'color': '#000' },
       hide_toolbar: false,
       allow_image_paste: true,
       element_name: 'StudentInstruction',
       font_formats: 'MuseoSans=MuseoSans-500;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats'
   };

   public rubricMaxResizeSettings: TinymceConfig = {
       autoresize_max_height: 590
   };
}