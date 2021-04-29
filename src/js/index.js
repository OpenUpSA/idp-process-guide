import { Load } from "./load";
import {getSessionBaseUrl} from "./utils";
import Analytics from "./analytics";
import Recaptcha from "./recaptcha";

const init = () => {
    const url = new URL(window.location.href);
    const hostname = url.searchParams.get('hostname') || window.location.hostname;
    const baseUrl = getSessionBaseUrl() || process.env.BASE_URL;
    const showForm = url.searchParams.get('form') || false;
    new Load(baseUrl, hostname, new Analytics(), showForm);
    new Recaptcha();
}

init();
