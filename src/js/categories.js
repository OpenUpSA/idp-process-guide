let apiUrl = "";

export class Categories {
  constructor(baseUrl, analytics) {
    apiUrl = `${baseUrl}/categories`;
    this.analytics = analytics;
    this.getCategories();
  }

  getCategories = () => {
    fetch(apiUrl)
      .then((data) => data.json())
      .then((data) => {
        this.showCategories(data);
      });
  };

  showCategories = (categories) => {
    categories.forEach((category) => {
      let newCategory = $(".engagement-type").first().clone(true);
      $(newCategory).find(".engagement-heading")[0].textContent = category.name;
      $(newCategory).find(".engagement-icon span")[0].className = category.icon;
      $(newCategory).find(".engagement__rich-text p")[0].textContent =
        category.description;
      $(newCategory).find(".engagement-icon span")[0].textContent = "";
      $(newCategory).find(".engagement-type__content")[0].style.height =
        "unset";
      $(newCategory)
        .find(".engagement-type__content")
        .animate({ height: "toggle" });

      $(newCategory)
        .find(".engagement-type__header")
        .first()
        .click(this.toggleCategory);
      newCategory.appendTo(".engagement-types__wrapper");
    });
    $('.engagement-type').first().remove()
  };

  toggleCategory = (e) => {
    if ($(e.currentTarget).siblings()[0].style.display === "none") {
      $(e.currentTarget).find('.engagement-expand-icon')[0].style.transform = 'rotate(45deg)';
    } else {
      $(e.currentTarget).find('.engagement-expand-icon')[0].style.transform = 'rotate(0deg)';
    }
    $(e.currentTarget).siblings().animate({ height: "toggle" });
  };
}
