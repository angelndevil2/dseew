System.register(['angular2/core', './server.list.component', './mbean.servers.component', './lib/server', "./service/server.list.service", "./mbeans.component", "./service/http.mbean.proxy.service", "./mbean.doamins.component", "./lib/mbean", "./mbean.attributes.component", './proxy.input.component', './server.input.component', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, server_list_component_1, mbean_servers_component_1, server_1, server_list_service_1, mbeans_component_1, http_mbean_proxy_service_1, mbean_doamins_component_1, mbean_1, mbean_attributes_component_1, proxy_input_component_1, server_input_component_1;
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
            function (server_list_service_1_1) {
                server_list_service_1 = server_list_service_1_1;
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
            function (mbean_attributes_component_1_1) {
                mbean_attributes_component_1 = mbean_attributes_component_1_1;
            },
            function (proxy_input_component_1_1) {
                proxy_input_component_1 = proxy_input_component_1_1;
            },
            function (server_input_component_1_1) {
                server_input_component_1 = server_input_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            MBeanExplorerComponent = (function () {
                function MBeanExplorerComponent(_serverListService, _http) {
                    this._serverListService = _serverListService;
                    this._http = _http;
                }
                MBeanExplorerComponent.prototype.onSelectServer = function (e) {
                    this.selected = e;
                    this.selectedMBeanServer = null;
                    this.selectedMBeanDomain = null;
                    this.mbeans = null;
                };
                MBeanExplorerComponent.prototype.onSelectMBeanServer = function (e) {
                    this.selectedMBeanServer = e;
                    this.selectedMBeanDomain = null;
                    this.mbeans = null;
                    var self = this;
                    this._http.getMBeanDomains(this.selected.addr, e.id)
                        .subscribe(function (data) { return (function (data) {
                        var domains = [];
                        for (var idx in data) {
                            domains.push(data[idx]);
                        }
                        self.domains = domains;
                    })(data); }, function (err) { return console.error(err); });
                };
                MBeanExplorerComponent.prototype.onSelectMBeanDomain = function (e) {
                    this.selectedMBeanDomain = e;
                    this.mbeans = null;
                    var self = this;
                    this._http.getMBeans(this.selected.addr, this.selectedMBeanServer.id, e)
                        .subscribe(function (data) { return (function (data) {
                        var mbeans = [];
                        for (var idx in data) {
                            var mbean = new mbean_1.MBean();
                            mbean.domain = e;
                            mbean.objectName = data[idx];
                            mbean.nameValues = self.parseMBean(data[idx]);
                            mbeans.push(mbean);
                        }
                        self.mbeans = mbeans;
                    })(data); }, function (err) { return console.error(err); });
                };
                MBeanExplorerComponent.prototype.onSetProxy = function (e) {
                    this.proxy = e;
                    this._serverListService.setProxyServer(this.proxy);
                };
                MBeanExplorerComponent.prototype.onAddServer = function (e) {
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
                MBeanExplorerComponent.prototype.getAttributes = function (e) {
                    var self = this;
                    this.selectedMBean = e;
                    this._http.getAttributes(this.selected.addr, this.selectedMBeanServer.id, e.objectName)
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
                    this.servers = this._serverListService.getServers();
                    this.proxy = this._serverListService.getProxyServer();
                };
                MBeanExplorerComponent.prototype.parseMBean = function (objectName) {
                    var ret = {};
                    var domainSplit = objectName.split(":");
                    var domainRemoved = objectName;
                    if (domainSplit.length > 1) {
                        domainRemoved = domainSplit[1];
                    }
                    var objectNameArray = domainRemoved.split(",");
                    for (var idx in objectNameArray) {
                        try {
                            var nameValue = objectNameArray[idx].split("=");
                            ret[nameValue[0]] = nameValue[1];
                        }
                        catch (err) {
                            console.error(err);
                        }
                    }
                    return ret;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', (typeof (_a = typeof server_1.Server !== 'undefined' && server_1.Server) === 'function' && _a) || Object)
                ], MBeanExplorerComponent.prototype, "selected", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MBeanExplorerComponent.prototype, "servers", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', (typeof (_b = typeof server_1.Server !== 'undefined' && server_1.Server) === 'function' && _b) || Object)
                ], MBeanExplorerComponent.prototype, "proxy", void 0);
                __decorate([
                    core_1.HostListener('selectServer', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSelectServer", null);
                __decorate([
                    core_1.HostListener('selectMBeanServer', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSelectMBeanServer", null);
                __decorate([
                    core_1.HostListener('selectMBeanDomain', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSelectMBeanDomain", null);
                __decorate([
                    core_1.HostListener('setProxy', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onSetProxy", null);
                __decorate([
                    core_1.HostListener('addServer', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], MBeanExplorerComponent.prototype, "onAddServer", null);
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
                            mbean_servers_component_1.MbeanServersComponent,
                            mbeans_component_1.MbeansComponent,
                            mbean_doamins_component_1.MBeanDomainsComponent,
                            mbean_attributes_component_1.MBeanAttributesComponent,
                            server_input_component_1.ServerInputComponent,
                            proxy_input_component_1.ProxyInputComponent
                        ],
                        providers: [server_list_service_1.ServerListService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_c = typeof server_list_service_1.ServerListService !== 'undefined' && server_list_service_1.ServerListService) === 'function' && _c) || Object, (typeof (_d = typeof http_mbean_proxy_service_1.HttpMbeanProxyService !== 'undefined' && http_mbean_proxy_service_1.HttpMbeanProxyService) === 'function' && _d) || Object])
                ], MBeanExplorerComponent);
                return MBeanExplorerComponent;
                var _a, _b, _c, _d;
            }());
            exports_1("MBeanExplorerComponent", MBeanExplorerComponent);
        }
    }
});
//# sourceMappingURL=mbean.explorer.component.js.map