/**
 * Created by k on 16. 3. 8.
 */
import {Component,
    Input,
    SimpleChange,
    OnChanges,
    Output
} from "angular2/core"
import {MBeanServer} from "./lib/mbean"
import {Server} from "./lib/server"
import {HttpMbeanProxyService} from "./service/http.mbean.proxy.service"
import {EventEmitter} from 'angular2/core'
import 'rxjs/Rx'

@Component({
    "selector": "mbean-servers",
    "templateUrl": "html/mbean.servers.component.html",
    "styleUrls": ["css/mbean.servers.component.css"]
})

export class MBeanServersComponent implements OnChanges {
    /**
     * primary field to manage with this class
     */
    servers:MBeanServer[];
    /**
     * selected {@link MBeanServer}
     */
    selectedMBeanServer: MBeanServer;
    /**
     * generated when {@link MBeanServer} selected
     *
     * @type {EventEmitter}
     */
    @Output() MBeanServerSelected: EventEmitter<any> = new EventEmitter();
    /**
     * generated when {@link MBeanServersComponent.servers} is changed
     * @type {EventEmitter}
     */
    @Output() MBeanServerListChanged: EventEmitter<any> = new EventEmitter();
    /**
     * selected jvm server
     */
    @Input() selectedServer:Server;
    /**
     * mbean server list visible flag
     * @type {boolean}
     */
    listVisible : boolean = false;

    /**
     *
     * @param httpMbeanProxy {@link HttpMbeanProxyService} provided by parent
     */
    constructor(private _http:HttpMbeanProxyService) {}

    /**
     * when selected jvm server is changed, reload {@link MBeanServersComponent.servers}
     * @param changes
     */
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        // initailizing or can be check by each isFirstChange method
        // eg. if (changes['porxy'],isFirstChange()) ...
        if ("selectedServer" in changes && !changes["selectedServer"].isFirstChange()) {
            this.getMBeanServers(changes["selectedServer"].currentValue);
            this.selectedMBeanServer = null;
        }
    }

    /**
     * get mbean servers from selected server
     * @param server
     */
    getMBeanServers(server:Server) {
        var self = this;
        this._http.getMBeanServers(server.addr)
            .subscribe(data => (function(data){
                var servers:MBeanServer[] = [];
                for (var idx in data) {
                    servers.push({id:data[idx], name:data[idx]});
                }
                self.servers = servers;
                self.MBeanServerListChanged.emit(self.servers);

                if (servers.length) self.listVisible = true;

            })(data), err => (function(err){
                console.log(err);
                self.servers = null;
                self.MBeanServerListChanged.emit(self.servers);
            })(err));
    }

    /**
     *
     * @param server {@link MBeanServer}
     */
    onSelectMBeanSever(server:MBeanServer) {
        this.selectedMBeanServer = server;
        this.MBeanServerSelected.emit(server);
    }

    /**
     * called when {@link MBeanServersComponent.listVisible} is changed
     */
    onListVisible() {
        this.listVisible = !this.listVisible;
    }
}