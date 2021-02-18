export class setContainerWidth {
  constructor() {
    const url = new URL(window.location.href);
    const containerWidth = url.searchParams.get("containerWidth") || 1225;
    const style = document.createElement("style");

    document.head.append(style);
    style.textContent = `
            .container {
                max-width: ${containerWidth}px;
            }`;
  }
}

export class hideHeadingIfEmbedded {
  constructor() {
    if (window.self !== window.top) {
      const style = document.createElement("style");
      document.head.append(style);
      style.textContent = `
            .main>.nav {
                display: none;
            }`;
    }
  }
}
