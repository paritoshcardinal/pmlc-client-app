
//ie shims
require('script-loader!es5_shim');
require('script-loader!ie9+shim');

//Systemjs
require('script-loader!system');
require('script-loader!config');

require('script-loader!jqueryui');
import "expose-loader?$!jquery";
import "expose-loader?jQuery!jquery";
require('script-loader!jshashtable');
require('script-loader!tmpl');
require('script-loader!dependclass');
require('script-loader!draggable');
require('script-loader!splitter');
require('script-loader!jqueryslider');
require('script-loader!custom');
require('script-loader!timer');
require('script-loader!sortable');
require('script-loader!alasql');
require('script-loader!moment');
require('script-loader!scrolltabs');
require('script-loader!jqueryform');

//bootstrap
require('script-loader!bootstrap');
require('script-loader!bootstrap-switch'); ///fnd out were we need
require('script-loader!fileApi');
require('script-loader!fileApiExt');
require('script-loader!tinymce');
require('script-loader!tinymceTheme');
require('script-loader!mathquill');
require('script-loader!equationeditor');
require('script-loader!print');
require('script-loader!bootstrapselect');

//PML app js 
require('script-loader!painterro');
require('script-loader!cropit');
require('script-loader!truncate');
require('script-loader!zingchart');
//Date picker (Jquery UI also has Date picker but we are using this one )
require('script-loader!bootstrap-datepicker');
//Daterangepicker
require('script-loader!daterangepicker');
//UITouchPunch
require('script-loader!uitouchpunch');
//Scrollbar
require('script-loader!jqueryscrollbar');
//boxsdk
require('script-loader!boxsdk');
// hammer.js for handling touch event(tap and double tap) on iPad
require('script-loader!hammer');