System.register(['angular2/core', './server.list.component', './mbean.servers.component', './lib/server', "./mbeans.component", "./service/http.mbean.proxy.service", "./mbean.doamins.component", "./lib/mbean", './proxy.component', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, server_list_component_1, mbean_servers_component_1, server_1, mbeans_component_1, http_mbean_proxy_service_1, mbean_doamins_component_1, mbean_1, proxy_component_1;
    var MBeanExplorerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (server_list_component_1_1) {
                server_list_component_1 = server_list_component_1_1;
            },
            function (mbean_servers_component_1_1) {
                mbean_servers_component_1 = mbean_servers_component_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (mbeans_component_1_1) {
                mbeans_component_1 = mbeans_component_1_1;
            },
            function (http_mbean_proxy_service_1_1) {
                http_mbean_proxy_service_1 = http_mbean_proxy_service_1_1;
            },
            function (mbean_doamins_component_1_1) {
                mbean_doamins_component_1 = mbean_doamins_component_1_1;
            },
            function (mbean_1_1) {
                mbean_1 = mbean_1_1;
            },
            function (proxy_component_1_1) {
                proxy_component_1 = proxy_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            MBeanExplorerComponent = (function () {
                function MBeanExplorerComponent(_http) {
                    this._http = _http;
                }
                /**
                 * listen from {@link ProxyComponent}
                 * @param e
                 */
                MBeanExplorerComponent.prototype.onSetProxy = function (e) {
                    this.proxy = e;
                };
                /**
                 * listen from {@link ServerListComponent}
                 *
                 * @param e
                 */
                MBeanExplorerComponent.prototype.onServerListChanged = function (e) {
                    this.selectedMBeanServer = null;
                    this.selectedMBeanDomain = null;
                    this.domains = null;
                    this.mbeans = null;
                    this.mbeanAttributes = null;
                    this.servers = e;
                };
                /**
                 * listen from {@link ServerListComponent}
                 *
                 * @param e
                 */
                MBeanExplorerComponent.prototype.onSelectServer = function (e) {
                    this.selectedMBeanServer = null;
                    this.selectedMBeanDomain = null;
                    this.domains = null;
                    this.mbeans = null;
                    this.mbeanAttributes = null;
                    this.selectedServer = e;
                };
                /**
                 *  listen from {@link MBeanServersComponent}
                 * @param e
                 */
                MBeanExplorerComponent.prototype.onMBeanServerListChange = function (e) {
                    this.selectedMBeanDomain = null;
                    this.domains = null;
                    this.mbeans = null;
                    this.mbeanAttributes = null;
                    this.mbeanServers = e;
                };
                /**
                 *  listen from {@link MBeanServersComponent}
                 * @param e
                 */
                MBeanExplorerComponent.prototype.onSelectMBeanServer = function (e) {
                    this.domains = null;
                    this.mbeans = null;
                    this.mbeanAttributes = null;
                    this.selectedMBeanDomain = null;
                    this.selectedMBeanServer = e;
                };
                /**
                 *  listen from {@link MBeanDomainsComponent}
                 * @param e
                 */
                MBeanExplorerComponent.prototype.onSelectMBeanDomain = function (e) {
                    this.mbeans = null;
                    this.mbeanAttributes = null;
                    this.selectedMBeanDomain = e;
                };
                /**
                 *  listen from {@link MBeanDomainsComponent}
                 * @param e
                 */
                MBeanExplorerComponent.prototype.onMBeanDomainListChange = function (e) {
                    this.selectedMBeanDomain = null;
                    this.mbeans = null;
                    this.mbeanAttributes = null;
                    this.domains = e;
                };
                MBeanExplorerComponent.prototype.getAttributes = function (e) {
                    var self = this;
                    this.selectedMBean = e;
                    this._http.getAttributes(this.selectedServer.addr, this.selectedMBeanServer.id, e.objectName)
                        .subscribe(function (data) { return (function (data) {
                        var attributes = [];
                        for (var idx in data) {
                            try {
                                attributes.push(new mbean_1.MBeanAttribute(data[idx]));
                            }
                            catch (err) {
                                console.error(err);
                            }
                        }
                        self.mbeanAttributes = attributes;
                    })(data); }, function (err) { return console.error(err); });
                };
                MBeanExplorerComponent.prototype.ngOnInit = function () {
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', server_1.Server)
                ], MBeanExplorerComponent.prototype, "selectedServer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', mbean_1.MBeanServer)
                ], MBeanExplorerComponent.prototype, "selectedMBeanServer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MBeanExplorerComponent.prototype, "selectedMBeanDomain", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MBeanExplorerComponent.prototype, "servers", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MBeanExplorerComponent.prototype, "domains", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MBeanExplorerComponent.prototype, "mbeans", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', mbean_1.MBean)
                ], MBeanExplorerComponent.prototype, "selectedMBean", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MBeanExplorerComponent.prototype, "mbeanAttributes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', server_1.Server)
                ], MBeanExplorerComponent.prototype, "proxy", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MBeanExplorerComponent.prototype, "mbeanServers", void 0);
                __decorate([
                    core_1.HostListener('setProxy', ['proxy']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSetProxy", null);
                __decorate([
                    core_1.HostListener('ServerListChanged', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onServerListChanged", null);
                __decorate([
                    core_1.HostListener('ServerSelected', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSelectServer", null);
                __decorate([
                    core_1.HostListener('MBeanSeverListChanged', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onMBeanServerListChange", null);
                __decorate([
                    core_1.HostListener('MBeanServerSelected', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSelectMBeanServer", null);
                __decorate([
                    core_1.HostListener('MBeanDomainSelected', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSelectMBeanDomain", null);
                __decorate([
                    core_1.HostListener('MBeanDomainListChanged', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onMBeanDomainListChange", null);
                __decorate([
                    core_1.HostListener('get_attributes', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "getAttributes", null);
                MBeanExplorerComponent = __decorate([
                    core_1.Component({
                        selector: "mbean-explorer",
                        templateUrl: 'html/mbean.explorer.component.html',
                        styleUrls: ['css/mbean.explorer.component.css'],
                        directives: [
                            server_list_component_1.ServerListComponent,
                            mbean_servers_component_1.MBeanServersComponent,
                            mbeans_component_1.MbeansComponent,
                            mbean_doamins_component_1.MBeanDomainsComponent,
                            proxy_component_1.ProxyComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [http_mbean_proxy_service_1.HttpMbeanProxyService])
                ], MBeanExplorerComponent);
                return MBeanExplorerComponent;
            }());
            exports_1("MBeanExplorerComponent", MBeanExplorerComponent);
        }
    }
});
//# sourceMappingURL=mbean.explorer.component.js.map