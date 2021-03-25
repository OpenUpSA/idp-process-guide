exports.transformDOM = function (window, $) {
  const tagHead = window.document.createElement("script");
  tagHead.setAttribute("src", "js/head-load.js");
  window.document.head.appendChild(tagHead);

  const tag = window.document.createElement("script");
  tag.setAttribute("src", "js/index.js");
  window.document.body.appendChild(tag);

  const tagCSSModifications = window.document.createElement("link");
  tagCSSModifications.setAttribute("href", "css/idp-guide-v2.webflow.modifications.css");
  tagCSSModifications.setAttribute("rel", "stylesheet")
  tagCSSModifications.setAttribute("type", "text/css")
  window.document.head.appendChild(tagCSSModifications);
};
