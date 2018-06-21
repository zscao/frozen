export const actionTypeCreator = {
        request: action => `${action}_REQUEST`,
        success: action => `${action}_SUCCESS`,
        failure: action => `${action}_FAILURE`
    };