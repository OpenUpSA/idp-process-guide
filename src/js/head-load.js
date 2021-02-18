import { setContainerWidth, hideHeadingIfEmbedded } from "./custom-style.js";
import PymLoader from "./pym-loader.js";

const init = () => {
    new hideHeadingIfEmbedded();
    new setContainerWidth();
    new PymLoader();
}

init();
