System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var HttpMbeanProxyService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            HttpMbeanProxyService = (function () {
                function HttpMbeanProxyService(_http) {
                    this._http = _http;
                }
                HttpMbeanProxyService.prototype.getMBeanServers = function (addr) {
                    if (this.proxy == null)
                        throw Error("proxy server is null");
                    var url = "http://" + this.proxy.addr + getMBeanServerIdQueryUri(addr);
                    return this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                HttpMbeanProxyService.prototype.getMBeanDomains = function (addr, id) {
                    if (this.proxy == null)
                        throw Error("proxy server is null");
                    var url = "http://" + this.proxy.addr + getMBeanDomainsQueryUri(addr, id);
                    return this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                HttpMbeanProxyService.prototype.getMBeans = function (addr, id, domain) {
                    if (this.proxy == null)
                        throw Error("proxy server is null");
                    var url = "http://" + this.proxy.addr + getDomainMBeansQueryUri(addr, id, domain);
                    return this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                HttpMbeanProxyService.prototype.getAttributes = function (addr, id, oname) {
                    if (this.proxy == null)
                        throw Error("proxy server is null");
                    var url = "http://" + this.proxy.addr + getMBeanAttributesQueryUri(addr, id, oname);
                    return this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                HttpMbeanProxyService.prototype.getAttribute = function (addr, id, oname, aname, type) {
                    if (type === void 0) { type = null; }
                    if (this.proxy == null)
                        throw Error("proxy server is null");
                    var url = "http://" + this.proxy.addr + getMBeanAttributeQueryUri(addr, id, oname, aname, type);
                    var ret = this._http.get(url);
                    if (ret == null)
                        return null;
                    return ret.map(function (res) { return res.json(); }); //.catch(this.handleError)
                };
                HttpMbeanProxyService.prototype.handleError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error || 'Server error');
                };
                HttpMbeanProxyService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], HttpMbeanProxyService);
                return HttpMbeanProxyService;
                var _a;
            }());
            exports_1("HttpMbeanProxyService", HttpMbeanProxyService);
        }
    }
});
//# sourceMappingURL=http.mbean.proxy.service.js.map