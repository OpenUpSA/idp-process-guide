require('dotenv').config();
const GOOGLE_TAG_MANAGER_ID = `${process.env.GOOGLE_TAG_MANAGER_ID}`;
const CONTEXT = `${process.env.CONTEXT}`;

export default class Analytics {

    constructor() {
        this.addTagManager()
    }

    addTagManager = () => {
        if ((CONTEXT === "production" || window.location.search.includes("loadgtm")) && GOOGLE_TAG_MANAGER_ID !== "undefined") {
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({"gtm.start": new Date().getTime(), event: "gtm.js"});
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", `${GOOGLE_TAG_MANAGER_ID}`);
        }
    }

    logEvent = (event, value) => {
        if (typeof dataLayer === 'undefined') {
            return;
        }

        dataLayer.push({
            'event': event,
            'value': value
        })
    }
}