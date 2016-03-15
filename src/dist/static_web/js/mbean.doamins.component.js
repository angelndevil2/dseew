System.register(['angular2/core', './lib/mbean'], function(exports_1, context_1) {
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
    var core_1, mbean_1;
    var MBeanDomainsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mbean_1_1) {
                mbean_1 = mbean_1_1;
            }],
        execute: function() {
            MBeanDomainsComponent = (function () {
                function MBeanDomainsComponent() {
                    this.selectMBeanDomain = new core_1.EventEmitter();
                }
                MBeanDomainsComponent.prototype.onSelectMBeanDomain = function (domain) {
                    this.selectedMBeanDomain = domain;
                    this.selectMBeanDomain.emit(domain);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', (typeof (_a = typeof mbean_1.MBeanServer !== 'undefined' && mbean_1.MBeanServer) === 'function' && _a) || Object)
                ], MBeanDomainsComponent.prototype, "selectedMBeanServer", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MBeanDomainsComponent.prototype, "domains", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
                ], MBeanDomainsComponent.prototype, "selectMBeanDomain", void 0);
                MBeanDomainsComponent = __decorate([
                    core_1.Component({
                        "selector": "mbean-domains",
                        "templateUrl": "html/mbean.domains.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MBeanDomainsComponent);
                return MBeanDomainsComponent;
                var _a, _b;
            }());
            exports_1("MBeanDomainsComponent", MBeanDomainsComponent);
        }
    }
});
//# sourceMappingURL=mbean.doamins.component.js.map