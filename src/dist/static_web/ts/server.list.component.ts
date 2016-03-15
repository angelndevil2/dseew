/**
 * Created by k on 16. 3. 5.
 */
import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {Server} from './lib/server'

@Component({
    "selector" : "server-list",
    "templateUrl" : "html/server.list.component.html",
    "styleUrls":["css/server.list.component.css"]
})

export class ServerListComponent {
    @Input() servers : Server[];
    @Input() selected : Server;
    @Output() selectServer : EventEmitter<any> = new EventEmitter();

    onSelect(server:Server) {
        this.selected = server;
        this.selectServer.emit(server);
    }
}
