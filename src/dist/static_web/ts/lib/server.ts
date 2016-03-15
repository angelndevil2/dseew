/**
 * Created by k on 16. 3. 5.
 */
import {MBeanServer} from "./mbean"

export class Server {
    addr : string;
    mbeanServers : { };

    constructor(addr:string = null) {this.addr = addr;}
    /**
     * add Mbean server, if exist replace it
     *
     * @param server
     */
    addMbeanServer(server:MBeanServer) {
        this.mbeanServers[server.id] = server;
    }

    /**
     * return Mbean server wiht id
     *
     * @param id
     * @returns {MbeanServer} null if not exist
     */
    getMbeanServer(id: string) {
        return this.mbeanServers[id];
    }
}