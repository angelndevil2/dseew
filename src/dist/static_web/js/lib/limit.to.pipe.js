System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var limitTo;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // We use the @Pipe decorator to register the name of the pipe
            limitTo = (function () {
                function limitTo() {
                }
                limitTo.prototype.transform = function (value, args) {
                    if (value && args[0] > 0 && value.length > args[0]) {
                        return value.substr(0, args[0] - 1);
                    }
                    return value;
                };
                limitTo = __decorate([
                    core_1.Pipe({
                        name: 'limitTo'
                    }), 
                    __metadata('design:paramtypes', [])
                ], limitTo);
                return limitTo;
            }());
            exports_1("limitTo", limitTo);
        }
    }
});
//# sourceMappingURL=limit.to.pipe.js.map