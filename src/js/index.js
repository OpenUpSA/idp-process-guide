import {Load} from "./load";

let hostname = window.location.hostname;
let baseUrl = 'https://idp-data.openup.org.za';

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

    baseUrl = baseUrl + '/host/' + hostname;

    const load = new Load(baseUrl);
}

init();

