System.register(['angular2/core', './server.input.component', "./service/server.list.service"], function(exports_1, context_1) {
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
    var core_1, server_input_component_1, server_list_service_1;
    var ServerListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (server_input_component_1_1) {
                server_input_component_1 = server_input_component_1_1;
            },
            function (server_list_service_1_1) {
                server_list_service_1 = server_list_service_1_1;
            }],
        execute: function() {
            ServerListComponent = (function () {
                /**
                 *
                 * @param _serverListService {@link ServerListService} provided by parent
                 */
                function ServerListComponent(_serverListService) {
                    this._serverListService = _serverListService;
                    /**
                     * event generated when jvm server selected
                     * @type {EventEmitter}
                     */
                    this.ServerSelected = new core_1.EventEmitter();
                    /**
                     * event generated when jvm server list is changed
                     * @type {EventEmitter}
                     */
                    this.ServerListChanged = new core_1.EventEmitter();
                    /**
                     * server list visible flag
                     * @type {boolean}
                     */
                    this.listVisible = true;
                }
                /**
                 * called when server selected
                 *
                 * set {@link ServerListComponent.selectedServer} then {@link ServerListComponent.ServerSelected} event emit
                 * @param server
                 */
                ServerListComponent.prototype.onServerSelect = function (server) {
                    this.selectedServer = server;
                    this.ServerSelected.emit(server);
                };
                /**
                 * called by input visible clicked
                 */
                ServerListComponent.prototype.onListVisible = function () {
                    this.listVisible = !this.listVisible;
                };
                /**
                 * event handler for addServer event from {@link ServerInputComponent}
                 *
                 * server add to {@link ServerListComponent.servers}, {@link ServerListService}
                 * generate event {@link ServerListChanged}
                 * @param e
                 */
                ServerListComponent.prototype.onAddServer = function (e) {
                    if (this.servers) {
                        this.servers.push(e);
                        var s = '';
                        for (var idx in this.servers) {
                            s += this.servers[idx].addr + ',';
                        }
                        if (s.length > 0) {
                            s = s.substr(0, s.length - 1);
                            this._serverListService.setServers(s);
                            this.ServerListChanged.emit(this.servers);
                        }
                    }
                };
                /**
                 * first get servers from {@link ServerListService}
                 * if {@link ServerListComponent.selectedServer} is null, set {@link ServerListComponent.listVisible} true
                 *
                 * if {@link selectedServer} is not null, set {@link listVisible} false
                 */
                ServerListComponent.prototype.ngOnInit = function () {
                    if (this._serverListService == null) {
                    }
                    else {
                        this.servers = this._serverListService.getServers();
                        if (this.selectedServer)
                            this.listVisible = false;
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ServerListComponent.prototype, "ServerSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ServerListComponent.prototype, "ServerListChanged", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ServerListComponent.prototype, "listVisible", void 0);
                __decorate([
                    core_1.HostListener('addServer', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ServerListComponent.prototype, "onAddServer", null);
                ServerListComponent = __decorate([
                    core_1.Component({
                        "selector": "server-list",
                        "templateUrl": "html/server.list.component.html",
                        "styleUrls": ["css/server.list.component.css"],
                        directives: [server_input_component_1.ServerInputComponent],
                    }), 
                    __metadata('design:paramtypes', [server_list_service_1.ServerListService])
                ], ServerListComponent);
                return ServerListComponent;
            }());
            exports_1("ServerListComponent", ServerListComponent);
        }
    }
});
//# sourceMappingURL=server.list.component.js.map