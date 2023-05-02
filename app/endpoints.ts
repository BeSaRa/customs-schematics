export const EndPoints = {
    BASE_URL: '',
    INFO: '/auth/login/info',
    LOCALIZATION: '/entity/localization',
    AUTH: '/auth/internal/login',
    VALIDATE_TOKEN: '/auth/validate-token',
    PERMISSION: '/entity/permission'
};

export type EndpointsType = typeof EndPoints;
