class TVSeries {
    constructor($) {
        if ($) this.scrapData($);
    }

    scrapData($) {
        // Set ID
        this.imdbID = $('[property="pageId"]').attr('content');

        const titleBlock = $('.title_block');

        // Get titles and summary
        this.name = titleBlock.find('h1').text().trim();
        this.originalName = titleBlock.find('.originalTitle').text().split('(')[0].trim();
        if(!this.originalName) this.originalName = this.name;

        this.summary = $('.summary_text').text().trim();

        // Get episode duration, runtime and genres
        this.episodeDuration = titleBlock.find('time').text().trim();
        this.runtime = titleBlock.find('[title="See more release dates"]').text().match(/\d+–?(\d+)?/);
        this.runtime = this.runtime ? this.runtime[0].trim() : "";
        this.genres = this.getGenres($);
        
        // Get rating info
        this.ratingValue = parseFloat(titleBlock.find('[itemprop="ratingValue"]').text());
        if (isNaN(this.ratingValue)) this.ratingValue = -1;
        this.ratingCount = parseInt(titleBlock.find('[itemprop="ratingCount"]').text().replace(',',''));
        if (isNaN(this.ratingCount)) this.ratingCount = -1;
        
        // Get poster
        this.poster = $('.poster').find('img').attr('src')

        // Get seasons
        this.numberOfSeasons = this.getNumberOfSeasons($);
    }

    getGenres = ($) => {
        return $('.title_wrapper > .subtext').find('a').filter( (i, element) => {
            return $(element).attr('href') && $(element).attr('href').indexOf('genres') !== -1
        }).map( (i, element) => {
            return $(element).text().trim();
        }).toArray();
    }

    getNumberOfSeasons = ($) => {
        return parseInt($('.seasons-and-year-nav').find('a').filter( (i, element) => {
            return $(element).attr('href') && $(element).attr('href').indexOf('season') !== -1
        }).first().text());
    }
}

module.exports = TVSeries;