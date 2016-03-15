/**
 * Created by k on 16. 3. 8.
 */
import {Component, Input, SimpleChange, OnChanges, Output} from "angular2/core"
import {MBeanServer} from "./lib/mbean"
import {Server} from "./lib/server"
import {HttpMbeanProxyService} from "./service/http.mbean.proxy.service"
import {EventEmitter} from 'angular2/core'
/**
 * !important
 */
import 'rxjs/Rx'

@Component({
    "selector": "mbean-servers",
    "templateUrl": "html/mbean.servers.component.html",
    "styleUrls": ["css/mbean.servers.component.css"]
})

export class MbeanServersComponent implements OnChanges {
    servers:MBeanServer[];
    selectedMBeanServer: MBeanServer;
    @Output() selectMBeanServer: EventEmitter<any> = new EventEmitter();
    @Input() proxy:Server;
    @Input() selected:Server;

    constructor(private httpMbeanProxy:HttpMbeanProxyService) {}

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        // initailizing or can be check by each isFirstChange method
        // eg. if (changes['porxy'],isFirstChange()) ...
        if ("proxy" in changes && "selected" in changes) {
            this.httpMbeanProxy.proxy = changes['proxy'].currentValue;
        } else {
            if ("proxy" in changes) { this.httpMbeanProxy.proxy = changes['proxy'].currentValue; }
            if ("selected" in changes) {
                var selected = changes['selected'];
                this.getMBeanServers(selected.currentValue);
            }
        }
    }

    /**
     * get mbean servers from selected server
     * @param server
     */
    getMBeanServers(server:Server) {
        var self = this;
        this.httpMbeanProxy.getMBeanServers(server.addr)
            .subscribe(data => (function(data){
                var servers:MBeanServer[] = [];
                for (var idx in data) {
                    servers.push({id:data[idx], name:data[idx]});
                }

                self.servers = servers;
            })(data), err => console.log(err));

    }

    onSelectMBeanSever(server:MBeanServer) {
        this.selectedMBeanServer = server;
        this.selectMBeanServer.emit(server);
    }
}