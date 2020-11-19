const Episode = require('./Episode')

class Season {
    constructor($) {
        if ($) this.buildEpisodeList($);
    }

    buildEpisodeList = ($) => {
        this.number = parseInt($('#bySeason').val());
        this.episodeList = [];
        this.episodeList = $('.eplist > div').map( (i, element) => {
            const episode = new Episode();
            episode.scrapData($(element));         
            return episode.getEpisode();   
        }).toArray()
    }

    getSeason = () => {
        return {
            number: this.number,
            episodeList: this.episodeList
        }
    }

    isValid = () =>  {
        // Check if list contains episodes
        return this.episodeList.length !== 0;
    }
}

module.exports = Season;