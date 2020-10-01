let apiUrl = '';

export class Geography {
    constructor(baseUrl, hostname) {
        apiUrl = `${baseUrl}/municipality?hostname=${hostname}`;

        this.getGeographyData();
    }

    getGeographyData = () => {
        fetch(apiUrl)
            .then(data => data.json())
            .then(data => {
                this.setBodyContent(data);
                this.setFooterContent(data);
            })
    }

    setBodyContent = (data) => {
        $('.nav-logo__muni_wrap .nav-logo__muni').html(data.name);
        $('.nav-logo__muni_wrap .loading').addClass('hidden');

        $('.hero-overline__muni .hero__overline').html(data.name);
        $('.hero-overline__muni .loading').addClass('hidden');

        //footer
        $('.footer__description_municipality')
            .closest('a')
            .attr('href', data.homepage_url);
        $('.footer__description_municipality')
            .closest('a')
            .attr('href', data.homepage_url);
    }

    setFooterContent = (data) => {
        //todo:this shouldnt be here - emre
        this.showFooterLink('.footer__muni-site', data.homepage_url);
        this.showFooterLink('.footer__muni-bylaws', data.by_laws_url);
        this.showFooterLink('.footer__ward-councillor', data.ward_councillor_url);

        $('.footer-description__wrap .footer__description').removeClass('hidden');
        $('.footer-description__wrap .loading').addClass('hidden');
    }

    showFooterLink = (selector, url) => {
        $(selector).removeClass('hidden');
        $(selector).closest('a').find('.loading').addClass('hidden');
        $(selector).closest('a').attr('href', url);
    }
}
