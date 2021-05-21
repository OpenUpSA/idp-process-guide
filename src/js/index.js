import "regenerator-runtime/runtime";
import { Engagements } from "./engagements";
import { Categories } from "./categories";
import { Geography } from "./geography";
import { getSessionBaseUrl } from "./utils";
import Analytics from "./analytics";
import Recaptcha from "./recaptcha";

const loadMunicipality = async (url) => {
  const hostname = url.searchParams.get("hostname") || window.location.hostname;
  const baseUrl = getSessionBaseUrl() || process.env.BASE_URL;
  const showForm = url.searchParams.get("form") || false;
  const analytics = new Analytics();
  const geography = await new Geography(baseUrl, hostname);
  
  if (geography.municipality.detail === "Not found.") {
    document.location = '/under-construction.html';
  } else {
    new Engagements(baseUrl, hostname, analytics, showForm);
    new Categories(baseUrl, hostname, analytics);
    new Recaptcha();
  }
};

const init = () => {
  const url = new URL(window.location.href);
  if (url.pathname.indexOf("under-construction") === -1) {
    loadMunicipality(url);
  }
};

init();
