let apiUrl = '';
let muniCode = 'WC033'; //this is temp

export class Geography {
    constructor(baseUrl, hostname) {
        apiUrl = `${baseUrl}/municipality?hostname=${hostname}`;

        this.getGeographyData();
    }

    getGeographyData = () => {
        fetch(apiUrl)
            .then(data => data.json())
            .then(data => {
                $('.nav-logo__muni_wrap .nav-logo__muni').html(data.name);
                $('.nav-logo__muni_wrap .loading').addClass('hidden');

                $('.hero-overline__muni .hero__overline').html(data.name);
                $('.hero-overline__muni .loading').addClass('hidden');
            })
    }
}
