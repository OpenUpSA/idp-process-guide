let apiUrl = '';
let muniCode = 'WC033'; //this is temp

/* category */
let categoryLinkClone = null;
let categoryLinkWrapper = null;

const categoryContentClass = '.w-tab-pane';
const categoryLinkClass = '.tab-link';

const activeLinkClassName = 'w--current';

let categoryContentClone = null;
let categoryContentWrapper = null;
/* category */

/* engagement */
let engagementClone = null;
let engagementRowClone = null;

const engagementClass = '.engagement-block';
const engagementRowClass = '.engagement-block__details_row';

/* engagement */

export class Engagements {
    constructor(baseUrl) {
        apiUrl = `${baseUrl}/geography/${muniCode}/events`;

        //tab-link
        this.setDomElements();
        this.getEngagements();
        this.setFiltering();
    }

    setDomElements = () => {
        categoryLinkWrapper = $('.tabs-menu');
        categoryContentWrapper = $('.tabs-content');

        categoryLinkClone = $(categoryLinkClass)[0].cloneNode(true);
        categoryContentClone = $(categoryContentClass)[0].cloneNode(true);

        engagementClone = $(engagementClass)[0].cloneNode(true);
        engagementRowClone = $(engagementRowClass)[0].cloneNode(true);

        $(categoryLinkWrapper).html('');
        $(categoryContentWrapper).html('');
    }

    getEngagements = () => {
        fetch(apiUrl)
            .then(data => data.json())
            .then(data => {
                this.setCategories(data);
            })
    }

    setCategories = (engagements) => {
        let self = this;
        let categories = [{
            'id': 0,
            'name': 'All',
            'icon': 'fa fa-list-ul'
        }];
        engagements.forEach(e => {
            categories.push(e.category);
        });

        categories = $.unique(categories);

        categories.forEach(c => {
            self.createCategoryLink(c);
            self.createCategoryContent(c, engagements);
        })

        this.setActiveCategory(0);  //all
    }

    createCategoryLink = (c) => {
        let item = categoryLinkClone.cloneNode(true);
        $(item).attr('id', 'c-link-' + c.id);
        $(item).removeClass(activeLinkClassName);
        $(item).removeAttr('data-w-tab');
        $(item).on('click', () => this.setActiveCategory(c.id));

        $('.tab-link__text', item).text(c.name);
        $('.tab-link__icon div', item).attr('class', c.icon);

        categoryLinkWrapper.append(item);
    }

    createCategoryContent = (c, engagements) => {
        let item = categoryContentClone.cloneNode(true);
        this.setCategoryContentProperties(item, c);
        this.setCategoryContentData(item, c, engagements);

        categoryContentWrapper.append(item);
    }

    setCategoryContentProperties = (item, c) => {
        $(item).attr('id', 'c-tab-' + c.id);
        $(item).attr('aria-labelledby', 'c-tab-' + c.id);
        $(item).removeClass('w--tab-active');
        $(item).removeAttr('data-w-tab');

        $(item).html('');
    }

    setCategoryContentData = (wrapper, c, engagements) => {
        let self = this;
        let data = engagements;
        if (c.id > 0) {
            //else : All engagements
            data = engagements.filter((e) => {
                return e.category.id === c.id
            })
        }

        //data is filtered
        data.forEach((e) => {
            let item = engagementClone.cloneNode(true);
            $('.engagement-block__header .engagement-block__icon div', item).attr('class', e.category.icon);
            $('.engagement-block__header .engagement-block__title', item).text(e.title);

            $('.engagement-block__details', item).html('');
            self.appendRowToEngagementBlock(item, 'fa fa-info', e.short_desc, false);
            self.appendRowToEngagementBlock(item, 'fa fa-calendar', e.confirmed_date, false);
            e.actions.forEach((a) => {
                self.appendRowToEngagementBlock(item, a.icon, a.raw_html, true);
            })

            $(wrapper).append(item);
        })
    }

    appendRowToEngagementBlock = (item, iconClass, text, parseAsHtml = false) => {
        let row = engagementRowClone.cloneNode(true);
        $('.engagement-block__details_icon div', row).attr('class', iconClass);
        if (parseAsHtml) {
            $('.engagement-block__rich-text', row).html(text);
        } else {
            $('.engagement-block__rich-text', row).text(text);
        }
        $('.engagement-block__details', item).append(row);
    }

    setActiveCategory = (id) => {
        $(categoryContentClass).each(function () {
            $(this).addClass('hidden');
            if ($(this).attr('id') === 'c-tab-' + id) {
                $(this).removeClass('hidden');
            }
        });

        $(categoryLinkClass).each(function () {
            $(this).removeClass(activeLinkClassName);
            if ($(this).attr('id') === 'c-link-' + id) {
                $(this).addClass(activeLinkClassName);
            }
        });
    }

    setFiltering = () => {
        let self = this;
        $('a.language-link').each(function () {
            $(this).on('click', () => {
                let filterDays = $(this).attr('data-filterDays');
                self.filterEngagements(filterDays);
            })
        });
    }

    filterEngagements = (filterDays) => {

    }
}
