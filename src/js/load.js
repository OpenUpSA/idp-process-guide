import {Marker} from "./marker";
import {Engagements} from "./engagements";
import {Geography} from "./geography";

export class Load {
    constructor(profile) {
        //const marker = new Marker();
        const engagements = new Engagements(profile.baseUrl);
        const geography = new Geography(profile.baseUrl);
    }
}
