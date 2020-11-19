const { title } = require("process");

class Episode {
    constructor($) {
        if ($) this.scrapData($);
    }

    scrapData = ($) => {
        // Get episode id
        this.imdbID = $.find('[itemprop="name"]').attr('href').match(/tt\d+/)[0];
        // Get episode number
        this.number = $.find('[itemprop="episodeNumber"]').attr('content')
        
        // Get episode name
        this.name = $.find('[itemprop="name"]').text();

        // Get air date
        this.airDate = $.find('.airdate').text().trim();

        // Get rating info
        this.ratingValue = parseFloat($.find('.ipl-rating-star__rating').first().text());
        this.ratingCount = $.find('.ipl-rating-star__total-votes').text();
        this.ratingCount = this.ratingCount.substr(1, this.ratingCount.length - 2).replace(',','');
        this.ratingCount = parseInt(this.ratingCount);

        // Get episode summary
        this.summary = $.find('.item_description').text().trim();
    }

    getEpisode = () => {
        if (this.isValid()) {
            return {
                imdbID: this.imdbID,
                number: this.number,
                name: this.name,
                airdate: this.airDate,
                ratingValue: this.ratingValue,
                ratingCount: this.ratingCount,
                summary: this.summary
            }
        } else {
            return null
        }
    }

    isValid = () => {
        // Check if episode entry was filled
        return !isNaN(this.ratingValue) && !isNaN(this.ratingCount)
    }
}

module.exports = Episode