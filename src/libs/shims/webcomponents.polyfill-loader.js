// Module for loading scripts asynchronously in a specific order.
var jsLoader = (function () {
    // @public API
    var module = {};
    // @private
    var _concat = Array.prototype.concat;
    var _noop = function () { };
    var _scripts = [], _afterLoad = _noop, _onComplete = _noop;
    // @private
    var reduceRepeated = function () {
        return _scripts
            .sort(function (a, b) { return a.toLowerCase() - b.toLowerCase(); })
            .reduce(function (uniques, item) {
                // slice keeps reference when item is an object/array
                var last = uniques.slice(-1)[0];
                if (last !== item)
                    uniques.push(item);
                return uniques;
            }, _scripts.slice(0, 1));
    }; //initial value for @uniques
    // @private
    function createScriptTag() {
        // gets the first script in the list
        var script = _scripts.shift();
        if (!script) {
            // all scripts were loaded
            return _onComplete();
        }
        var js = document.createElement('script');
        js.type = 'text/javascript';
        js.src = script;
        js.defer = true;
        js.onload = function (event) {
            _afterLoad(script);
            // loads the next script
            createScriptTag();
        };
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(js, s);
    }
    // @public
    function addScript(src) {
        if (src instanceof Array) {
            _scripts = _concat.apply(_scripts, src);
        }
        else {
            _scripts.push(src);
        }
        return module;
    }
    // @public
    function load() {
        // prevent duplicated scripts
        _scripts = reduceRepeated();
        createScriptTag();
    }
    // @public
    function afterLoad(fn) {
        if (fn instanceof Function) {
            _afterLoad = fn;
        }
        return module;
    }
    // @public
    function onComplete(fn) {
        if (fn instanceof Function) {
            _onComplete = fn;
        }
        return module;
    }
    // @public
    function reset() {
        _scripts.length = 0;
        _onComplete = _afterLoad = _noop;
        return module;
    }
    // @public API
    module.addScript = addScript;
    module.load = load;
    module.reset = reset;
    module.afterLoad = afterLoad;
    module.onComplete = onComplete;
    return module;
}());



function loadJS(path) {
    var script = document.createElement('script');

    // Assign a URL to the script element
    script.src = path;

    // Get the first script tag on the page (we'll insert our new one before it)
    var ref = document.querySelector('script');

    // Insert the new node before the reference node
    ref.parentNode.insertBefore(script, ref);
}
function isPadOS() {
  
    var ua = navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    return iOS;
};

function thisBrowserType() {

    var browserType = "";
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    var isChromeMobile = (navigator.userAgent.indexOf('Chrome') != -1);

    //IsIPad
    var isIPad = isPadOS();

    switch (true) {
        case (isFirefox):
            browserType = "isFirefox";
            break;

        case (isEdge):
            browserType = "isEdge";
            break;
        case (isChrome || isChromeMobile ):
            browserType = "isChrome";
            break;

        case (isSafari):
            browserType = "isSafari";
            break;

        case (isIE):
            browserType = "isIE";
            break;
        case (isIPad):
            browserType = "isIPad";
            break;
        case (isEdge):
            browserType = "isEdge";
            break;
        case (isOpera):
            browserType = "isOpera";
            break;
    }


    return browserType;
}

