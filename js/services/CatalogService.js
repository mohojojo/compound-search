const defaultHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json'
};

const defaultSearcParameters = {
    hitColor: '#ff8000',
    hitColoring: 'OFF',
    limit: 20,
    searchType: 'SUBSTRUCTURE',
    similarityThreshold: 0.5
};

const LOG_HEADER = '[CatalogService]:';

class CatalogService {

    /**
     * Create a Catalog Service instance.
     * @param {string} baseUrl The  base URL for the API calls e.g. "http://myservice.com/api/1.2/".
     */
    constructor(baseUrl) {
        // ASSIGMENTS
        this.baseUrl = baseUrl;
    }

    /**
     * Create request
     * @param {string} method Request method
     * @param {string} endpoint API method name
     * @param {object} opts optional object for the request e.g. body, headers
     * @returns {Promise} Promise of response data
     */
    _request(method, endpoint, opts) {
        return this._plainRequest(method, endpoint, opts);
    }

    /**
     * Create request without extra url parameters
     * @param {string} method Request method
     * @param {string} endpoint API method name
     * @param {object} opts Optional request properties e.g. body, headers
     * @returns {Promise} Promise of response data
     */
    _plainRequest(method, endpoint, opts = {}) {
        // prepare request
        const { headers = defaultHeaders, body = '' } = opts,
            url = [this.baseUrl, endpoint]
                .filter(value => value)
                .join('/');
        if (body) {
            opts.body = JSON.stringify(body);
        }

        const options = {
            ...opts,
            method,
            headers
        };
        // start fetching
        return fetch(url, options)
            .then(res => {
                // should we throw it as an error?

                // if (res.status === 403) {
                //     return res.json();
                // }

                if (res.status && res.status >= 400) {
                    return res.json()
                        .then(json => {
                            throw new Error(JSON.stringify({ ...json, status: res.status }));
                        });
                }
                return res.text()
                    .then((text) => text.length ? JSON.parse(text) : {})
                    .then(json => {
                        if (json === '404 Not Found') {
                            throw new Error(json);
                        }
                        console.debug(LOG_HEADER, 'FETCHED:', url, ' - STATUS:', res.status);
                        return Promise.resolve(json);
                    });

            })
            .catch(err => {
                console.error(LOG_HEADER, url, err);
                throw err;
            });
    }

    static fail(res) {
        // TODO: Update if there is default error message.
        throw res;
    }

    getSearchResults(structure) {

        return ChemicalizeSearch.find(structure)
            .then(
                res => {
                    if (res) {
                        // valid response
                        return res;
                    }
                    return CatalogService.fail(res);
                },
                CatalogService.fail
            );

        // return this._plainRequest('POST', 'search', {
        //     credentials: 'include',
        //     body: {
        //         ...defaultSearcParameters,
        //         structure
        //     }
        // }).then(
        //     res => {
        //         if (res) {
        //             // valid response
        //             return res;
        //         }
        //         return StockService.fail(res);
        //     },
        //     CatalogService.fail
        // );
    }
}

export default CatalogService;
