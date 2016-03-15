System.register(["angular2/core", "./lib/server", "./service/http.mbean.proxy.service", 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, server_1, http_mbean_proxy_service_1, core_2;
    var MbeanServersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (http_mbean_proxy_service_1_1) {
                http_mbean_proxy_service_1 = http_mbean_proxy_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            MbeanServersComponent = (function () {
                function MbeanServersComponent(httpMbeanProxy) {
                    this.httpMbeanProxy = httpMbeanProxy;
                    this.selectMBeanServer = new core_2.EventEmitter();
                }
                MbeanServersComponent.prototype.ngOnChanges = function (changes) {
                    // initailizing or can be check by each isFirstChange method
                    // eg. if (changes['porxy'],isFirstChange()) ...
                    if ("proxy" in changes && "selected" in changes) {
                        this.httpMbeanProxy.proxy = changes['proxy'].currentValue;
                    }
                    else {
                        if ("proxy" in changes) {
                            this.httpMbeanProxy.proxy = changes['proxy'].currentValue;
                        }
                        if ("selected" in changes) {
                            var selected = changes['selected'];
                            this.getMBeanServers(selected.currentValue);
                        }
                    }
                };
                /**
                 * get mbean servers from selected server
                 * @param server
                 */
                MbeanServersComponent.prototype.getMBeanServers = function (server) {
                    var self = this;
                    this.httpMbeanProxy.getMBeanServers(server.addr)
                        .subscribe(function (data) { return (function (data) {
                        var servers = [];
                        for (var idx in data) {
                            servers.push({ id: data[idx], name: data[idx] });
                        }
                        self.servers = servers;
                    })(data); }, function (err) { return console.log(err); });
                };
                MbeanServersComponent.prototype.onSelectMBeanSever = function (server) {
                    this.selectedMBeanServer = server;
                    this.selectMBeanServer.emit(server);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', (typeof (_a = typeof core_2.EventEmitter !== 'undefined' && core_2.EventEmitter) === 'function' && _a) || Object)
                ], MbeanServersComponent.prototype, "selectMBeanServer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', (typeof (_b = typeof server_1.Server !== 'undefined' && server_1.Server) === 'function' && _b) || Object)
                ], MbeanServersComponent.prototype, "proxy", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', (typeof (_c = typeof server_1.Server !== 'undefined' && server_1.Server) === 'function' && _c) || Object)
                ], MbeanServersComponent.prototype, "selected", void 0);
                MbeanServersComponent = __decorate([
                    core_1.Component({
                        "selector": "mbean-servers",
                        "templateUrl": "html/mbean.servers.component.html",
                        "styleUrls": ["css/mbean.servers.component.css"]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_d = typeof http_mbean_proxy_service_1.HttpMbeanProxyService !== 'undefined' && http_mbean_proxy_service_1.HttpMbeanProxyService) === 'function' && _d) || Object])
                ], MbeanServersComponent);
                return MbeanServersComponent;
                var _a, _b, _c, _d;
            }());
            exports_1("MbeanServersComponent", MbeanServersComponent);
        }
    }
});
//# sourceMappingURL=mbean.servers.component.js.map