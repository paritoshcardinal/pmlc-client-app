
(function (exports) {
    if (("Intl" in exports) != true) {
      ()=> {
            import('intl');
            import('intl/locale-data/jsonp/en.js');
        };

    }
} (this));