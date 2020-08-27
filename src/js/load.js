import {Marker} from "./marker";
import {Engagements} from "./engagements";
import {Geography} from "./geography";

export class Load {
    constructor(baseUrl, hostname) {
        //const marker = new Marker();
        const engagements = new Engagements(baseUrl, hostname);
        const geography = new Geography(baseUrl, hostname);
    }
}
