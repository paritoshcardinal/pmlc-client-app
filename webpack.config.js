var webpack = require('webpack');
const { AngularCompilerPlugin } = require('hydra-ngtools-webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
const ChunkRenamePlugin = require("webpack-chunk-rename-plugin");
var path = require('path');

var env = process.env.NODE_ENV;
console.log("Environment: " + env);

var appModule = __dirname + '/src/app/app.module#AppModule';

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}
module.exports = {
    mode: 'development',  //developers use mode:'development' 
    entry: {
		'main': './src/main.ts',
        'intlsafariIE': './src/internationalization/intlSafariIE.shim.ts',
        //polyfills and custom src
        'polyfills': './src/polyfills.ts',
	},

	output: {
		path: __dirname+"/src/dist/pmlc",
		filename: '[name].bundle.js',
		chunkFilename: "[chunkhash].chunk.js",
		publicPath: "http://localhost:8080/"
	},
    externals: {
        jquery: 'jQuery'
    },
	resolve: {
		extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
		modules: ['node_modules'],
        alias: {

            "shared2.0.1":                       srcPath('app/shared2.0.1'),
            "rxjs-operators":                    srcPath('rxjs-operators'),
            "myaccount-services":                srcPath('app/myaccount/services'),
            "myaccount-models":                  srcPath('app/myaccount/models'),
		    // shims for IE9
		    "es5_shim":         __dirname + "/src/libs/shims/es5-shim.js",
		    "ie9+shim":         __dirname + "/src/libs/shims/shims_for_IE.js",

		    //system js bundle starts
		    "system":           __dirname + "/src/libs/angular2/systemjs/dist/system.src.js",
		    "config":           __dirname + "/system.config.js",
		    //system js bundle ends

			//Jquery bundle starts
			"jquery":           __dirname + "/src/libs/jquery/jquery-2.1.1.js",
		    "jqueryui":         __dirname + "/src/libs/jquery/jquery-ui-1.9.2.js",
		    "jshashtable":      __dirname + "/src/libs/jquery/jshashtable.js",
		    "tmpl":             __dirname + "/src/libs/jquery/tmpl.js",
		    "dependclass":      __dirname + "/src/libs/jquery/jquery.dependClass-0.1.js",
		    "draggable": __dirname + "/src/libs/jquery/draggable-0.1.js",
		    "splitter":      __dirname + "/src/libs/jquery/jquery-splitter.js",
		    "timer": __dirname + "/src/libs/jquery/idle-timer.min.js",
		    "sortable": __dirname + "/src/libs/custom/sortable.js",
            "scrolltabs": __dirname + "/src/libs/custom/jquery.scrollTabs.js",
            "jqueryform": __dirname + '/src/libs/jquery/jquery.form.min.js',
            //jquery bundle ends
			
		    //custom bundle starts
            "custom":           __dirname + "/src/libs/custom/custommap.js",
            "jqueryslider":     __dirname + "/src/libs/custom/jquery.slider.js",
            "bootstrap":        __dirname + "/src/libs/custom/bootstrap.js",
            "bootstrap-switch": __dirname + "/src/libs/custom/bootstrap-switch.min.js",
            "alasql": __dirname + "/src/libs/custom/alasql.min.js",
            "bootstrapselect": __dirname + "/src/libs/bootstrap/bootstrap-select.js",
            //cutom bundle ends
            

            'taxonomy':         __dirname + '/src/app/js/taxonomy.js',
            'taxonomydata':     __dirname + '/src/app/js/taxonomyData.js',

            // Others
            'cropit': __dirname + '/src/app/js/cropit.js',
            'truncate': __dirname + '/src/app/js/truncate.js',
            'mathquill':        __dirname + '/src/libs/mathquill/mathquill.min.js',
            'equationeditor':   __dirname + '/src/libs/mathquill/equation_editor.js',
            "print":            __dirname + "/src/libs/jquery/jQuery.print.js",
            'fileApi':          __dirname + '/src/libs/FileAPI/FileAPI.min.js',
            'fileApiExt': __dirname + '/src/libs/FileAPI/FileAPI.exif.js',
            'zingchart': __dirname + '/src/libs/Slider/zingchart.2.6.1.min.js',
           

            //tinymce
            "tinymce":          __dirname + '/src/libs/tinymce_4.5.6/tinymce.min.js',
            "tinymceTheme": __dirname + '/src/libs/tinymce_4.5.6/themes/modern/theme.min.js',

		    //date-picker 
            "bootstrap-datepicker": __dirname + '/src/libs/bootstrap/bootstrap-datepicker.js',
		    //moment
            "moment": __dirname + '/src/libs/moment/moment.min.js',
		    //Daterangepicker
            "daterangepicker": __dirname + '/src/libs/daterangepicker/daterangepicker.js',
		    //UITouchPunch
            "uitouchpunch": __dirname + '/src/libs/jquery/jquery.ui.touch-punch.min.js',
		    //Scrollbar
            "jqueryscrollbar": __dirname + '/src/libs/jquery/jquery.scrollbar.min.js',
            //PIE MC
            "pie-configure" :  __dirname + '/src/libs/pie/pie-configure.js',
            "pie-controllers" :  __dirname + '/src/libs/pie/pie-controllers.js',
            "pie-view" :  __dirname + '/src/libs/pie/pie-view.js',
            "painterro": __dirname + '/src/libs/custom/painterro-0.2.71.min.js',
            "boxsdk": __dirname + '/src/libs/boxsdk/BoxSdk.min.js',
            // hammer.js for handling touch event(tap and double tap) on iPad
            "hammer":           __dirname + "/src/libs/jquery/hammer.js",
		}
	},

	devServer: {
        historyApiFallback: true,
        port: 8080,
        stats: 'minimal',
    },
	
	module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src/libs/pie'),
                loaders: ['uglify-loader', 'babel-loader'],
            },
        
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: 'hydra-ngtools-webpack'

            },
		
             {
                 test: /tinymce_4.5.6[\\/]skins[\\/]/,
                 loader: 'file?name=[path][name].[ext]&context=src/libs/tinymce_4.5.6/tinymce'
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
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
			{
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                exclude: /node_modules/,
                loader: 'file?name=assets/[name]-[hash:6].[ext]',
            },
			{
                test: /\.css$/,
                loader: 'raw-loader',
            },
            {

                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: { system: true }

            }
		]
      
	},
	
	plugins: [
		new CleanWebpackPlugin(
            [
                //'./src/dist'
            ]
        ),
		new HtmlWebpackPlugin({
			template: __dirname + '/src/index.html',
            output: __dirname + '/dist',
		}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'

        }),
        new AngularCompilerPlugin({
			mainPath: "main.ts",
            tsConfigPath: './tsconfig-aot.json',
            entryModule: [appModule],
            sourceMap: false,
            "skipCodeGeneration": true,         //skipCodeGeneration   true=JIT   false=AOT
        }),
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in unix and Windows
			/angular(\\|\/)core(\\|\/)/,
			'./src/', // location of your src
			{ }
		),
        new ChunkRenamePlugin({
            initialChunksWithEntry: true,
            vendor: "vendor.bundle.js"

        }),
      

         new copyWebpackPlugin([
        { from: './src/libs/tinymce_4.5.6/plugins', to: './plugins' },
        { from: './src/libs/tinymce_4.5.6/themes', to: './themes' },
        { from: './src/libs/tinymce_4.5.6/skins', to: './skins' }, 
        { from: './src/libs/pie', to: '.', ignore: ['*.js']  }
         ]),
		
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {

            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'all',
                    name: 'vendor',
                    enforce: true,
                    minChunks: 1,
                    priority: -12
                }

            }
        },
        /*minimize: true,
        noEmitOnErrors: false,
        minimizer: [new TerserPlugin({
            cache: true,
            parallel: true,
            terserOptions: {
                beautify: false,
                output: { comments: false },
                keep_fnames: true,
                compress: true,
            }

        })]*/


    }

};