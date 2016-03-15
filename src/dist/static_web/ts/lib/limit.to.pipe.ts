/**
 * Created by k on 16. 3. 14.
 */
import {Pipe, PipeTransform} from 'angular2/core'

// We use the @Pipe decorator to register the name of the pipe
@Pipe({
    name: 'limitTo'
})

// The work of the pipe is handled in the tranform method with our pipe's class
export class limitTo implements PipeTransform {
    transform(value: string, args: any[]) {
        if(value && args[0] > 0 && value.length > args[0]) {
            return value.substr(0, args[0]-1);
        }

        return value;
    }
}
