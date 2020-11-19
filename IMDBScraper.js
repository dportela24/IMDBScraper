const fetch = require('node-fetch');
const cheerio = require('cheerio');
const TVSeries = require('./modules/TVSeries');
const Season = require('./modules/Season')
const fsPromises = require('fs').promises;

class IMDBScraper {    
    constructor() {
        this.regexs = {
            id: /tt\d+/
        }
    }

    makeRequest = async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept-Language': 'en-US,en;q=0.8',
                }
            });

            this.checkResponseStatus(response);

            const $ = await this.getHTML(response);            

            return $;
        } catch (e) {
            throw e;
        }
    }

    getTitle = async (query) => {
        // Check if id or name was provided
        const isID = this.regexs.id.test(query);
        let id;
        
        // Get title id
        if (isID) {
            id = query;
        } else {
            id = await this.getIdFromName(query);
        }

        try {
            const $ = await this.makeRequest(this.getURL('title', id));

            const type = $('[property="og:type"]').attr('content');

            if (type !== 'video.tv_show') throw this.newError('Could not find TV Series');

            const tvSeries = new TVSeries();
            tvSeries.scrapData($);

            const seasons = await this.getSeasons(tvSeries);

            // Get seasons and update number of seasons
            tvSeries.seasons = seasons;
            tvSeries.numberOfSeasons = seasons.length;

            return tvSeries;
        } catch (e) {
            throw {
                e,
                id
            };
        }
    }

    getSeasons = async (tvSeries) => {
        const id = tvSeries.imdbID;
        const seasons = [];
        
        try {
            for (let i=1; i<=tvSeries.numberOfSeasons; i++) {
                const $ = await this.makeRequest(this.getURL('episodes', id, i), 0)
                
                const newSeason = new Season();
                newSeason.buildEpisodeList($);
                
                if (newSeason.isValid() && newSeason.number === i) { 
                    seasons.push(newSeason.getSeason())
                }
            }
            
            return seasons;
        } catch (e) {
            throw e;
        }
    }

    getIdFromName = async (name) => {
        // Transform title to use in url
        name = name.replace(' ', '+');

        try {
            const $ = await this.makeRequest(this.getURL('search', name));

            // Get title URL link
            const title_link = $('.findList').find('a').attr('href');
            if (!title_link) throw this.newError('Could not find TV Series...');

            // Get title id
            const id = title_link.match(this.regexs.id)[0];
            if (!id) throw this.newError('Could not find TV Series...')

            return id;
        } catch (e) {
            throw e;
        }    
    }

    getURL = (type, ...args) => {
        switch(type) {
            case 'search':
                return `https://www.imdb.com/find?q=${args[0]}`;
            case 'title':
                return `https://www.imdb.com/title/${args[0]}`;
            case 'episodes':
                return `https://www.imdb.com/title/${args[0]}/episodes?season=${args[1]}`
        }
    }

    checkResponseStatus = (response) => {
        if(!response.ok) {
            throw {
                error: response.statusText
            }
        }
    }

    getHTML = async(response) => {
        const html = await response.text();
        return cheerio.load(html);
    }

    newError = (reason) => {
        return {
            error: reason
        }
    }
}

module.exports = IMDBScraper;