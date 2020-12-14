export default class PymLoader {
    constructor() {
        this.addPym()
    }

    addPym = () => {
        (function (d, s) {
            let a = d.getElementsByTagName('head')[0];
            let r = d.createElement('script');
            r.async = 1;
            r.src = s;
            r.onload = function () { new pym.Child(); };
            a.appendChild(r);
        })(document, 'https://pym.nprapps.org/pym.v1.min.js');
    }
}