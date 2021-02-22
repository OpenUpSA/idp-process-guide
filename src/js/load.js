import {Engagements} from "./engagements";
import {Categories} from "./categories";
import {Geography} from "./geography";

export class Load {
    constructor(baseUrl, hostname, analytics) {
        new Engagements(baseUrl, hostname, analytics);
        new Categories(baseUrl, hostname, analytics);
        new Geography(baseUrl, hostname);
    }
}
