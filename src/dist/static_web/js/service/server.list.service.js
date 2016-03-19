System.register(['angular2/core', '../lib/server', './cookie.service'], function(exports_1, context_1) {
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
    var core_1, server_1, cookie_service_1;
    var ServerListService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (cookie_service_1_1) {
                cookie_service_1 = cookie_service_1_1;
            }],
        execute: function() {
            ServerListService = (function () {
                /**
                 * get jvm server and proxy server from {@link CookieService}
                 *
                 * TODO real server save and retrieve service should be implemented
                 *
                 * @param _cookie cookie service
                 */
                function ServerListService(_cookie) {
                    this._cookie = _cookie;
                    this._proxyServer = null;
                    this._servers = [];
                    this.getServers(true);
                    this.getProxyServer(true);
                }
                /**
                 * get jvm server list from cookie.
                 * if force is false, cached list is return.
                 *
                 * @param force
                 * @returns {Server[]}
                 */
                ServerListService.prototype.getServers = function (force) {
                    if (force === void 0) { force = false; }
                    if (force) {
                        var s = this._cookie.getCookie("servers");
                        var c = s && s.split(",");
                        for (var idx in c) {
                            var server = new server_1.Server();
                            server.addr = c[idx];
                            this._servers.push(server);
                        }
                    }
                    return this._servers;
                };
                ServerListService.prototype.setServers = function (servers) {
                    this._cookie.setCookie("servers", servers);
                };
                ServerListService.prototype.getProxyServer = function (force) {
                    if (force === void 0) { force = false; }
                    if (force) {
                        var addr = this._cookie.getCookie("proxy");
                        if (addr != null) {
                            var server = new server_1.Server();
                            server.addr = addr;
                            this._proxyServer = server;
                        }
                        else {
                            this._proxyServer = null;
                        }
                    }
                    return this._proxyServer;
                };
                ServerListService.prototype.setProxyServer = function (server) {
                    this._proxyServer = server;
                    this._cookie.setCookie("proxy", server.addr);
                };
                ServerListService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [cookie_service_1.CookieService])
                ], ServerListService);
                return ServerListService;
            }());
            exports_1("ServerListService", ServerListService);
        }
    }
});
//# sourceMappingURL=server.list.service.js.map