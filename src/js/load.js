import {Engagements} from "./engagements";
import {Geography} from "./geography";

export class Load {
    constructor(baseUrl, hostname, analytics) {
        const engagements = new Engagements(baseUrl, hostname, analytics);
        const geography = new Geography(baseUrl, hostname);
    }
}
