exports.transformDOM = function (window, $) {
  const tagHead = window.document.createElement("script");
  tagHead.setAttribute("src", "js/head-load.js");
  window.document.head.appendChild(tagHead);

  const tag = window.document.createElement("script");
  tag.setAttribute("src", "js/index.js");
  window.document.body.appendChild(tag);
};
