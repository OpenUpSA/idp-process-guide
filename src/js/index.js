import {Load} from "./load";

const hostname = window.location.hostname;

const profiles = {
    'localhost': {
        baseUrl: 'http://192.168.1.13:8000/api/v1'
    },
};

const init = () => {
    let p = profiles[hostname];
    if (typeof p === 'undefined') {
        p = profiles['localhost']; //todo: this is temp, change here
    }

    p.baseUrl = p.baseUrl + '/host/' + hostname;

    const load = new Load(p);
}

init();

