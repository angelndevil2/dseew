/**
 * Created by k on 16. 3. 6.
 */
import {Component, Output, EventEmitter} from 'angular2/core'
import {Server} from "./lib/server"

@Component({
    "selector" : "proxy-input",
    "templateUrl" : "html/proxy.input.component.html"
})

export class ProxyInputComponent {

    @Output() setProxy : EventEmitter<any> = new EventEmitter();

    onSetProxy(addr:string) {
        var server = new Server();
        server.addr = addr;
        this.setProxy.emit(server);
    }
}