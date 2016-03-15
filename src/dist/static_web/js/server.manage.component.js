System.register(['angular2/core', './server.input.component', './proxy.input.component', './service/server.list.service', './server.list.component'], function(exports_1, context_1) {
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
    var core_1, server_input_component_1, proxy_input_component_1, server_list_service_1, server_list_component_1;
    var ServerManageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (server_input_component_1_1) {
                server_input_component_1 = server_input_component_1_1;
            },
            function (proxy_input_component_1_1) {
                proxy_input_component_1 = proxy_input_component_1_1;
            },
            function (server_list_service_1_1) {
                server_list_service_1 = server_list_service_1_1;
            },
            function (server_list_component_1_1) {
                server_list_component_1 = server_list_component_1_1;
            }],
        execute: function() {
            ServerManageComponent = (function () {
                function ServerManageComponent(_serverListService) {
                    this._serverListService = _serverListService;
                    this.servers = [];
                }
                ServerManageComponent.prototype.onAddServer = function (e) {
                    if (this.servers) {
                        this.servers.push(e);
                        var s = '';
                        for (var idx in this.servers) {
                            s += this.servers[idx].addr + ',';
                        }
                        if (s.length > 0) {
                            s = s.substr(0, s.length - 1);
                            this._serverListService.setServers(s);
                        }
                    }
                };
                ServerManageComponent.prototype.onSetProxy = function (e) {
                    this.proxy = e;
                    this._serverListService.setProxyServer(this.proxy);
                };
                ServerManageComponent.prototype.ngOnInit = function () {
                    this.servers = this._serverListService.getServers();
                    this.proxy = this._serverListService.getProxyServer();
                };
                __decorate([
                    core_1.HostListener('addServer', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ServerManageComponent.prototype, "onAddServer", null);
                __decorate([
                    core_1.HostListener('setProxy', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ServerManageComponent.prototype, "onSetProxy", null);
                ServerManageComponent = __decorate([
                    core_1.Component({
                        selector: "server-manage",
                        templateUrl: 'html/server.manage.component.html',
                        directives: [server_input_component_1.ServerInputComponent, proxy_input_component_1.ProxyInputComponent, server_list_component_1.ServerListComponent]
                    }), 
                    __metadata('design:paramtypes', [server_list_service_1.ServerListService])
                ], ServerManageComponent);
                return ServerManageComponent;
            }());
            exports_1("ServerManageComponent", ServerManageComponent);
        }
    }
});
//# sourceMappingURL=server.manage.component.js.map