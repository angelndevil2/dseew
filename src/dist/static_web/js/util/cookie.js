System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cookie;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by k on 16. 3. 7.
             */
            Cookie = (function () {
                function Cookie() {
                    this._cookie = {};
                    this.getCookies(true);
                }
                Cookie.prototype.getCookies = function (force) {
                    if (force === void 0) { force = false; }
                    if (force) {
                        if (document.cookie) {
                            var cookie = document.cookie.split(";");
                            for (var idx in cookie) {
                                var o = cookie[idx].split("=");
                                try {
                                    this._cookie[o[0].trim()] = o[1];
                                }
                                catch (err) {
                                    this._cookie[o[0].trim()] = null;
                                }
                            }
                        }
                    }
                    return this._cookie;
                };
                Cookie.prototype.getCookie = function (id) {
                    return this._cookie[id];
                };
                Cookie.prototype.isExist = function (id) {
                    return this._cookie[id] != null;
                };
                Cookie.prototype.setCookie = function (id, value) {
                    this._cookie[id] = value;
                    document.cookie = id + "=" + value + ";";
                };
                return Cookie;
            }());
            exports_1("Cookie", Cookie);
        }
    }
});
//# sourceMappingURL=cookie.js.map