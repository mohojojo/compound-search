const envConfigs = {
    development: {
        BACKEND: {
            BACKEND_BASE_URL: 'https://catalog.chemicalize.com/v1/4d0920e486fe478197e2684718edb0d6',
        }
    },

    production: {
        // PRODUCTION ENVIRONMENT CONFIG
        BACKEND: {
            BACKEND_BASE_URL: 'https://catalog.chemicalize.com/v1/4d0920e486fe478197e2684718edb0d6',
        }
    }
};

const globalConfig = {
    // global
    ENVIRONMENT: ENV
};

const config = {
    ...globalConfig,
    ...envConfigs[globalConfig.ENVIRONMENT]
};

export default config;
