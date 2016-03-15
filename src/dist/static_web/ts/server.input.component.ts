/**
 * Created by k on 16. 3. 6.
 */
import {Component, Output, EventEmitter} from 'angular2/core'
import {Server} from "./lib/server"

@Component({
    "selector" : "server-input",
    "templateUrl" : "html/server.input.component.html"
})

export class ServerInputComponent {

    @Output() addServer : EventEmitter<any> = new EventEmitter();

    onAddServer(addr:string) {
        var server = new Server();
        server.addr = addr;
        this.addServer.emit(server);
    }
}