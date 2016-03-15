System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Server;
    return {
        setters:[],
        execute: function() {
            Server = (function () {
                function Server(addr) {
                    if (addr === void 0) { addr = null; }
                    this.addr = addr;
                }
                /**
                 * add Mbean server, if exist replace it
                 *
                 * @param server
                 */
                Server.prototype.addMbeanServer = function (server) {
                    this.mbeanServers[server.id] = server;
                };
                /**
                 * return Mbean server wiht id
                 *
                 * @param id
                 * @returns {MbeanServer} null if not exist
                 */
                Server.prototype.getMbeanServer = function (id) {
                    return this.mbeanServers[id];
                };
                return Server;
            }());
            exports_1("Server", Server);
        }
    }
});
//# sourceMappingURL=server.js.map