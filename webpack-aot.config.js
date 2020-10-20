
const { AngularCompilerPlugin } = require('hydra-ngtools-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var path = require('path');


var env = process.env.NODE_ENV;
console.log("Environment: " + env);


var mycommunityModule = __dirname + '/Scripts/apps/mycommunities/app/mycommunities.app.module#MyCommunitiesAppModule';
var authenticationModule = __dirname + '/Scripts/apps/authentication/app/authentication.app.module#AuthenticationAppModule';
var libraryModule = __dirname + '/Scripts/apps/library/app/library.app.module#LibraryAppModule';
var playlistsModule = __dirname + '/Scripts/apps/myplaylists/app/myplaylists.app.module#MyPlaylistsAppModule';
var myClassesModule = __dirname + '/Scripts/apps/myclasses/app/myclasses.app.module#MyClassesAppModule';
var myAccountModule = __dirname + '/Scripts/apps/myaccount/app/myaccount.app.module#MyAccountAppModule';
var notificationModule = __dirname + '/Scripts/apps/notifications/all.notification.module#AllNotificationModule';
var notificationSettingModule = __dirname + '/Scripts/apps/notifications/notification.setting.module#NotificationSettingModule';
var dashboardModule = __dirname + '/Scripts/apps/dashboard/app/dashboard.app.module#DashBoardAppModule';
var schoolAdminModule = __dirname + '/Scripts/apps/school/app/school.module#SchoolModule';
var studentClassesModule = __dirname + '/Scripts/apps/classes/app/classes.app.module#StudentClassesAppModule';
var parentmychildrenModule = __dirname + '/Scripts/apps/mychildren/app/mychildren.app.module#ParentChildAppModule';

module.exports = {
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {

            // shims for IE9
            "es5_shim": __dirname + "/Scripts/libs/shims/es5-shim.js",
            "ie9+shim": __dirname + "/Scripts/libs/shims/shims_for_IE.js",

            //system js bundle starts
            "system": __dirname + "/Scripts/libs/angular2/systemjs/dist/system.src.js",
            "config": __dirname + "/system.config.js",
            //system js bundle ends

            //Jquery bundle starts
            "jquery": __dirname + "/Scripts/libs/jquery/jquery-2.0.0.js",
            "jqueryui": __dirname + "/Scripts/libs/jquery/jquery-ui-1.9.2.js",
            "jshashtable": __dirname + "/Scripts/libs/jquery/jshashtable.js",
            "tmpl": __dirname + "/Scripts/libs/jquery/tmpl.js",
            "dependclass": __dirname + "/Scripts/libs/jquery/jquery.dependClass-0.1.js",
            "draggable": __dirname + "/Scripts/libs/jquery/draggable-0.1.js",
            "timer": __dirname + "/Scripts/libs/jquery/idle-timer.min.js",
            "sortable": __dirname + "/Scripts/libs/custom/sortable.js",
            "scrolltabs": __dirname + "/Scripts/libs/custom/jquery.scrollTabs.js",
            //jquery bundle ends

            //custom bundle starts
            "custom": __dirname + "/Scripts/libs/custom/custommap.js",
            "jqueryslider": __dirname + "/Scripts/libs/custom/jquery.slider.js",
            "bootstrap": __dirname + "/Scripts/libs/custom/bootstrap.js",
            "bootstrap-switch": __dirname + "/Scripts/libs/custom/bootstrap-switch.min.js",
            "alasql": __dirname + "/Scripts/libs/custom/alasql.min.js",
            "bootstrapselect": __dirname + "/Scripts/libs/bootstrap/bootstrap-select.js",
            //cutom bundle ends


            'taxonomy': __dirname + '/Scripts/apps/js/taxonomy.js',
            'taxonomydata': __dirname + '/Scripts/apps/js/taxonomyData.js',

            // Others
            'cropit': __dirname + '/Scripts/apps/js/cropit.js',
            'truncate': __dirname + '/Scripts/apps/js/truncate.js',
            'mathquill': __dirname + '/Scripts/libs/mathquill/mathquill.min.js',
            'equationeditor': __dirname + '/Scripts/libs/mathquill/equation_editor.js',
            "print": __dirname + "/Scripts/libs/jquery/jQuery.print.js",
            'fileApi': __dirname + '/Scripts/libs/FileAPI/FileAPI.min.js',
            'fileApiExt': __dirname + '/Scripts/libs/FileAPI/FileAPI.exif.js',
            'zingchart': __dirname + '/Scripts/libs/Slider/zingchart.2.6.1.min.js',


            //tinymce
            "tinymce": __dirname + '/Scripts/libs/tinymce_4.5.6/tinymce.min.js',
            "tinymceTheme": __dirname + '/Scripts/libs/tinymce_4.5.6/themes/modern/theme.min.js',

            //date-picker 
            "bootstrap-datepicker": __dirname + '/Scripts/libs/bootstrap/bootstrap-datepicker.js',
            //moment
            "moment": __dirname + '/Scripts/libs/moment/moment.min.js',
            //Daterangepicker
            "daterangepicker": __dirname + '/Scripts/libs/daterangepicker/daterangepicker.js',

            //UITouchPunch
            "uitouchpunch": __dirname + '/Scripts/libs/jquery/jquery.ui.touch-punch.min.js',
            //Scrollbar
            "jqueryscrollbar": __dirname + '/Scripts/libs/jquery/jquery.scrollbar.min.js'
        }
    },
    entry: {
        "mycommunities": './Scripts/apps/mycommunities/app/mycommunities.app.entrypoint.ts',
        'authentication': './Scripts/apps/authentication/app/authentication.app.entrypoint.ts',
        'library': './Scripts/apps/library/app/library.entrypoint.ts',
        'myplaylists': './Scripts/apps/myplaylists/app/myplaylists.app.entrypoint.ts',
        'myclasses': './Scripts/apps/myclasses/app/myclasses.app.entrypoint.ts',
        'myaccount': './Scripts/apps/myaccount/app/myaccount.app.entrypoint.ts',
        'notifications': './Scripts/apps/notifications/all.notification.entrypoint.ts',
        'notificationsettings': './Scripts/apps/notifications/notification.setting.entrypoint.ts',
        'dashboard': './Scripts/apps/dashboard/app/dashboard.app.entrypoint.ts',
        'schooladmin': './Scripts/apps/school/app/school.entrypoint.ts',
        'studentclasses': './Scripts/apps/classes/app/classes.app.entrypoint.ts',
        'parentmychildren': './Scripts/apps/mychildren/app/mychildren.app.entrypoint.ts',
        'taxonomy': './Scripts/taxonomy.ts',
        vendor: ['core-js/es6/symbol',
            'core-js/es6/object',
            'core-js/es6/function',
            'core-js/es6/parse-int',
            'core-js/es6/parse-float',
            'core-js/es6/number',
            'core-js/es6/math',
            'core-js/es6/string',
            'core-js/es6/date',
            'core-js/es6/array',
            'core-js/es6/regexp',
            'core-js/es6/map',
            'core-js/es6/set',
            'core-js/es6/weak-map',
            'core-js/es6/weak-set',
            'core-js/es6/typed',
            'core-js/es6/reflect',
            'core-js/es7/reflect',
            'zone.js/dist/zone',
            'ts-helpers',
            './Scripts/vendor.ts'
        ],

    },
    output: {
        path: path.resolve(__dirname, 'Scripts/dist'),
        filename: '[name].bundle.js',
        chunkFilename: "[chunkhash].chunk.js",
        publicPath: "./Scripts/dist/"
    },
 
    
    plugins: [
new CleanWebpackPlugin(
            [
                './Scripts/dist'
            ]
        ),
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig-aot.json',
            entryModule: [authenticationModule,
                mycommunityModule, libraryModule, playlistsModule,
                myClassesModule, myAccountModule, notificationModule, notificationSettingModule,
                dashboardModule, schoolAdminModule, studentClassesModule, parentmychildrenModule],
            sourceMap: false
        }),
      
        new UglifyJsPlugin({
            parallel: true,
            cache: true,

            uglifyOptions: {
                 compress:true,
                 output: {
                     comments: false,
                     beautify: false
                 }
             }
        }),
       
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
            './Scripts/', // location of your src
            {}
        ),

        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),

        new CopyWebpackPlugin([
            { from: './Scripts/libs/tinymce_4.5.6/plugins', to: './plugins' },
            { from: './Scripts/libs/tinymce_4.5.6/themes', to: './themes' },
            { from: './Scripts/libs/tinymce_4.5.6/skins', to: './skins' }
        ]),

    ],
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: 'hydra-ngtools-webpack'
                
            },
            {
                test: /jquery\.js$/,
                loader: 'expose?jQuery!expose?$'
            },

            { test: /\.scss$/, use: ['raw-loader', 'sass-loader'] },
            { test: /\.css$/, use: 'raw-loader' },
            { test: /\.html$/, use: 'raw-loader' },
            {
                test: /tinymce_4.5.6[\\/]skins[\\/]/,
                loader: 'file?name=[path][name].[ext]&context=Scripts/libs/tinymce_4.5.6/tinymce'
            },
           
            {
                test: /tinymce_4.5.6[\\/]tinymce[\\/]/,
                loaders: [
                    'imports-loader?this=>window',
                    'exports-loader?window.tinymce'
                ]
            },
            {
                test: /tinymce_4.5.6\/(themes|plugins)\//,
                loader: 'imports-loader?this=>window'
            },
          
          
        ]
    }
   
};

