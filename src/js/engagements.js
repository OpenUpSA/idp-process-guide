import { getDateText } from "./utils";
let apiUrl = "";

/* category */
let categoryLinkClone = null;
let categoryLinkWrapper = null;

const categoryContentClass = ".w-tab-pane";
const categoryLinkClass = ".tab-link";

const activeLinkClassName = "w--current";

let categoryContentClone = null;
let categoryContentWrapper = null;

let emptyCategoryClone = null;
/* category */

/* engagement */
let engagementClone = null;
let engagementRowClone = null;

const engagementClass = ".engagement-block";
const engagementRowClass = ".engagement-block__details_row";
/* engagement */

let allEngagements = null;
let allCategories = null;

export class Engagements {
  constructor(baseUrl, hostname, analytics) {
    apiUrl = `${baseUrl}/events?hostname=${hostname}`;
    this.analytics = analytics;

    //tab-link
    this.setDomElements();
    this.getEngagements();
    this.setFiltering();
    this.detectExternalLinkClick();
    this.bindCommentForm();
  }

  bindCommentForm = () => {
    $(document).on('submit', '.modals .modal__response-form__content', function (e) {
      e.preventDefault();
      console.log({e});
      $('.modal__response-form__content').hide();
      $('.modal__response-form .w-form-fail').hide();
      $('.modal__response-form .w-form-done').show();
      return true;
    });
  };

  setDomElements = () => {
    categoryLinkWrapper = $(".tabs-menu");
    categoryContentWrapper = $(".tabs-content");

    categoryLinkClone = $(categoryLinkClass)[0].cloneNode(true);
    categoryContentClone = $(categoryContentClass)[0].cloneNode(true);

    engagementClone = $(engagementClass)[0].cloneNode(true);
    $(engagementClone).removeClass("hidden");
    engagementRowClone = $(engagementRowClass)[0].cloneNode(true);

    emptyCategoryClone = $(".tab-pane__empty")[0].cloneNode(true);

    $(categoryLinkWrapper).empty();
    $(categoryContentWrapper).empty();
  };

  detectExternalLinkClick = () => {
    let self = this;
    $(document).on("click", "a", function (event) {
      if (
        !this.href.match(/^mailto\:/) &&
        this.href !== "" &&
        this.hostname != location.hostname
      ) {
        //external click
        self.analytics.logEvent("external_link_clicked", this.href);
      }
    });
  };

  getEngagements = () => {
    fetch(apiUrl)
      .then((data) => data.json())
      .then((data) => {
        allEngagements = data;
        this.showActiveEngagements(allEngagements);
        this.showCategories(data);
        this.setBasedOnEventDataDisplay(data[data.length - 1].end_date);
        this.detectEventView();
      });
  };

  setBasedOnEventDataDisplay = (date) => {
    $(".event-data-date__content .data-date__date").map((_i, ele) => {
      $(ele).text(date);
    });

    $(".event-data-date__content").map((_i, ele) => {
      $(ele).removeClass("hidden");
    });

    $(".event-data-date__wrapper .loading").remove();
  };

  showCategories = (engagements) => {
    let categories = this.getCategoriesFromEngagements(engagements);
    allCategories = categories;
    this.filterEngagements(90, false);
  };

  getCategoriesFromEngagements = (engagements) => {
    let categories = [
      {
        id: 0,
        name: "All",
        icon: "fa fa-list-ul",
      },
    ];
    engagements.forEach((e) => {
      categories.push(e.category);
    });

    categories = categories.reduce(function (memo, e1) {
      let matches = memo.filter(function (e2) {
        return e1.id == e2.id && e1.id == e2.id;
      });
      if (matches.length == 0) memo.push(e1);
      return memo;
    }, []);

    return categories;
  };

  createCategoryLinkAndContent = (categories, engagements) => {
    let self = this;
    $(categoryLinkWrapper).empty();
    $(categoryContentWrapper).empty();
    categories.forEach((c) => {
      self.createCategoryLink(c);
      self.createCategoryContent(c, engagements);
    });
    this.setActiveCategory(0, false); //all
  };

  createCategoryLink = (c) => {
    let item = categoryLinkClone.cloneNode(true);
    $(item).attr("id", "c-link-" + c.id);
    $(item).removeClass(activeLinkClassName);
    $(item).removeAttr("data-w-tab");
    $(item).find(".loading").addClass("hidden");
    $(item).on("click", () => this.setActiveCategory(c.id, true));

    $(".tab-link__text", item).text(c.name);
    $(".tab-link__icon div", item).attr("class", c.icon);

    categoryLinkWrapper.append(item);
  };

  createCategoryContent = (c, engagements) => {
    let item = categoryContentClone.cloneNode(true);
    this.setCategoryContentProperties(item, c);
    this.setCategoryContentData(item, c, engagements);

    categoryContentWrapper.append(item);
  };

  setCategoryContentProperties = (item, c) => {
    $(item).attr("id", "c-tab-" + c.id);
    $(item).attr("aria-labelledby", "c-tab-" + c.id);
    $(item).removeClass("w--tab-active");
    $(item).removeAttr("data-w-tab");

    $(item).empty();
  };

  setCategoryContentData = (wrapper, c, engagements) => {
    let self = this;
    let data = engagements;
    if (c.id > 0) {
      //else : All engagements
      data = engagements.filter((e) => {
        return e.category.id === c.id;
      });
    }

    //data is filtered
    if (data !== null && data.length > 0) {
      data.forEach((e) => {
        let item = engagementClone.cloneNode(true);
        const dateText = getDateText(e);

        //TODO: Refactor
        item.dataset.eventId = e.id;
        item.dataset.commentOpenDate = e.comment_open_date;
        item.dataset.commentCloseDate = e.comment_close_date;
        item.dataset.categoryIcon = e.category.icon;
        item.dataset.eventDate = dateText;
        item.dataset.shortDesc = e.short_desc;
        item.onclick = this.eventClick;

        $(".engagement-block__header .engagement-block__icon div", item).attr(
          "class",
          e.category.icon
        );
        $(".engagement-block__header .engagement-block__title", item).text(
          e.title
        );

        $(".engagement-block__details", item).html("");
        self.appendRowToEngagementBlock(
          item,
          "fa fa-info",
          e.short_desc,
          null,
          false
        );

        self.appendRowToEngagementBlock(
          item,
          "fa fa-calendar",
          dateText,
          null,
          false
        );
        e.actions.forEach((a) => {
          self.appendRowToEngagementBlock(
            item,
            a.icon,
            a.description_html,
            a.confirmed_date,
            true
          );
        });

        $(wrapper).append(item);
      });
    } else {
      //no data for the category
      let item = emptyCategoryClone.cloneNode(true);
      $(wrapper).append(item);
    }
  };

  appendRowToEngagementBlock = (
    item,
    iconClass,
    text,
    rowDate,
    isActionRow = false
  ) => {
    let row = engagementRowClone.cloneNode(true);
    $(".engagement-block__details_icon div", row).attr("class", iconClass);
    if (isActionRow) {
      if (rowDate !== null && rowDate !== "") {
        let h5 = $("<h5></h5>");
        $(h5).text(rowDate);
        $(".engagement-block__rich-text", row).append(h5);
      }
      let div = $("<div></div>");
      $(div).html(text);
      $(".engagement-block__rich-text", row).append(div);
    } else {
      $(".engagement-block__rich-text", row).text(text);
    }
    $(".engagement-block__details", item).append(row);
  };

  setActiveCategory = (id, logEvent) => {
    let categoryText = "";

    $(categoryContentClass).each(function () {
      $(this).addClass("hidden");
      if ($(this).attr("id") === "c-tab-" + id) {
        $(this).removeClass("hidden");
      }
    });

    $(categoryLinkClass).each(function () {
      $(this).removeClass(activeLinkClassName);
      if ($(this).attr("id") === "c-link-" + id) {
        categoryText = $(this).find(".tab-link__text").text();
        $(this).addClass(activeLinkClassName);
      }
    });

    if (logEvent) {
      this.analytics.logEvent("category_selected", categoryText);
    }
    pymChild.sendHeight();
  };

  setFiltering = () => {
    let self = this;
    $("a.events-range__row").each(function () {
      $(this).on("click", () => {
        $(".events-range__selector div:nth-child(2)").text(
          $(this).find("div").text()
        );
        $(".events-range__selector").removeClass("w--open");
        $(".events-range__list").removeClass("w--open");
        $(".events-range__selector").attr("aria-expanded", false);
        let filterDays = $(this).attr("data-filterDays");
        self.filterEngagements(filterDays, true);
      });
    });
  };

  detectEventView = () => {
    const url = new URL(window.location.href);
    const eventId = url.searchParams.get('event');
    if (eventId) {
      const event = $(`[data-event-id=${eventId}]`).first();
      this.showEventModal(event);
    }
  };

  showEventModal = (event) => {
    $('.modals .modal__heading').text(event.find(".engagement-block__header .engagement-block__title").text());
    $('.modals .modal__header-icon div').attr('class', event.data().categoryIcon);
    $('.modals .modal__engagement-date_date').text(event.data().eventDate);
    
    if (event.data().commentCloseDate) {
      $('.modals .modal__engagement-close_date').text(event.data().commentCloseDate);
      $('.modals .modal__engagement-close_date').parents('.modal__engagement-open').show();
    } else {
      $('.modals .modal__engagement-close_date').parents('.modal__engagement-open').hide();
    }

    if (event.data().commentOpenDate) {
      $('.modals .modal__engagement-open_date').text(event.data().commentOpenDate);
      $('.modals .modal__engagement-open_date').parents('.modal__engagement-open').show();
    } else {
      $('.modals .modal__engagement-open_date').parents('.modal__engagement-open').hide();
    }
    
    $('.modals .modal__engagement-open_date').text(event.data().commentOpenDate);
    $('.modals .modal__event-info p').text(event.data().shortDesc);    
    $('.modals').removeClass('hidden');

    if (this.isTodayWithinCommentPeriod(event.data().commentOpenDate, event.data().commentCloseDate)) {
      $('.modal__response-form .w-form-fail').hide();
      $('.modal__response-form .w-form-done').hide();
      $('.modals .modal__response-form__content').hide();
    } else {
      $('.modals .modal__response-form__content').hide();
    }
    
    $('.modals').first().show();
  };

  eventClick = (e) => {
      const currentTarget = e.currentTarget;
      const event = $(currentTarget);
      this.showEventModal(event);
  };

  isTodayWithinCommentPeriod = (openDate, closeDate) => {
    let todaysDate = new Date();
    let commentOpenDate = new Date(openDate);
    let commentCloseDate = new Date(closeDate);
    
    todaysDate.setHours(0, 0, 0, 0);
    commentOpenDate.setHours(0, 0, 0, 0);
    commentCloseDate.setHours(0, 0, 0, 0);
    
    return commentOpenDate <= todaysDate && commentCloseDate >= todaysDate;
  };

  showActiveEngagements = (allEngagements) => {
    let self = this;
    
    let activeEngagements = allEngagements.filter((engagement) => {
      return this.isTodayWithinCommentPeriod(engagement.comment_open_date, engagement.comment_close_date)
    });

    if (activeEngagements && activeEngagements.length > 0) {
      activeEngagements.forEach((e) => {
        const dateText = getDateText(e);
        let item = engagementClone.cloneNode(true);

        //TODO: Refactor
        item.dataset.eventId = e.id;
        item.dataset.commentOpenDate = e.comment_open_date;
        item.dataset.commentCloseDate = e.comment_close_date;
        item.dataset.categoryIcon = e.category.icon;
        item.dataset.eventDate = dateText;
        item.dataset.shortDesc = e.short_desc;
        item.onclick = this.eventClick;

        $(".engagement-block__header .engagement-block__icon div", item).attr(
          "class",
          e.category.icon
        );
        $(".engagement-block__header .engagement-block__title", item).text(
          e.title
        );

        $(".engagement-block__details", item).html("");
        self.appendRowToEngagementBlock(
          item,
          "fa fa-info",
          e.short_desc,
          null,
          false
        );

        self.appendRowToEngagementBlock(
          item,
          "fa fa-calendar",
          dateText,
          null,
          false
        );
        e.actions.forEach((a) => {
          self.appendRowToEngagementBlock(
            item,
            a.icon,
            a.description_html,
            a.confirmed_date,
            true
          );
        });

        $(".active-engagements__wrapper").append(item);
      });
    } else {
      $('.active-engagements__no-data').removeClass('hidden');
    }
    $('.active-engagements__wrapper .loading').remove();
  };

  /**
   * logEvent : prevent logging the default selection
   * */
  filterEngagements = (filterDayCount, logEvent) => {
    if (logEvent) {
      this.analytics.logEvent("time_period_selected", filterDayCount);
    }

    //filter engagements from allEngagements
    //call createCategoryLinkAndContent -> categories = allCategories, engagements = filteredEngagements
    let filterDate = new Date(
      new Date().getTime() + filterDayCount * 24 * 60 * 60 * 1000
    );
    let engagements = allEngagements.filter((e) => {
      return new Date(e.end_date) <= filterDate;
    });
    this.createCategoryLinkAndContent(allCategories, engagements);
    pymChild.sendHeight();
  };
}
