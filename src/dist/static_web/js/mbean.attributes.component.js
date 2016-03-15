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
    var MBeanAttributesComponent;
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
            MBeanAttributesComponent = (function () {
                /**
                 * @constructor
                 * @param _http
                 */
                function MBeanAttributesComponent(_http) {
                    this._http = _http;
                    /**
                     * event generated when attribute selected
                     *
                     * @type {EventEmitter}
                     */
                    this.select = new core_1.EventEmitter();
                }
                MBeanAttributesComponent.prototype.ngOnInit = function () {
                    if (this.selectedMBean) {
                        try {
                            this.getAttributes(this.selectedMBean);
                        }
                        catch (err) {
                            console.error(err);
                        }
                    }
                };
                /**
                 * refresh attributes for selected mbean is changed
                 *
                 * @param changes
                 */
                MBeanAttributesComponent.prototype.ngOnChanges = function (changes) {
                    // initailizing or can be check by each isFirstChange method
                    // eg. if (changes['porxy'],isFirstChange()) ...
                    if ('selectedMBean' in changes && changes['selectedMBean'].isFirstChange()) {
                    }
                    else {
                        if ("selectedMBean" in changes) {
                            this.selectedMBean = changes['selectedMBean'].currentValue;
                            this.getAttributes(this.selectedMBean);
                        }
                    }
                };
                /**
                 * when selectedMBean is set, get it's attributes and set mbeanAttributes:MBeanAttribute[]
                 *
                 * @param mbean selected mbean
                 * @returns {MBeanAttribute[] | null}
                 */
                MBeanAttributesComponent.prototype.getAttributes = function (mbean) {
                    var observable = this._http.getAttributes(this.server.addr, this.mbeanServer.id, mbean.objectName);
                    /*        if (attribute.type === "javax.management.j2ee.statistics.Stats")
                             var ret = this._http.getAttribute(this.selected.addr, this.selectedMBeanServer.id, this.selectedMBean.objectName, e.name, e.type);
                             else var ret =this._http.getAttribute(this.selected.addr, this.selectedMBeanServer.id, this.selectedMBean.objectName, e.name);
                                    ret
                             .subscribe(data => (function(data){
                             console.log(data);
                             })(data), err => console.error(err));*/
                    if (observable) {
                        var self = this;
                        observable.subscribe(function (data) { return (function (data) {
                            var attributes = [];
                            for (var idx in data) {
                                try {
                                    var attr = new mbean_1.MBeanAttribute(data[idx]);
                                    self.getAttributeValue(attr);
                                    console.log(attr.value);
                                    attributes.push(attr);
                                }
                                catch (err) {
                                    console.error(err);
                                }
                            }
                            self.mbeanAttributes = attributes;
                        })(data); }, function (err) { return console.error(err); });
                    }
                    self.mbeanAttributes = null;
                    return self.mbeanAttributes;
                };
                MBeanAttributesComponent.prototype.getAttributeValue = function (attribute) {
                    var observable;
                    if (attribute.type === "javax.management.j2ee.statistics.Stats") {
                        observable = this._http.getAttribute(this.server.addr, this.mbeanServer.id, this.selectedMBean.objectName, attribute.name, attribute.type);
                    }
                    else {
                        observable = this._http.getAttribute(this.server.addr, this.mbeanServer.id, this.selectedMBean.objectName, attribute.name);
                    }
                    if (observable) {
                        observable
                            .subscribe(function (data) { return (function (data) {
                            attribute.value = data;
                        })(data); }, function (err) { return console.error(err); });
                    }
                    else {
                        throw new Error("fail to get attribute");
                    }
                };
                MBeanAttributesComponent.prototype.onClick = function (attribute) {
                    this.selectedAttribute = attribute;
                    this.select.emit(attribute);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MBeanAttributesComponent.prototype, "select", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', mbean_1.MBeanAttribute)
                ], MBeanAttributesComponent.prototype, "selectedAttribute", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', mbean_1.MBean)
                ], MBeanAttributesComponent.prototype, "selectedMBean", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', server_1.Server)
                ], MBeanAttributesComponent.prototype, "server", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', mbean_1.MBeanServer)
                ], MBeanAttributesComponent.prototype, "mbeanServer", void 0);
                MBeanAttributesComponent = __decorate([
                    core_1.Component({
                        "selector": "mbean-attributes",
                        "templateUrl": "html/mbean.attributes.component.html"
                    }), 
                    __metadata('design:paramtypes', [http_mbean_proxy_service_1.HttpMbeanProxyService])
                ], MBeanAttributesComponent);
                return MBeanAttributesComponent;
            }());
            exports_1("MBeanAttributesComponent", MBeanAttributesComponent);
        }
    }
});
//# sourceMappingURL=mbean.attributes.component.js.map