System.register(['angular2/core', './lib/limit.to.pipe'], function(exports_1, context_1) {
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
    var core_1, limit_to_pipe_1;
    var MbeansComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (limit_to_pipe_1_1) {
                limit_to_pipe_1 = limit_to_pipe_1_1;
            }],
        execute: function() {
            MbeansComponent = (function () {
                function MbeansComponent() {
                    this.get_attributes = new core_1.EventEmitter();
                }
                MbeansComponent.prototype.getAttributes = function (mbean) {
                    this.selectedMBean = mbean;
                    this.get_attributes.emit(mbean);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MbeansComponent.prototype, "selectedMBeanDomain", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MbeansComponent.prototype, "mbeans", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MbeansComponent.prototype, "get_attributes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MbeansComponent.prototype, "selectedMBean", void 0);
                MbeansComponent = __decorate([
                    core_1.Component({
                        "selector": "mbeans",
                        "templateUrl": "html/mbeans.component.html",
                        "styleUrls": ["css/mbeans.component.css"],
                        "pipes": [limit_to_pipe_1.limitTo]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MbeansComponent);
                return MbeansComponent;
            }());
            exports_1("MbeansComponent", MbeansComponent);
        }
    }
});
//# sourceMappingURL=mbeans.component.js.map