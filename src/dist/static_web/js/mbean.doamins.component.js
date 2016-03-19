System.register(['angular2/core', './lib/mbean', './lib/server', "./service/http.mbean.proxy.service", 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, mbean_1, server_1, http_mbean_proxy_service_1;
    var MBeanDomainsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mbean_1_1) {
                mbean_1 = mbean_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (http_mbean_proxy_service_1_1) {
                http_mbean_proxy_service_1 = http_mbean_proxy_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            MBeanDomainsComponent = (function () {
                /**
                 *
                 * @param _http {@link HttpMbeanProxyService} provided by parent
                 */
                function MBeanDomainsComponent(_http) {
                    this._http = _http;
                    /**
                     * generated when mbean domain is selected
                     * @type {EventEmitter}
                     */
                    this.MBeanDomainSelected = new core_1.EventEmitter();
                    /**
                     * generated when mbean domain list is changed
                     *
                     * @type {EventEmitter}
                     */
                    this.MBeanDomainListChanged = new core_1.EventEmitter();
                    /**
                     * mbean domain list visible flag
                     * @type {boolean}
                     */
                    this.listVisible = false;
                }
                MBeanDomainsComponent.prototype.onSelectMBeanDomain = function (domain) {
                    this.selectedMBeanDomain = domain;
                    this.MBeanDomainSelected.emit(domain);
                };
                /**
                 * when selected mbean server is changed, reload {@link MBeanDomainsComponent.domains}
                 * @param changes
                 */
                MBeanDomainsComponent.prototype.ngOnChanges = function (changes) {
                    // initailizing or can be check by each isFirstChange method
                    // eg. if (changes['porxy'],isFirstChange()) ...
                    if ("selectedMBeanServer" in changes) {
                        if (!changes['selectedMBeanServer'].isFirstChange()) {
                            if (changes['selectedMBeanServer'].currentValue) {
                                var self = this;
                                this._http.getMBeanDomains(this.selectedServer.addr, this.selectedMBeanServer.id)
                                    .subscribe(function (data) { return (function (data) {
                                    var domains = [];
                                    for (var idx in data) {
                                        domains.push(data[idx]);
                                    }
                                    self.changeMBeanDomainList(domains);
                                    self.listVisible = true;
                                })(data); }, function (err) { return (function (err) {
                                    console.log(err);
                                    self.changeMBeanDomainList(null);
                                })(err); });
                            }
                            else {
                                this.changeMBeanDomainList(null);
                            }
                        }
                    }
                };
                MBeanDomainsComponent.prototype.onListVisible = function () {
                    this.listVisible = !this.listVisible;
                };
                MBeanDomainsComponent.prototype.changeMBeanDomainList = function (domains) {
                    this.domains = domains;
                    this.selectedMBeanDomain = null;
                    this.MBeanDomainListChanged.emit(this.domains);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', server_1.Server)
                ], MBeanDomainsComponent.prototype, "selectedServer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', mbean_1.MBeanServer)
                ], MBeanDomainsComponent.prototype, "selectedMBeanServer", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MBeanDomainsComponent.prototype, "MBeanDomainSelected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MBeanDomainsComponent.prototype, "MBeanDomainListChanged", void 0);
                MBeanDomainsComponent = __decorate([
                    core_1.Component({
                        "selector": "mbean-domains",
                        "templateUrl": "html/mbean.domains.component.html"
                    }), 
                    __metadata('design:paramtypes', [http_mbean_proxy_service_1.HttpMbeanProxyService])
                ], MBeanDomainsComponent);
                return MBeanDomainsComponent;
            }());
            exports_1("MBeanDomainsComponent", MBeanDomainsComponent);
        }
    }
});
//# sourceMappingURL=mbean.doamins.component.js.map