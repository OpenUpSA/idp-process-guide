import {Marker} from "./marker";
import {Engagements} from "./engagements";

export class Load {
    constructor(profile) {
        //const marker = new Marker();
        const engagements = new Engagements(profile.baseUrl);
    }
}
