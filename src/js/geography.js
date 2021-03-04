let apiUrl = "";

export class Geography {
  constructor(baseUrl, hostname) {
    apiUrl = `${baseUrl}/municipality?hostname=${hostname}`;

    this.getGeographyData();
  }

  setCustomTheme = (data) => {
    const url = new URL(window.location.href);
    const colourPrimaryFill = data.colour_primary_fill || "ff8c00";
    const colourPrimaryText = data.colour_primary_text || "ff8c00";
    const style = document.createElement("style");

    document.head.append(style);
    style.textContent = `
        .primary-fill {
            background-color: #${colourPrimaryFill};
            }
            
        .primary-text {
            color: #${colourPrimaryText};
        }`;
  };

  getGeographyData = () => {
    fetch(apiUrl)
      .then((data) => data.json())
      .then((data) => {
        this.setHeadContent(data);
        this.setBodyContent(data);
        this.setFooterContent(data);
        this.setCustomTheme(data);
      });
  };

  setHeadContent = (data) => {
    if (data.page_title) {
      $("title").html(data.page_title);
    }
  };

  setBodyContent = (data) => {
    $(".nav-logo__muni_wrap .nav-logo__muni").html(data.name);
    $(".nav-logo__muni_wrap .loading").addClass("hidden");

    $(".hero-overline__muni .hero__overline").html(data.name);
    $(".hero-overline__muni .loading").addClass("hidden");

    //footer
    $(".footer__description_municipality")
      .closest("a")
      .attr("href", data.homepage_url);
    $(".footer__description_municipality strong").text(data.name);
  };

  setFooterContent = (data) => {
    //todo:this shouldnt be here - emre
    this.showFooterLink(".footer__muni-site", data.homepage_url);
    this.showFooterLink(".footer__muni-bylaws", data.by_laws_url);
    this.showFooterLink(".footer__ward-councillor", data.ward_councillor_url);

    $(".footer-description__wrap .footer__description").removeClass("hidden");
    $(".footer-description__wrap .loading").addClass("hidden");
  };

  showFooterLink = (selector, url) => {
    $(selector).removeClass("hidden");
    $(selector).closest("a").find(".loading").addClass("hidden");
    $(selector).closest("a").attr("href", url);
  };
}
