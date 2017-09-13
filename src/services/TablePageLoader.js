
import FlashlightSearch from '@/services/FlashlightSearch';

/* we'll need ths for later
"body": [
  "query": [
      "bool": [
          "must": [
              [ "match_phrase_prefix": [ "firstName": searchTokens[0]] ],
              [ "matchs_phrase_prefix": [ "lastName": searchTokens[1]] ]
          ]
      ]
  ]
      */

const flashlightSearch = new FlashlightSearch();
export default class TablePageLoader {
  constructor(type, size = 15) {
    this.type = type;
    this.size = size;

    this.load = (page, queryObj) => {
      console.log(`loadPage ${page}, ${queryObj}`);
      const from = (page - 1) * this.size;

      const query = {
        sort: [
          { timestamp: 'desc' },
        ],
        query: {
          match_all: { boost: 1.0 },
        },
      };

      if (queryObj) {
        query.query = queryObj;
      }

      return flashlightSearch.search(this.type, query, from, this.size)
        .then(dat => ({ items: dat.hits, totalRows: dat.total }));
    };
  }
}
