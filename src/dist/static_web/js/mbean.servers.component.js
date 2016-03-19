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
    var MBeanServersComponent;
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
            MBeanServersComponent = (function () {
                /**
                 *
                 * @param httpMbeanProxy {@link HttpMbeanProxyService} provided by parent
                 */
                function MBeanServersComponent(_http) {
                    this._http = _http;
                    /**
                     * generated when {@link MBeanServer} selected
                     *
                     * @type {EventEmitter}
                     */
                    this.MBeanServerSelected = new core_2.EventEmitter();
                    /**
                     * generated when {@link MBeanServersComponent.servers} is changed
                     * @type {EventEmitter}
                     */
                    this.MBeanServerListChanged = new core_2.EventEmitter();
                    /**
                     * mbean server list visible flag
                     * @type {boolean}
                     */
                    this.listVisible = false;
                }
                /**
                 * when selected jvm server is changed, reload {@link MBeanServersComponent.servers}
                 * @param changes
                 */
                MBeanServersComponent.prototype.ngOnChanges = function (changes) {
                    // initailizing or can be check by each isFirstChange method
                    // eg. if (changes['porxy'],isFirstChange()) ...
                    if ("selectedServer" in changes && !changes["selectedServer"].isFirstChange()) {
                        this.getMBeanServers(changes["selectedServer"].currentValue);
                        this.selectedMBeanServer = null;
                    }
                };
                /**
                 * get mbean servers from selected server
                 * @param server
                 */
                MBeanServersComponent.prototype.getMBeanServers = function (server) {
                    var self = this;
                    this._http.getMBeanServers(server.addr)
                        .subscribe(function (data) { return (function (data) {
                        var servers = [];
                        for (var idx in data) {
                            servers.push({ id: data[idx], name: data[idx] });
                        }
                        self.servers = servers;
                        self.MBeanServerListChanged.emit(self.servers);
                        if (servers.length)
                            self.listVisible = true;
                    })(data); }, function (err) { return (function (err) {
                        console.log(err);
                        self.servers = null;
                        self.MBeanServerListChanged.emit(self.servers);
                    })(err); });
                };
                /**
                 *
                 * @param server {@link MBeanServer}
                 */
                MBeanServersComponent.prototype.onSelectMBeanSever = function (server) {
                    this.selectedMBeanServer = server;
                    this.MBeanServerSelected.emit(server);
                };
                /**
                 * called when {@link MBeanServersComponent.listVisible} is changed
                 */
                MBeanServersComponent.prototype.onListVisible = function () {
                    this.listVisible = !this.listVisible;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_2.EventEmitter)
                ], MBeanServersComponent.prototype, "MBeanServerSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_2.EventEmitter)
                ], MBeanServersComponent.prototype, "MBeanServerListChanged", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', server_1.Server)
                ], MBeanServersComponent.prototype, "selectedServer", void 0);
                MBeanServersComponent = __decorate([
                    core_1.Component({
                        "selector": "mbean-servers",
                        "templateUrl": "html/mbean.servers.component.html",
                        "styleUrls": ["css/mbean.servers.component.css"]
                    }), 
                    __metadata('design:paramtypes', [http_mbean_proxy_service_1.HttpMbeanProxyService])
                ], MBeanServersComponent);
                return MBeanServersComponent;
            }());
            exports_1("MBeanServersComponent", MBeanServersComponent);
        }
    }
});
//# sourceMappingURL=mbean.servers.component.js.map