System.register(['angular2/core', './lib/mbean', './service/http.mbean.proxy.service', './lib/server', './lib/limit.to.pipe', "./mbean.attributes.component"], function(exports_1, context_1) {
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
    var core_1, mbean_1, http_mbean_proxy_service_1, server_1, limit_to_pipe_1, mbean_attributes_component_1;
    var MbeansComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mbean_1_1) {
                mbean_1 = mbean_1_1;
            },
            function (http_mbean_proxy_service_1_1) {
                http_mbean_proxy_service_1 = http_mbean_proxy_service_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (limit_to_pipe_1_1) {
                limit_to_pipe_1 = limit_to_pipe_1_1;
            },
            function (mbean_attributes_component_1_1) {
                mbean_attributes_component_1 = mbean_attributes_component_1_1;
            }],
        execute: function() {
            MbeansComponent = (function () {
                /**
                 *
                 * @param _http {@link HttpMbeanProxyService} provided by parent
                 */
                function MbeansComponent(_http) {
                    this._http = _http;
                    /**
                     * {@link MbeansComponent.mbeans} chnagned
                     * @type {EventEmitter}
                     */
                    this.MBeanListChanged = new core_1.EventEmitter();
                    this.get_attributes = new core_1.EventEmitter();
                }
                MbeansComponent.prototype.getMBeans = function () {
                    var self = this;
                    this._http.getMBeans(this.selectedServer.addr, this.selectedMBeanServer.id, this.selectedMBeanDomain)
                        .subscribe(function (data) { return (function (data) {
                        var mbeans = [];
                        for (var idx in data) {
                            var mbean = new mbean_1.MBean();
                            mbean.domain = self.selectedMBeanDomain;
                            mbean.objectName = data[idx];
                            mbean.nameValues = MbeansComponent.parseMBean(data[idx]);
                            mbeans.push(mbean);
                        }
                        self.mbeans = mbeans;
                        self.MBeanListChanged.emit(self.mbeans);
                    })(data); }, function (err) { return console.error(err); });
                };
                MbeansComponent.prototype.getAttributes = function (mbean) {
                    this.selectedMBean = mbean;
                    this.get_attributes.emit(mbean);
                };
                /**
                 * when selected mbean domain is changed, reload {@link MbeansComponent.mbeans}
                 * @param changes
                 */
                MbeansComponent.prototype.ngOnChanges = function (changes) {
                    // initailizing or can be check by each isFirstChange method
                    // eg. if (changes['porxy'],isFirstChange()) ...
                    if ("selectedMBeanDomain" in changes) {
                        if (!changes['selectedMBeanDomain'].isFirstChange()) {
                            if (changes['selectedMBeanDomain'].currentValue)
                                this.getMBeans();
                        }
                    }
                };
                MbeansComponent.parseMBean = function (objectName) {
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
                    __metadata('design:type', server_1.Server)
                ], MbeansComponent.prototype, "selectedServer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', mbean_1.MBeanServer)
                ], MbeansComponent.prototype, "selectedMBeanServer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MbeansComponent.prototype, "selectedMBeanDomain", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MbeansComponent.prototype, "MBeanListChanged", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MbeansComponent.prototype, "get_attributes", void 0);
                MbeansComponent = __decorate([
                    core_1.Component({
                        "selector": "mbeans",
                        "templateUrl": "html/mbeans.component.html",
                        "styleUrls": ["css/mbeans.component.css"],
                        "pipes": [limit_to_pipe_1.limitTo],
                        directives: [
                            mbean_attributes_component_1.MBeanAttributesComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [http_mbean_proxy_service_1.HttpMbeanProxyService])
                ], MbeansComponent);
                return MbeansComponent;
            }());
            exports_1("MbeansComponent", MbeansComponent);
        }
    }
});
//# sourceMappingURL=mbeans.component.js.map