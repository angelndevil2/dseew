/**
 * Created by k on 16. 3. 5.
 */
import {Component, Input,
    Output,
    EventEmitter,
    HostListener,
    OnInit
} from 'angular2/core'
import {Server} from './lib/server'
import {ServerInputComponent} from './server.input.component'
import {ServerListService} from "./service/server.list.service";

@Component({
    "selector" : "server-list",
    "templateUrl" : "html/server.list.component.html",
    "styleUrls":["css/server.list.component.css"],
    directives: [ServerInputComponent],
})

/**
 * jvm server list show and add
 */
export class ServerListComponent implements OnInit{

    /**
     * primary field to manage with this class
     *
     * jvm server list
     *
     * @type Server[]
     */
    servers : Server[];
    /**
     * selected jvm server
     *
     * @type Server
     */
    selectedServer : Server;
    /**
     * event generated when jvm server selected
     * @type {EventEmitter}
     */
    @Output() ServerSelected : EventEmitter<any> = new EventEmitter();
    /**
     * event generated when jvm server list is changed
     * @type {EventEmitter}
     */
    @Output() ServerListChanged : EventEmitter<any> = new EventEmitter();
    /**
     * server list visible flag
     * @type {boolean}
     */
    @Input() listVisible:boolean = true;

    /**
     *
     * @param _serverListService {@link ServerListService} provided by parent
     */
    constructor(private _serverListService:ServerListService){}

    /**
     * called when server selected
     *
     * set {@link ServerListComponent.selectedServer} then {@link ServerListComponent.ServerSelected} event emit
     * @param server
     */
    onServerSelect(server:Server){
        this.selectedServer = server;
        this.ServerSelected.emit(server);
    }

    /**
     * called by input visible clicked
     */
    onListVisible() {
        this.listVisible = !this.listVisible;
    }

    /**
     * event handler for addServer event from {@link ServerInputComponent}
     *
     * server add to {@link ServerListComponent.servers}, {@link ServerListService}
     * generate event {@link ServerListChanged}
     * @param e
     */
    @HostListener('addServer', ['$event']) onAddServer(e) {
        if (this.servers) {
            this.servers.push(e);
            var s = '';
            for (var idx in this.servers) {
                s += this.servers[idx].addr + ',';
            }

            if (s.length > 0) {
                s = s.substr(0, s.length - 1);
                this._serverListService.setServers(s);
                this.ServerListChanged.emit(this.servers);
            }
        }
    }

    /**
     * first get servers from {@link ServerListService}
     * if {@link ServerListComponent.selectedServer} is null, set {@link ServerListComponent.listVisible} true
     *
     * if {@link selectedServer} is not null, set {@link listVisible} false
     */
    ngOnInit() {

        if (this._serverListService == null) {
            // handle error
        } else {
            this.servers = this._serverListService.getServers();
            if (this.selectedServer) this.listVisible = false;
        }
    }
}
