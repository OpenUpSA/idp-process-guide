export const RECAPTCHA_SITE_KEY = `${process.env.RECAPTCHA_SITE_KEY}`;

//Note: Do not add Recaptcha via Google Tag Manager because GTM
//      is often blocked by legitimate browsers.
export default class Recaptcha {
  constructor() {
    if (RECAPTCHA_SITE_KEY !== "undefined") {
      this.addTag();
    }
  }

  addTag = () => {
    (function (w, d, s, i) {
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
      j.async = true;
      j.src = "https://www.google.com/recaptcha/api.js?render=" + i;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", RECAPTCHA_SITE_KEY);
  };
}
