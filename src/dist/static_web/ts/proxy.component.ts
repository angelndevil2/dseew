/**
 * Created by k on 16. 3. 6.
 */
import {Component,
    Output,
    Input,
    EventEmitter,
    OnInit
} from 'angular2/core'
import {Server} from "./lib/server"
import {ServerListService} from "./service/server.list.service";
import {HttpMbeanProxyService} from './service/http.mbean.proxy.service'

@Component({
    "selector" : "proxy-component",
    "templateUrl" : "html/proxy.component.html"
})

/**
 * event
 * setProxy : when input submitted(ie. add button clicked)
 *
 */
export class ProxyComponent implements OnInit {

    /**
     * primary field to manage with this class
     * @type {Server}
     */
    proxy : Server;
    /**
     * input box visible flag
     * @type {boolean}
     */
    @Input() inputVisible:boolean = true;
    /**
     * event generated when proxy server set
     * @type {EventEmitter}
     */
    @Output() setProxy : EventEmitter<any> = new EventEmitter();
    /**
     *
     * @param _serverListService {@link ServerListService}comes from parent component
     * @param _http {@link HttpMbeanProxyService} comes from parent component
     */
    constructor(
        private _serverListService : ServerListService,
        private _http:HttpMbeanProxyService){}

    /**
     * called by input group's set button.
     * set proxy server and register it to {@link ServerListService}.
     *
     * @param addr
     */
    onSetProxy(addr:string) {
        var server = new Server();
        server.addr = addr;
        this.proxy = server;
        this._serverListService.setProxyServer(this.proxy);
        this._http.proxy = server;
        this.setProxy.emit(server);
    }

    /**
     * called by input visible clicked
     */
    onInputVisible() {
        this.inputVisible = !this.inputVisible;
    }

    /**
     * first get proxy from {@link ServerListService}
     */
    ngOnInit() {
        this.proxy = this._serverListService.getProxyServer();
        this._http.proxy = this.proxy;
        this.setProxy.emit(this.proxy);
        if (this.proxy) { this.inputVisible = false; }
    }
}