# IMDBScraper

## Project Summary

IMDBScraper is a scraping tool that scrapes the IMDB website to fetch data about TVSeries.
This tool will be used to create a database and develop an API to serve this data, altought this project is still under development.

## Built with

IMDBScraper is developed using NodeJs + Cheerio.

## Usage

### Making a request

The scraper can be used by simply importing it, creating an instance and feeding it a TV Series name or IMDB ID through the function `getTitle`.
This function returns a Promise that, on fulfillment, returns the TVSeries object.

A simple usage example to fetch data about the TVSeries Game of Thrones can be the following:
```javascript
const IMDBScraper = require('./scraper/IMDBScraper');

const scraper = new IMDBScraper();
scraper.getTitle("Game of Thrones").then((tvSeries) => {
  // Do something
};
```
### The TVSeries object

A TVSeries object is the final result of the scraping process.
As the name says, it represents a tv series and contains all its concerning information, including its series and episodes.

The TVSeries object follows the following (partial) structure.
A complete representation of a TVSeries object is available [here](https://github.com/dportela24/IMDBScrapper/blob/main/example_result).

```json
{
   "imdbID":"tt0944947",
   "name":"Game of Thrones",
   "originalName":"Game of Thrones",
   "summary":"Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
   "episodeDuration":"57min",
   "runtime":"2011–2019",
   "genres":[
      "Action",
      "Adventure",
      "Drama"
   ],
   "ratingValue":9.3,
   "ratingCount":1728,
   "poster":"https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_UY268_CR7,0,182,268_AL_.jpg",
   "numberOfSeasons":8,
   "seasons":[
      {
         "number":1,
         "episodeList":[
            {
               "imdbID":"tt1480055",
               "number":"1",
               "name":"Winter Is Coming",
               "airdate":"17 Apr. 2011",
               "ratingValue":9.1,
               "ratingCount":40002,
               "summary":"Eddard Stark is torn between his family and an old friend when asked to serve at the side of King Robert Baratheon; Viserys plans to wed his sister to a nomadic warlord in exchange for an army."
            },
            {
               "imdbID":"tt1668746",
               "number":"2",
               "name":"The Kingsroad",
               "airdate":"24 Apr. 2011",
               "ratingValue":8.8,
               "ratingCount":30325,
               "summary":"While Bran recovers from his fall, Ned takes only his daughters to King's Landing. Jon Snow goes with his uncle Benjen to the Wall. Tyrion joins them."
            },

            ....
```
