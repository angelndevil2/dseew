System.register(['angular2/core', "./lib/server"], function(exports_1, context_1) {
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
    var core_1, server_1;
    var ProxyInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            }],
        execute: function() {
            ProxyInputComponent = (function () {
                function ProxyInputComponent() {
                    this.setProxy = new core_1.EventEmitter();
                }
                ProxyInputComponent.prototype.onSetProxy = function (addr) {
                    var server = new server_1.Server();
                    server.addr = addr;
                    this.setProxy.emit(server);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
                ], ProxyInputComponent.prototype, "setProxy", void 0);
                ProxyInputComponent = __decorate([
                    core_1.Component({
                        "selector": "proxy-input",
                        "templateUrl": "html/proxy.input.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProxyInputComponent);
                return ProxyInputComponent;
                var _a;
            }());
            exports_1("ProxyInputComponent", ProxyInputComponent);
        }
    }
});
//# sourceMappingURL=proxy.input.component.js.map