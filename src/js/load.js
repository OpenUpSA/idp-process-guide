import {Marker} from "./marker";
import {Engagements} from "./engagements";
import {Geography} from "./geography";

export class Load {
    constructor(baseUrl) {
        //const marker = new Marker();
        const engagements = new Engagements(baseUrl);
        const geography = new Geography(baseUrl);
    }
}
