// This is a service holder for all services we want to use from actions
import config from './configService';
import CatalogService from './CatalogService';

class ServiceHolder {

    constructor() {
        this.CatalogService = null;

        this.waitForInit = new Promise((resolve, reject) => {
            this._waitForInitResolve = resolve;
            this._waitForInitReject = reject;
        });
    }

    /**
     * Inits all services.
     * @returns {Promise} Promise of everthing's done.
     */
    initServices() {
        return new Promise(resolve => {
            this.CatalogService = new CatalogService(config.BACKEND.BACKEND_BASE_URL);
            resolve();
        })
            .then(this._waitForInitResolve)
            .catch(err => {
                this._waitForInitReject();
                throw err;
            });
    }
}

export default new ServiceHolder();
