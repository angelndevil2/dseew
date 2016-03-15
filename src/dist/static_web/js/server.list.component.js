System.register(['angular2/core', './lib/server'], function(exports_1, context_1) {
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
    var ServerListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            }],
        execute: function() {
            ServerListComponent = (function () {
                function ServerListComponent() {
                    this.selectServer = new core_1.EventEmitter();
                }
                ServerListComponent.prototype.onSelect = function (server) {
                    this.selected = server;
                    this.selectServer.emit(server);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ServerListComponent.prototype, "servers", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', server_1.Server)
                ], ServerListComponent.prototype, "selected", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ServerListComponent.prototype, "selectServer", void 0);
                ServerListComponent = __decorate([
                    core_1.Component({
                        "selector": "server-list",
                        "templateUrl": "html/server.list.component.html",
                        "styleUrls": ["css/server.list.component.css"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ServerListComponent);
                return ServerListComponent;
            }());
            exports_1("ServerListComponent", ServerListComponent);
        }
    }
});
//# sourceMappingURL=server.list.component.js.map