import {Load} from "./load";
import Analytics from "./analytics";

let hostname = window.location.hostname;
let baseUrl = `${process.env.BASE_URL}`;

const init = () => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let baseUrlParam = url.searchParams.get('api_url');
    let hostnameParam = url.searchParams.get('hostname');

    if (baseUrlParam !== null && baseUrlParam !== '') {
        baseUrl = baseUrlParam;
    }

    if (hostnameParam !== null && hostnameParam !== '') {
        hostname = hostnameParam;
    }

    const analytics = new Analytics();
    const load = new Load(baseUrl, hostname, analytics);
}

init();
