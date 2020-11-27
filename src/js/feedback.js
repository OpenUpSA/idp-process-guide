require('dotenv').config();

export default class Feedback {
    constructor() {
        this.addHotJar()
    }

    addHotJar = () => {
        const HOT_JAR_SITE_ID = `${process.env.HOT_JAR_SITE_ID}`;
        if (HOT_JAR_SITE_ID !== "undefined") {
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:HOT_JAR_SITE_ID,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        }
    }
}