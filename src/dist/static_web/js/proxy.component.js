System.register(['angular2/core', "./lib/server", "./service/server.list.service", './service/http.mbean.proxy.service'], function(exports_1, context_1) {
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
    var core_1, server_1, server_list_service_1, http_mbean_proxy_service_1;
    var ProxyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (server_list_service_1_1) {
                server_list_service_1 = server_list_service_1_1;
            },
            function (http_mbean_proxy_service_1_1) {
                http_mbean_proxy_service_1 = http_mbean_proxy_service_1_1;
            }],
        execute: function() {
            ProxyComponent = (function () {
                /**
                 *
                 * @param _serverListService {@link ServerListService}comes from parent component
                 * @param _http {@link HttpMbeanProxyService} comes from parent component
                 */
                function ProxyComponent(_serverListService, _http) {
                    this._serverListService = _serverListService;
                    this._http = _http;
                    /**
                     * input box visible flag
                     * @type {boolean}
                     */
                    this.inputVisible = true;
                    /**
                     * event generated when proxy server set
                     * @type {EventEmitter}
                     */
                    this.setProxy = new core_1.EventEmitter();
                }
                /**
                 * called by input group's set button.
                 * set proxy server and register it to {@link ServerListService}.
                 *
                 * @param addr
                 */
                ProxyComponent.prototype.onSetProxy = function (addr) {
                    var server = new server_1.Server();
                    server.addr = addr;
                    this.proxy = server;
                    this._serverListService.setProxyServer(this.proxy);
                    this._http.proxy = server;
                    this.setProxy.emit(server);
                };
                /**
                 * called by input visible clicked
                 */
                ProxyComponent.prototype.onInputVisible = function () {
                    this.inputVisible = !this.inputVisible;
                };
                /**
                 * first get proxy from {@link ServerListService}
                 */
                ProxyComponent.prototype.ngOnInit = function () {
                    this.proxy = this._serverListService.getProxyServer();
                    this._http.proxy = this.proxy;
                    this.setProxy.emit(this.proxy);
                    if (this.proxy) {
                        this.inputVisible = false;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ProxyComponent.prototype, "inputVisible", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ProxyComponent.prototype, "setProxy", void 0);
                ProxyComponent = __decorate([
                    core_1.Component({
                        "selector": "proxy-component",
                        "templateUrl": "html/proxy.component.html"
                    }), 
                    __metadata('design:paramtypes', [server_list_service_1.ServerListService, http_mbean_proxy_service_1.HttpMbeanProxyService])
                ], ProxyComponent);
                return ProxyComponent;
            }());
            exports_1("ProxyComponent", ProxyComponent);
        }
    }
});
//# sourceMappingURL=proxy.component.js.map