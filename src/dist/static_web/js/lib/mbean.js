System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MBean, MBeanServer, MBeanAttribute;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by k on 16. 3. 9.
             */
            MBean = (function () {
                function MBean() {
                    this.nameValues = {};
                }
                return MBean;
            }());
            exports_1("MBean", MBean);
            MBeanServer = (function () {
                function MBeanServer() {
                }
                return MBeanServer;
            }());
            exports_1("MBeanServer", MBeanServer);
            /**
             * mbean attribute class
             */
            MBeanAttribute = (function () {
                function MBeanAttribute(obj) {
                    if (obj === void 0) { obj = null; }
                    if (obj == null)
                        return;
                    try {
                        this.name = obj["name"];
                        this.type = obj["type"];
                        this.isReadable = obj["isReadable"];
                        this.isWritable = obj["isWritable"];
                        this.isIs = obj["isIs"];
                    }
                    catch (err) {
                        throw new Error("incompatible type. " + err);
                    }
                }
                return MBeanAttribute;
            }());
            exports_1("MBeanAttribute", MBeanAttribute);
        }
    }
});
//# sourceMappingURL=mbean.js.map