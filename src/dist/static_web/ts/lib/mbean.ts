/**
 * Created by k on 16. 3. 9.
 */
export class MBean {
    domain:string;
    objectName:string;
    nameValues: Object = {};
}

export class MBeanServer {
    id: string;
    name: string;
}

/**
 * mbean attribute class
 */
export class MBeanAttribute {
    name:string;
    type:string;
    isReadable:boolean;
    isWritable:boolean;
    isIs:boolean;
    value:any;

    constructor(obj:Object = null) {
        if (obj == null) return;
        try {
            this.name = obj["name"];
            this.type = obj["type"];
            this.isReadable = obj["isReadable"];
            this.isWritable = obj["isWritable"];
            this.isIs = obj["isIs"];
        } catch (err){
            throw new Error("incompatible type. "+err);
        }
    }
}
