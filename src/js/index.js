import { Load } from "./load";
import {getSessionBaseUrl} from "./utils";
import Analytics from "./analytics";
import Feedback from "./feedback";
import PymLoader from "./pym-loader.js";

const init = () => {
    const url = new URL(window.location.href);
    const hostname = url.searchParams.get('hostname') || window.location.hostname;
    const baseUrl = getSessionBaseUrl() || process.env.BASE_URL;
    
    new PymLoader();
    new Feedback();
    new Load(baseUrl, hostname, new Analytics());
}

init();
