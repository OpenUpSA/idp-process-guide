import { Load } from "./load";
import {getSessionBaseUrl} from "./utils";
import Analytics from "./analytics";
import Recaptcha from "./recaptcha";

const init = () => {
    const url = new URL(window.location.href);
    const hostname = url.searchParams.get('hostname') || window.location.hostname;
    const baseUrl = getSessionBaseUrl() || process.env.BASE_URL;
    new Load(baseUrl, hostname, new Analytics());
    new Recaptcha();
}

init();
