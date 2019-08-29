import * as fetchHelper from '../common/fetchHelper';
import { FetchDesc } from '../common/fetchDesc';
import services from '../services/serviceHolder';

export const getSearchResults = (structure) => {
    return fetchHelper.fetchAction({
        fetchDesc: FetchDesc.SEARCHRESULTS,
        fetchPromiseCreator: () => services.waitForInit
            .then(() =>
                services.CatalogService.getSearchResults(structure))
    });
};
